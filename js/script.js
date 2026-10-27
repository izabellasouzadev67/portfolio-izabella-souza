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
const botao = document.querySelector("#tema");

// 1. Carrega o tema salvo do localStorage ao abrir a página
if (localStorage.getItem("tema-escuro") === "ativo") {
    document.body.classList.add("escuro");
    if (botao) {
        botao.textContent = "Modo claro";
    }
} else {
    document.body.classList.remove("escuro");
    if (botao) {
        botao.textContent = "Modo escuro";
    }
}

// 2. Alterna o tema ao clicar
if (botao) {
    botao.addEventListener("click", function () {
        document.body.classList.toggle("escuro");
        
        // Se AGORA tem a classe "escuro", significa que entrou no Modo Escuro
        if (document.body.classList.contains("escuro")) {
            botao.textContent = "Modo claro";
            localStorage.setItem("tema-escuro", "ativo");
        } else {
            botao.textContent = "Modo escuro";
            localStorage.setItem("tema-escuro", "inativo");
        }
    });
}