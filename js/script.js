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