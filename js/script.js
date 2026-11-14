/* ==========================================================
   1. SAUDAÇÃO AUTOMÁTICA POR HORÁRIO
   (Só roda na página que tem #titulo-saudacao)
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
   (O site é escuro por padrão; a classe "claro" no body ativa o claro)
   ========================================================== */
const botao = document.querySelector("#tema");
const CHAVE_TEMA = "tema";

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
        // Ignora caso o localStorage esteja bloqueado
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
   3. LISTA DE SOFT SKILLS DINÂMICA
   (Só roda se existir #gostos na página)
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

/* ==========================================================
   4. BOTÃO "VOLTAR AO TOPO" (SMOOTH SCROLL)
   ========================================================== */
const btnTopo = document.createElement("button");
btnTopo.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
btnTopo.id = "btn-voltar-topo";
btnTopo.setAttribute("aria-label", "Voltar ao topo");
document.body.appendChild(btnTopo);

// Estilização injetada via JS para manter tudo isolado e funcional
btnTopo.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #9A031E;
    color: #FFFFFF;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 16px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transition: transform 0.2s ease, background-color 0.2s ease;
`;

// Exibe ou oculta o botão dependendo da rolagem da página
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btnTopo.style.display = "flex";
    } else {
        btnTopo.style.display = "none";
    }
});

// Ação de clique para subir suavemente
btnTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

btnTopo.addEventListener("mouseenter", () => {
    btnTopo.style.transform = "scale(1.1)";
});

btnTopo.addEventListener("mouseleave", () => {
    btnTopo.style.transform = "scale(1)";
});

/* ==========================================================
   5. EFEITO DE DIGITAÇÃO NO TÍTULO PRINCIPAL (HERO)
   ========================================================== */
const elementoDigitacao = document.querySelector(".hero-card h1");

if (elementoDigitacao) {
    const textoOriginal = elementoDigitacao.textContent;
    elementoDigitacao.textContent = "";
    let i = 0;

    function digitar() {
        if (i < textoOriginal.length) {
            elementoDigitacao.textContent += textoOriginal.charAt(i);
            i++;
            setTimeout(digitar, 65); // Velocidade de digitação
        }
    }

    setTimeout(digitar, 400); // Delay inicial antes de começar a digitar
}

/* ==========================================================
   6. DESTAQUE AUTOMÁTICO DO MENU ATIVO
   ========================================================== */
const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
const linksMenu = document.querySelectorAll(".itensnav a");

linksMenu.forEach(link => {
    const hrefLink = link.getAttribute("href");
    if (hrefLink === paginaAtual) {
        link.style.color = "#FFAFCC"; // Cor de destaque do tema
        link.style.fontWeight = "bold";
    }
});