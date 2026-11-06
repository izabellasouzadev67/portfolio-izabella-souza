/* ==========================================================
   1. SAUDAÇÃO (só roda na página que tem #titulo-saudacao)
   ========================================================== */
const tituloSaudacao = document.querySelector("#titulo-saudacao");

if (tituloSaudacao) {
    const hora = new Date().getHours();
    let saudacao;

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa tarde!";
    } else {
        saudacao = "Boa noite!";
    }

    tituloSaudacao.textContent = `${saudacao} Boas-vindas ao meu perfil`;
}

/* ==========================================================
   2. TEMA CLARO / ESCURO
   O site é escuro por padrão; a classe "claro" no body ativa o tema claro
   ========================================================== */
const botao = document.querySelector("#tema");
const CHAVE_TEMA = "tema";

// localStorage pode falhar (aba anônima, bloqueio de cookies), por isso try/catch
function lerTemaSalvo() {
    try {
        return localStorage.getItem(CHAVE_TEMA);
    } catch (erro) {
        return null;
    }
}

function salvarTema(valor) {
    try {
        localStorage.setItem(CHAVE_TEMA, valor);
    } catch (erro) {
        // sem problema: o tema só não será lembrado na próxima visita
    }
}

function aplicarTema(claro) {
    document.body.classList.toggle("claro", claro);

    if (botao) {
        botao.textContent = claro ? "Modo escuro" : "Modo claro";
    }
}

// Prioridade: escolha salva > preferência do sistema > padrão (escuro)
const temaSalvo = lerTemaSalvo();
const sistemaPrefereClaro = window.matchMedia("(prefers-color-scheme: light)").matches;

aplicarTema(temaSalvo ? temaSalvo === "claro" : sistemaPrefereClaro);

if (botao) {
    botao.addEventListener("click", () => {
        const virouClaro = !document.body.classList.contains("claro");
        aplicarTema(virouClaro);
        salvarTema(virouClaro ? "claro" : "escuro");
    });
}

/* ==========================================================
   3. LISTA DE GOSTOS / SOFT SKILLS (só roda se existir #gostos)
   ========================================================== */
const gostos = [
    "Comunicação assertiva",
    "Trabalho colaborativo",
    "Aprendizagem contínua",
    "Resiliência"
];

const lista = document.querySelector("#gostos");

if (lista) {
    for (const gosto of gostos) {
        const item = document.createElement("li");
        item.textContent = gosto;
        lista.appendChild(item);
    }
}