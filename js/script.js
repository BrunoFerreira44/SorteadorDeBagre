document.addEventListener('DOMContentLoaded', function () {

   const botaoAddJogador = document.querySelector('div.botao-criar-jogador');
   botaoAddJogador.addEventListener('click', () => {
      const container = document.querySelector('div.container');

      const nomeDoJogador = prompt('Nome do jogador: ');
      const notaDoJogador = prompt('Nota do jogador: (1 a 5)');

      if (notaDoJogador < 1 || notaDoJogador > 5) {
         return alert('VAI TOMA NO CU PORRA');
      }

      // Cria o novo card dinamicamente
      const novoCard = document.createElement('label');
      novoCard.classList.add('card');

      // Cria o input checkbox
      const inputCheckbox = document.createElement('input');
      inputCheckbox.type = 'checkbox';
      inputCheckbox.name = 'player';
      inputCheckbox.value = nomeDoJogador;

      // Cria o conteúdo do card
      const cardContent = document.createElement('div');
      cardContent.classList.add('card-content');

      const imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');

      const img = document.createElement('img');
      img.src = 'img/bagre.png';
      img.alt = nomeDoJogador;
      img.classList.add('player-photo');

      const playerInfo = document.createElement('div');
      playerInfo.classList.add('player-info');

      const playerName = document.createElement('span');
      playerName.classList.add('player-name');
      playerName.textContent = nomeDoJogador;

      const playerStars = document.createElement('div');
      playerStars.classList.add('player-stars');

      for (let i = 0; i < notaDoJogador; i++) {
         const star = document.createElement('span');
         star.classList.add('star');
         star.innerHTML = '&#9733;';
         playerStars.appendChild(star);
      }

      // Monta a estrutura do card
      imgContainer.appendChild(img);
      playerInfo.appendChild(playerName);
      playerInfo.appendChild(playerStars);
      cardContent.appendChild(imgContainer);
      cardContent.appendChild(playerInfo);
      novoCard.appendChild(inputCheckbox);
      novoCard.appendChild(cardContent);

      // Adiciona o novo card ao container
      container.appendChild(novoCard);
   });

   const container = document.querySelector('div.container');
   const criaCardJogador = [
      { nome: "Bruno Parmeira", img: "img/me.png", stars: 3 },
      { nome: "Paulinho", img: "img/paulinho.png", stars: 3 },
      { nome: "Luquinhas", img: "img/luquinhas.png", stars: 5 },
      { nome: "Folk", img: "img/folk.png", stars: 5 },
      { nome: "Igor Sousa", img: "img/igorsousa.png", stars: 4 },
      { nome: "Bruno Felix", img: "img/brunofelix.png", stars: 2 },
      { nome: "Americano", img: "img/americano.png", stars: 2 },
      { nome: "Gogo", img: "img/bagre.png", stars: 4 },
      { nome: "Raul", img: "img/raul.png", stars: 1 },
      { nome: "Lucas Banheira", img: "img/lucasbanheira.png", stars: 4 },
      { nome: "Carmona", img: "img/carmona.png", stars: 4 },
      { nome: "Nanzin", img: "img/bagre.png", stars: 3 },
      { nome: "Bimbato", img: "img/bimbato.png", stars: 5 },
      { nome: "Matheus", img: "img/bagre.png", stars: 5 },
      { nome: "Nego", img: "img/bagre.png", stars: 4 },
      { nome: "Nelsinho", img: "img/nelsinho.png", stars: 3 },
      { nome: "Pedrinho", img: "img/bagre.png", stars: 4 },
      { nome: "Pedro Gomes", img: "img/bagre.png", stars: 2 },
      { nome: "Caio", img: "img/caio.png", stars: 3 },
      { nome: "Piu", img: "img/bagre.png", stars: 3 },
      { nome: "Robshow", img: "img/robson.png", stars: 2 },
      { nome: "Canorie", img: "img/canorie.png", stars: 3 },
      { nome: "Luigi", img: "img/luigi.png", stars: 4 },
      { nome: "Bruninho", img: "img/bruninho.png", stars: 4 },
      { nome: "Jean", img: "img/jean.png", stars: 5 },
      { nome: "Dan Anacleto", img: "img/bagre.png", stars: 5 },
      { nome: "Vini", img: "img/vini.png", stars: 5 },
   ];

   criaCardJogador.forEach(jogador => {

      let stars = "";

      for (let i = 0; i < jogador.stars; i++) {
         stars += `<span class="star">&#9733;</span>`;
      }

      container.innerHTML += `<label class="card">
      <input type="checkbox" name="player" value="${jogador.nome}">
      <div class="card-content">
          <div class="img-container">
              <img src="${jogador.img}" alt="${jogador.nome}" class="player-photo">
          </div>
          <div class="player-info">
              <span class="player-name">${jogador.nome}</span>
              <div class="player-stars">
                  ${stars}
              </div>
          </div>
      </div>
  </label>`
   });

   document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function () {
         // Vibra o dispositivo por 100ms
         if (navigator.vibrate) {
            navigator.vibrate(100);
         }
      });
   });

   const contadorSelecionados = document.getElementById('contador-selecionados');
   const checkboxes = document.querySelectorAll('input[name="player"]');

   // Função para atualizar o contador
   // function atualizarContador() {
   //    const selecionados = document.querySelectorAll('input[name="player"]:checked').length;
   //    contadorSelecionados.textContent = selecionados;
   // }

   // Adiciona o evento de clique a todos os checkboxes
   checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
         const selecionados = document.querySelectorAll('input[name="player"]:checked').length;
         contadorSelecionados.textContent = selecionados;
      });
   });

   const sortearTimesBtn = document.querySelector('div.botao-sortear');

   sortearTimesBtn.addEventListener('click', function () {
      const jogadoresSelecionados = [];
      const checkboxes = document.querySelectorAll('input[name="player"]:checked');

      checkboxes.forEach(checkbox => {
         const card = checkbox.closest('.card');
         const nome = checkbox.value;
         const estrelas = card.querySelectorAll('.star').length;
         jogadoresSelecionados.push({ nome, estrelas });
      });

      const times = dividirTimes(jogadoresSelecionados);
      exibirTimes(times);
   });


   function embaralharArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1)); // Escolhe um índice aleatório entre 0 e i
         [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
      }
      return array;
   }

   function dividirTimes(jogadores) {

      const randomJogadores = embaralharArray(jogadores);

      // Ordena os jogadores por estrelas em ordem decrescente
      randomJogadores.sort((a, b) => b.estrelas - a.estrelas);

      const totalJogadores = jogadores.length;
      let numTimes;
      let jogadoresPorTime = 5;

      // Define o número de times e jogadores por time com base no total de jogadores
      if (totalJogadores >= 20) {
         numTimes = 4;
      } else if (totalJogadores >= 15 && totalJogadores <= 19) {
         numTimes = 3;
      } else if (totalJogadores >= 10 && totalJogadores <= 14) {
         numTimes = 2;
      } else {
         alert('Selecione pelo menos 10 jogadores para sortear os times.');
         return { times: [], somasEstrelas: [] }; // Retorna vazio se não houver jogadores suficientes
      }

      const times = [];
      const somasEstrelas = [];

      // Inicializa os times e as somas de estrelas
      for (let i = 0; i < numTimes; i++) {
         times.push([]);
         somasEstrelas.push(0);
      }

      let jogadoreSobressalentes = [];

      // Distribui os jogadores nos times
      randomJogadores.forEach((jogador, i) => {
         if (i >= (numTimes * 5)) {
            jogadoreSobressalentes.push(jogador);
         } else {
            // Encontra o time com a menor soma de estrelas
            let timeMenorSoma = somasEstrelas.indexOf(Math.min(...somasEstrelas));
            times[timeMenorSoma].push(jogador);
            somasEstrelas[timeMenorSoma] += jogador.estrelas;
         }
      });

      if (jogadoreSobressalentes.length > 0) {

         let somaEstrelaSobressalente = 0;

         jogadoreSobressalentes.forEach(jogador => {
            somaEstrelaSobressalente += jogador.estrelas;
         });

         times.push(jogadoreSobressalentes);
         somasEstrelas.push(somaEstrelaSobressalente);
      }

      // Verifica se há jogadores sobrando e cria um time adicional
      // const jogadoresSobrando = totalJogadores % jogadoresPorTime;
      // if (jogadoresSobrando > 0) {
      //    const timeAdicional = [];
      //    let somaEstrelasAdicional = 0;

      //    // Remove os jogadores sobrando dos times existentes e os coloca no time adicional
      //    for (let i = 0; i < numTimes; i++) {
      //       while (times[i].length > jogadoresPorTime) {
      //          const jogador = times[i].pop();
      //          timeAdicional.push(jogador);
      //          somaEstrelasAdicional += jogador.estrelas;
      //       }
      //    }

      //    if (timeAdicional.length > 0) {
      //       times.push(timeAdicional);
      //       somasEstrelas.push(somaEstrelasAdicional);
      //    }
      // }

      // Retorna todos os times e suas somas de estrelas
      return { times, somasEstrelas };
   }

   function exibirTimes(resultado) {
      const resultadoDiv = document.createElement('div');
      resultadoDiv.style.margin = '20px auto';
      resultadoDiv.style.padding = '20px 20px 5px 20px';
      resultadoDiv.style.backgroundColor = '#fff';
      resultadoDiv.style.border = '1px solid #ddd';
      resultadoDiv.style.borderRadius = '10px';
      resultadoDiv.style.maxWidth = '600px';
      resultadoDiv.style.textAlign = 'center';

      let html = '';

      // Itera sobre todos os times e exibe suas informações
      resultado.times.forEach((time, index) => {
         html += `
              <h2>Time ${index + 1} (${resultado.somasEstrelas[index]} estrelas)</h2>
              <ul style='list-style: none; padding-bottom: 15px'>
                  ${time.map(jogador => `<li>${jogador.nome} - ${jogador.estrelas} estrelas</li>`).join('')}
              </ul>
          `;
      });

      resultadoDiv.innerHTML = html;
      document.body.appendChild(resultadoDiv);

      window.scrollTo({
         top: document.body.scrollHeight,
         behavior: 'smooth' // Adiciona um efeito de rolagem suave
      });
   }


});
