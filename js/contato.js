const formulario= document.querySelector("#formulario");
const resposta = document.querySelector("#resposta");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nome = document.querySelector("#nome").value;
    resposta.textContent="Obrigado,"+ nome+"!";
});