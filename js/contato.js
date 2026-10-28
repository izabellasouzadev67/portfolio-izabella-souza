const formulario= document.querySelector("#formulario");
const resposta = document.querySelector("#resposta");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nome = document.querySelector("#nome").value;
    const mensagem=document.querySelector("#mensagem").value.trim()
if (mensagem.length < 10) {
    resposta.textContent="Escreva pelo menos 10 letras.";
    resposta.classList.add("erro");
    resposta.classList.add("erro");
} else{
    resposta.textContent="Obrigado, "+ nome+"!";
    resposta.classList.remove("erro");
    formulario.reset();
}
});