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
// ==========================================
// 2. EFEITO DE DIGITAÇÃO REUTILIZÁVEL
// ==========================================
const elementoDigitar = document.querySelector("#efeito-digitar");

// Define palavras diferentes dependendo da página que o usuário está!
let palavras = ["Desenvolvedora Web", "UI/UX Designer", "Estudante de TI", "Criativa"];

// Se o usuário estiver na página "sobre.html", mudamos as palavras para encaixar na sua frase
if (window.location.pathname.includes("sobre.html")) {
    palavras = ["uma Desenvolvedora Web.", "uma UI/UX Designer.", "uma Profissional de TI.", "uma Dev Criativa."];
}

let indexPalavra = 0;
let indexLetra = 0;
let apagando = false;

function digitar() {
    if (!elementoDigitar) return; // Se a página atual não tiver o ID, cancela sem dar erro no console
    
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
        velocidade = 2000; // Pausa de 2 segundos ao terminar de digitar
        apagando = true;
    } else if (apagando && indexLetra === 0) {
        apagando = false;
        indexPalavra = (indexPalavra + 1) % palavras.length;
        velocidade = 500; // Pausa curta antes de iniciar a nova palavra
    }

    setTimeout(digitar, velocidad); // Corrigido o nome da variável de tempo externa
}

// Garante o início do script assim que a página carregar estruturalmente
window.addEventListener("DOMContentLoaded", digitar);
    // ... parte de cima do código ...
    let velocidade = apagando ? 50 : 150;

    if (!apagando && indexLetra === palavraAtual.length) {
        velocidade = 2000; 
        apagando = true;
    } else if (apagando && indexLetra === 0) {
        apagando = false;
        indexPalavra = (indexPalavra + 1) % palavras.length;
        velocidade = 500; 
    }

    setTimeout(digitar, velocidade); // Certifique-se de que está escrito "velocidade" aqui!
}
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