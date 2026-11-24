/* ==========================================================
   GERENCIAMENTO DE PROJETOS E FILTROS DINÂMICOS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const listaProjetos = document.querySelector("#lista-projetos");
    const contagem = document.querySelector("#contagem");

    const projetos = [
        {
            titulo: "Protótipo Figma",
            descricao: "Criação das telas e identidade visual estruturadas para o desenvolvimento deste portfólio.",
            categoria: "figma",
            link: "https://www.figma.com/files/team/1687251064527399275/folder/663341080?fuid=1687251063166864576",
            icone: '<i class="fa-brands fa-figma"></i>'
        },
        {
            titulo: "Minha página sobre mim",
            descricao: "Minha primeira página desenvolvida em HTML, CSS e JavaScript, estruturando a base da programação web.",
            categoria: "pagina-sobre-mim",
            link: "sobre.html",
            icone: '<i class="fa-solid fa-user"></i>'
        },
        {
            titulo: "Site de Turismo",
            descricao: "Projeto em grupo para divulgar pontos turísticos e rotas acessíveis, utilizando HTML, CSS e JavaScript para interatividade.",
            categoria: "turismo",
            link: "",
            icone: '<i class="fa-solid fa-tree"></i>'
        },
        {
            titulo: "Lâmpada Interativa",
            descricao: "Mini projeto de uma lâmpada interativa utilizando HTML, CSS puro e JavaScript.",
            categoria: "lampada",
            link: "https://github.com/izabellasouzadev67/lampada",
            icone: '<i class="fa-solid fa-lightbulb"></i>'
        },
        {
            titulo: "Calculadora Básica",
            descricao: "Mini projeto de uma calculadora básica utilizando HTML, CSS puro e JavaScript.",
            categoria: "calculadora",
            link: "https://github.com/izabellasouzadev67/calculadora",
            icone: '<i class="fa-solid fa-calculator"></i>'
        }
    ];

    function obterIcone(projeto) {
        if (projeto.icone) return projeto.icone;

        const texto = `${projeto.categoria || ""} ${projeto.titulo || ""}`.toLowerCase();
        if (texto.includes("figma")) return '<i class="fa-brands fa-figma"></i>';
        if (texto.includes("lampada") || texto.includes("lâmpada")) return '<i class="fa-solid fa-lightbulb"></i>';
        if (texto.includes("calculadora")) return '<i class="fa-solid fa-calculator"></i>';
        if (texto.includes("turismo")) return '<i class="fa-solid fa-tree"></i>';
        if (texto.includes("sobre")) return '<i class="fa-solid fa-user"></i>';
        return '<i class="fa-solid fa-code"></i>';
    }

    function criarCard(projeto) {
        if (!listaProjetos) return;

        const card = document.createElement("section");
        card.classList.add("card-projeto");

        const iconeDiv = document.createElement("div");
        iconeDiv.classList.add("projeto-icone");
        iconeDiv.innerHTML = obterIcone(projeto);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("projeto-info");

        const tituloEl = document.createElement("h2");
        tituloEl.textContent = projeto.titulo;

        const textoEl = document.createElement("p");
        textoEl.textContent = projeto.descricao;

        infoDiv.appendChild(tituloEl);
        infoDiv.appendChild(textoEl);

        const link = document.createElement("a");
        link.className = "btn-projeto";

        if (projeto.link && projeto.link.trim() !== "") {
            link.href = projeto.link;
            if (projeto.link.startsWith("http")) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            link.innerHTML = 'Ver Projeto <i class="fa-solid fa-arrow-right"></i>';
        } else {
            link.href = "#";
            link.setAttribute("aria-disabled", "true");
            link.innerHTML = 'Em breve <i class="fa-solid fa-clock"></i>';
            link.addEventListener("click", (evento) => {
                evento.preventDefault();
            });
        }

        infoDiv.appendChild(link);

        card.appendChild(iconeDiv);
        card.appendChild(infoDiv);
        listaProjetos.appendChild(card);
    }

    function atualizarContagem(lista) {
        if (!contagem) return;

        const total = lista.length;
        if (total === 0) {
            contagem.textContent = "Nenhum projeto encontrado para este filtro.";
            return;
        }

        const palavraProjeto = total === 1 ? "projeto" : "projetos";
        const palavraExibido = total === 1 ? "exibido" : "exibidos";
        const titulos = lista.map((projeto) => projeto.titulo).join(", ");

        contagem.textContent = `${total} ${palavraProjeto} ${palavraExibido}: ${titulos}`;
    }

    const mostrar = (lista) => {
        if (!listaProjetos) return;

        listaProjetos.innerHTML = "";
        for (const projeto of lista) {
            criarCard(projeto);
        }

        atualizarContagem(lista);
    };

    const filtrar = (categoria) => {
        const lista = projetos.filter((projeto) => projeto.categoria === categoria);
        mostrar(lista);
    };

    /* ==========================================================
       CONFIGURAÇÃO DOS BOTÕES DE FILTRO
       ========================================================== */
    const filtrosConfig = [
        { seletor: "#filtro-todos", categoria: "todos" },
        { seletor: "#filtro-pagina-sobre-mim, #filtro-página-sobre-mim", categoria: "pagina-sobre-mim" },
        { seletor: "#filtro-turismo", categoria: "turismo" },
        { seletor: "#filtro-figma", categoria: "figma" },
        { seletor: "#filtro-lampada", categoria: "lampada" },
        { seletor: "#filtro-calculadora", categoria: "calculadora" }
    ];

    const botoesFiltro = [];

    function marcarBotaoAtivo(botaoSelecionado) {
        botoesFiltro.forEach((btn) => {
            const ativo = btn === botaoSelecionado;
            btn.classList.toggle("ativo", ativo);
            btn.setAttribute("aria-pressed", ativo ? "true" : "false");
        });
    }

    filtrosConfig.forEach(({ seletor, categoria }) => {
        const botao = document.querySelector(seletor);
        if (!botao) return;

        botoesFiltro.push(botao);

        botao.addEventListener("click", () => {
            marcarBotaoAtivo(botao);
            if (categoria === "todos") {
                mostrar(projetos);
            } else {
                filtrar(categoria);
            }
        });
    });

    // Marca "Todos" como ativo inicialmente se existir na página
    const botaoTodosInicial = document.querySelector("#filtro-todos");
    if (botaoTodosInicial) {
        marcarBotaoAtivo(botaoTodosInicial);
    }

    // Exibe todos inicialmente
    mostrar(projetos);
});