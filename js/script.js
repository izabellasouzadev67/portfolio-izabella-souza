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
// Configuração do efeito de digitação
const elemento = document.querySelector("#efeito-digitar");
const palavras = ["Desenvolvedora", "Estudante de TI", "Criativa", "Izabella"];
let indexPalavra = 0;
let indexLetra = 0;
let apagando = false;

function digitar() {
    const palavraAtual = palavras[indexPalavra];
    
    if (apagando) {
        // Remove uma letra
        elemento.textContent = palavraAtual.substring(0, indexLetra - 1);
        indexLetra--;
    } else {
        // Adiciona uma letra
        elemento.textContent = palavraAtual.substring(0, indexLetra + 1);
        indexLetra++;
    }

    // Define a velocidade (mais rápido ao apagar)
    let velocidade = apagando ? 50 : 150;

    // Se terminou de digitar a palavra inteira
    if (!apagando && indexLetra === palavraAtual.length) {
        velocidade = 2000; // Pausa de 2 segundos antes de começar a apagar
        apagando = true;
    } 
    // Se terminou de apagar a palavra inteira
    else if (apagando && indexLetra === 0) {
        apagando = false;
        indexPalavra = (indexPalavra + 1) % palavras.length; // Passa para a próxima palavra
        velocidade = 500; // Pausa rápida antes de começar a digitar a nova palavra
    }

    setTimeout(digitar, velocidade);
}

// Inicia o efeito assim que a página carregar
window.addEventListener("DOMContentLoaded", digitar);
