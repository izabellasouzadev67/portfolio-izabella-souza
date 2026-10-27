console.log("Olá, Izabella!");
const nome= "Izabella Souza Matos";
let hora = new Date() .getHours();
console.log(hora);
let saudacao;
if (hora < 12) {
    saudacao = "Bom dia!";
} else if (hora >= 12 && hora < 18) {
    saudacao = "Boa tarde!";
} else {
    saudacao = "Boa noite!";
}
console.log(saudacao);
const título= document.querySelector("h1");
título.textContent= saudacao + ",eu sou a " + nome; 
console.log("Olá, Izabella!");
const botao= document.querySelector("#tema");
botao.addEventListener("click",function () {
    document.body.classList.toggle("escuro");
    if (document.body.classList.contains("escuro")) {
        botao.textContent="Modo claro";
    } else {
        botao.textContent="Modo escuro";
    }
});
// 2. EFEITO DE DIGITAÇÃO (TYPING EFFECT)
// ==========================================
const elementoDigitar = document.querySelector("#efeito-digitar");
const palavras = ["Desenvolvedora Web", "UI/UX Designer", "Estudante de TI", "Criativa"];
let indexPalavra = 0;
let indexLetra = 0;
let apagando = false;

function digitar() {
    if (!elementoDigitar) return; // Proteção caso o elemento não exista na página
    
    const palavraAtual = palavras[indexPalavra];
    
    if (apagando) {
        elementoDigitar.textContent = palavraAtual.substring(0, indexLetra - 1);
        indexLetra--;
    } else {
        elementoDigitar.textContent = palavraAtual.substring(0, indexLetra + 1);
        indexLetra++;
    }

    let velocidade = apagando ? 50 : 150;

    if (!apagando && indexLetra === palavraAtual.length) {
        velocidade = 2000; // Pausa de 2 segundos quando termina de digitar
        apagando = true;
    } else if (apagando && indexLetra === 0) {
        apagando = false;
        indexPalavra = (indexPalavra + 1) % palavras.length;
        velocidade = 500; // Pausa antes de começar a próxima
    }

    setTimeout(digitar, velocidad);
}

// Inicia o efeito assim que a página estiver pronta
window.addEventListener("DOMContentLoaded", digitar);