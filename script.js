let tempoTrabalho = 25; 
let tempoPausa = 5; 
let emSessaoTrabalho = true;
let temporizador;
let emExecucao = false;
let contadorSessoes = parseInt(localStorage.getItem("contadorSessoes")) || 0; 
let minutosAtuais = tempoTrabalho;
let segundosAtuais = 0;

document.getElementById("contadorSessoes").textContent = contadorSessoes;

document.getElementById("iniciar").addEventListener("click", iniciarTemporizador);
document.getElementById("pausar").addEventListener("click", pausarDespausarTemporizador);
document.getElementById("reiniciar").addEventListener("click", reiniciarTemporizador);
document.getElementById("alternar-tema").addEventListener("click", alternarTema);

function iniciarTemporizador() {
  if (!emExecucao) {
    iniciarContagem(minutosAtuais, segundosAtuais);
    emExecucao = true;
  }
}

function iniciarContagem(minutos, segundos) {
  atualizarDisplay(minutos, segundos);
  temporizador = setInterval(() => {
    if (segundos === 0) {
      if (minutos === 0) {
        tocarNotificacao(); 
        if (emSessaoTrabalho) {
          contadorSessoes++;
          localStorage.setItem("contadorSessoes", contadorSessoes); 
          document.getElementById("contadorSessoes").textContent = contadorSessoes;
        }
        emSessaoTrabalho = !emSessaoTrabalho;
        minutos = emSessaoTrabalho ? tempoTrabalho : tempoPausa;
        segundos = 0;
      } else {
        minutos--;
        segundos = 59;
      }
    } else {
      segundos--;
    }
    minutosAtuais = minutos;
    segundosAtuais = segundos;
    atualizarDisplay(minutos, segundos);
  }, 1000);
}

function pausarDespausarTemporizador() {
  const botaoPausar = document.getElementById("pausar");
  if (emExecucao) {
    clearInterval(temporizador);
    emExecucao = false;
    botaoPausar.textContent = "Despausar";
  } else {
    iniciarContagem(minutosAtuais, segundosAtuais); 
    emExecucao = true;
    botaoPausar.textContent = "Pausar";
  }
}

function reiniciarTemporizador() {
  clearInterval(temporizador);
  emExecucao = false;
  emSessaoTrabalho = true;
  minutosAtuais = tempoTrabalho; 
  segundosAtuais = 0;
  atualizarDisplay(minutosAtuais, segundosAtuais);
  document.getElementById("pausar").textContent = "Pausar"; 
}

function atualizarDisplay(minutos, segundos) {
  document.getElementById("minutos").textContent = String(minutos).padStart(2, '0');
  document.getElementById("segundos").textContent = String(segundos).padStart(2, '0');
}

document.getElementById("tempoTrabalho").addEventListener("change", function () {
  tempoTrabalho = parseInt(this.value);
  reiniciarTemporizador();
});

document.getElementById("tempoPausa").addEventListener("change", function () {
  tempoPausa = parseInt(this.value);
  reiniciarTemporizador();
});

function alternarTema() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("tema", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

if (localStorage.getItem("tema") === "dark") {
  document.body.classList.add("dark-mode");
}

function tocarNotificacao() {
  const somNotificacao = document.getElementById("notificacao-som");
  somNotificacao.play();
}
