// ==========================================
// 1. CONFIGURAÇÃO DA SAUDAÇÃO POR HORÁRIO
// ==========================================
const nome = "Izabella Souza Matos";
const hora = new Date().getHours();
let saudacao;

if (hora < 12) {
    saudacao = "Bom dia!";
} else if (hora < 18) {
    saudacao = "Boa tarde!";
} else {
    saudacao = "Boa noite!";
}

const tituloSaudacao = document.querySelector("#titulo-saudacao");
if (tituloSaudacao) {
    tituloSaudacao.textContent = `${saudacao} Bem-vindo ao meu perfil`;
}

// ==========================================
// 2. EFEITO DE DIGITAÇÃO REUTILIZÁVEL
// ==========================================
const elementoDigitar = document.querySelector("#efeito-digitar");

let palavras = ["Desenvolvedora Web", "UI/UX Designer", "Estudante de TI", "uma profissional Criativa"];

if (window.location.pathname.includes("sobre.html")) {
    palavras = ["uma Desenvolvedora Web", "uma UI/UX Designer", "uma Especialista de TI", "uma Dev Dedicada"];
}

let indexPalavra = 0;
let indexLetra = 0;
let apagando = false;

function digitar() {
    if (!elementoDigitar) return; 
    
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
        velocidade = 2000; 
        apagando = true;
    } else if (apagando && indexLetra === 0) {
        apagando = false;
        indexPalavra = (indexPalavra + 1) % palavras.length;
        velocidade = 500; 
    }

    setTimeout(digitar, velocidade); 
}

window.addEventListener("DOMContentLoaded", digitar);

// ==========================================
// 3. ALTERNADOR DE TEMA (CLARO/ESCURO)
// ==========================================
const botao = document.querySelector("#tema");
if (botao) {
    botao.addEventListener("click", function () {
        document.body.classList.toggle("escuro");
        if (document.body.classList.contains("escuro")) {
            botao.textContent = "Modo claro";
        } else {
            botao.textContent = "Modo escuro";
        }
    });
}