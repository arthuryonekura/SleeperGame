// Cores disponíveis
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray'];

//Mostra as palavras em português
const cores = ['VERMELHO', 'AZUL', 'VERDE', 'AMARELO', 'ROXO', 'LARANJA', 'ROSA', 'MARROM', 'CINZA'];

// Variáveis do jogo
let level = 1; // Nível atual do jogador
let score = 0; // Pontuação atual do jogador
let targetColor; // Cor alvo
let targetWord; // Palavra alvo
let buttons; // Botões das cores
let timer; // Temporizador do jogo

// Função para iniciar o jogo
function startGame() {
  score = 0; // Reinicia a pontuação
  level = 1; // Reinicia o nível
  updateLevel(); // Atualiza o nível na tela
  updateScore(); // Atualiza a pontuação na tela
  generateTarget(); // Gera o alvo (cor e palavra)
  generateButtons(); // Gera os botões das cores
  showMessage(''); // Limpa a mensagem
  resetButtonEvents(); // Reseta os eventos de clique dos botões
  startTimer(3000); // Inicia o temporizador com 3000ms (3 segundos)
}

// Função para atualizar o nível na tela
function updateLevel() {
  document.getElementById('level').textContent = `Nível: ${level}`;
}

// Função para atualizar a pontuação na tela
function updateScore() {
  document.getElementById('score').textContent = `Pontuação: ${score}`;
}

// Função para exibir uma mensagem na tela
function showMessage(message) {
  document.getElementById('message').textContent = message;
}

// Função para selecionar aleatoriamente o alvo (cor e palavra)
function generateTarget() {
  const colorIndex = Math.floor(Math.random() * colors.length);
  const wordIndex = Math.floor(Math.random() * cores.length);
  targetColor = colors[colorIndex];
  targetWord = cores[wordIndex];
  const targetElement = document.getElementById('target');
  targetElement.textContent = targetWord;
  targetElement.style.color = targetColor;
}

// Função para gerar os botões das cores
function generateButtons() {
  buttons = colors.slice().sort(() => Math.random() - 0.5);
  const buttonsElement = document.getElementById('buttons');
  buttonsElement.innerHTML = '';
  buttons.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', checkAnswer);
    buttonsElement.appendChild(button);
  });
}

// Função para resetar os eventos de clique dos botões
function resetButtonEvents() {
  const colorButtons = document.querySelectorAll('#buttons button');
  colorButtons.forEach(button => {
    button.removeEventListener('click', checkAnswer);
    button.addEventListener('click', checkAnswer);
  });
}

// Função para verificar a resposta do jogador
function checkAnswer(event) {
  clearTimeout(timer); // Limpa o temporizador
  const selectedColor = event.target.style.backgroundColor;
  if (selectedColor === targetColor) {
    score++; // Incrementa a pontuação
    updateScore(); // Atualiza a pontuação na tela
    if (score % 10 === 0) {
      level++; // Incrementa o nível a cada 10 acertos
      updateLevel(); // Atualiza o nível na tela
      if (level > 6) {
        showMessage('Parabéns! Você completou todos os níveis!'); // Exibe uma mensagem de conclusão do jogo
        return;
      }
    }
    generateTarget();
    generateButtons();
    showMessage('');
    let time = 3000; // 3000 significa 3 segundos
    if (level === 2) {
      time = 2000; // 2000 significa 2 segundos
    } else if (level === 3){ 
      time = 2000;
      buttons = buttons.sort(() => Math.random() - 0.5); // Embaralha a ordem dos botões
      generateButtons(); // Gera os botões novamente
    } else if (level === 4 || level === 5) {
      time = 2000 - (level - 3) * 300;
      buttons = buttons.sort(() => Math.random() - 0.5); // Embaralha a ordem dos botões
      generateButtons(); // Gera os botões novamente
    }else if(level === 6){
      time = 1000; // 1000 significa 1 segundo
      buttons = buttons.sort(() => Math.random() - 0.5); // Embaralha a ordem dos botões
      generateButtons(); // Gera os botões novamente
    }
    startTimer(time);
  } else {
    endGame();
  }
}

// Função para iniciar o temporizador
function startTimer(time) {
  let seconds = time / 1000; // Converte o tempo para segundos
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Tempo restante: ${seconds}`;
  timer = setInterval(() => {
    seconds--;
    if (seconds >= 0) {
      timerElement.textContent = `Tempo restante: ${seconds}`;
    } else {
      clearInterval(timer); // Limpa o temporizador
      endGame(); // Finaliza o jogo
    }
  }, 1000); // Executa a cada 1 segundo (1000ms)
}

// Função para encerrar o jogo
function endGame() {
  showMessage(`Fim de jogo! Sua pontuação final foi ${score}`);
  const colorButtons = document.querySelectorAll('#buttons button');
  colorButtons.forEach(button => {
    button.disabled = true; // Desabilita os botões para impedir cliques adicionais
  });
}