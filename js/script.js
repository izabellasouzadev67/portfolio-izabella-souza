/* ==========================================================
   CONFIGURAÇÕES E UTILITÁRIOS
   ========================================================== */
const prefereMovimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/* ==========================================================
   1. SAUDAÇÃO AUTOMÁTICA POR HORÁRIO
   ========================================================== */
const tituloSaudacao = document.querySelector("#titulo-saudacao");

function obterSaudacaoPorHora(hora = new Date().getHours()) {
    if (hora >= 5 && hora < 12) return "Bom dia!";
    if (hora >= 12 && hora < 18) return "Boa tarde!";
    return "Boa noite!";
}

if (tituloSaudacao) {
    tituloSaudacao.textContent = `${obterSaudacaoPorHora()} Boas-vindas ao meu perfil`;
}

/* ==========================================================
   2. TEMA CLARO / ESCURO
   ========================================================== */
const botaoTema = document.querySelector("#tema");
const CHAVE_TEMA = "tema";

function lerTemaSalvo() {
    try {
        const valor = localStorage.getItem(CHAVE_TEMA);
        return valor === "claro" || valor === "escuro" ? valor : null;
    } catch {
        return null;
    }
}

function salvarTema(valor) {
    try {
        localStorage.setItem(CHAVE_TEMA, valor);
    } catch {
        // Ignora caso o localStorage esteja indisponível
    }
}

function aplicarTema(claro) {
    document.body.classList.toggle("claro", claro);

    if (botaoTema) {
        botaoTema.textContent = claro ? "Modo escuro" : "Modo claro";
        botaoTema.setAttribute("aria-pressed", String(claro));
    }
}

const temaSalvo = lerTemaSalvo();
const sistemaPrefereClaro = window.matchMedia("(prefers-color-scheme: light)").matches;
aplicarTema(temaSalvo ? temaSalvo === "claro" : sistemaPrefereClaro);

botaoTema?.addEventListener("click", () => {
    const virouClaro = !document.body.classList.contains("claro");
    aplicarTema(virouClaro);
    salvarTema(virouClaro ? "claro" : "escuro");
});

/* ==========================================================
   2.1 MENU HAMBÚRGUER
   ========================================================== */
const btnHamburguer = document.getElementById("btn-hamburguer");
const navMenu = document.getElementById("nav-menu");

function definirEstadoMenu(aberto) {
    if (!btnHamburguer || !navMenu) return;
    navMenu.classList.toggle("aberto", aberto);
    btnHamburguer.classList.toggle("aberto", aberto);
    btnHamburguer.setAttribute("aria-expanded", String(aberto));
}

if (btnHamburguer && navMenu) {
    btnHamburguer.addEventListener("click", () => {
        const estaAberto = !navMenu.classList.contains("aberto");
        definirEstadoMenu(estaAberto);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => definirEstadoMenu(false));
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && navMenu.classList.contains("aberto")) {
            definirEstadoMenu(false);
            btnHamburguer.focus();
        }
    });

    document.addEventListener("click", (evento) => {
        const clicouFora =
            !navMenu.contains(evento.target) && !btnHamburguer.contains(evento.target);
        if (clicouFora && navMenu.classList.contains("aberto")) {
            definirEstadoMenu(false);
        }
    });
}

/* ==========================================================
   3. LISTA DE SOFT SKILLS DINÂMICA
   ========================================================== */
const gostos = [
    "Comunicação assertiva",
    "Trabalho colaborativo",
    "Aprendizagem contínua",
    "Resiliência"
];

const lista = document.querySelector("#gostos");

if (lista) {
    const fragmento = document.createDocumentFragment();
    for (const gosto of gostos) {
        const item = document.createElement("li");
        item.textContent = gosto;
        fragmento.appendChild(item);
    }
    lista.appendChild(fragmento);
}

/* ==========================================================
   4. BOTÃO "VOLTAR AO TOPO" (ESTILO NO CSS: .btn-topo e .visivel)
   ========================================================== */
const btnTopo = document.createElement("button");
btnTopo.type = "button";
btnTopo.id = "btn-voltar-topo";
btnTopo.className = "btn-topo";
btnTopo.setAttribute("aria-label", "Voltar ao topo");

const iconeSeta = document.createElement("i");
iconeSeta.className = "fa-solid fa-arrow-up";
iconeSeta.setAttribute("aria-hidden", "true");
btnTopo.appendChild(iconeSeta);

document.body.appendChild(btnTopo);

let agendadoScroll = false;
window.addEventListener(
    "scroll",
    () => {
        if (agendadoScroll) return;
        agendadoScroll = true;

        requestAnimationFrame(() => {
            btnTopo.classList.toggle("visivel", window.scrollY > 300);
            agendadoScroll = false;
        });
    },
    { passive: true }
);

btnTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: prefereMovimentoReduzido ? "auto" : "smooth"
    });
});

/* ==========================================================
   5. EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL (HERO)
   ========================================================== */
const elementoDigitacao = document.querySelector(".hero-card h1");

if (elementoDigitacao && !prefereMovimentoReduzido) {
    const textoOriginal = elementoDigitacao.textContent.trim();
    elementoDigitacao.textContent = "";
    elementoDigitacao.setAttribute("aria-label", textoOriginal);

    let indice = 0;

    function digitar() {
        if (indice < textoOriginal.length) {
            elementoDigitacao.textContent += textoOriginal.charAt(indice);
            indice++;
            setTimeout(digitar, 65);
        } else {
            elementoDigitacao.removeAttribute("aria-label");
        }
    }

    setTimeout(digitar, 400);
}

/* ==========================================================
   6. DESTAQUE AUTOMÁTICO DO MENU ATIVO (ESTILO NO CSS: .ativo)
   ========================================================== */
const caminhoAtual = window.location.pathname.replace(/\/+$/, "") || "/";
const linksMenu = document.querySelectorAll(".itensnav a");

linksMenu.forEach((link) => {
    const urlLink = new URL(link.href, window.location.origin);
    const caminhoLink = urlLink.pathname.replace(/\/+$/, "") || "/";

    const ehMesmaPagina = caminhoLink === caminhoAtual;
    link.classList.toggle("ativo", ehMesmaPagina);

    if (ehMesmaPagina) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});