/* ==========================================================
   VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ========================================================== */
const formulario = document.querySelector("#formulario");
const resposta = document.querySelector("#resposta");

// Só executa se o formulário existir na página (evita erro em outras páginas)
if (formulario && resposta) {
    const campoNome = document.querySelector("#nome");
    const campoMensagem = document.querySelector("#mensagem");
    const MINIMO = 10;

    function mostrarResposta(texto, tipo) {
        resposta.textContent = texto; // textContent evita injeção de HTML
        resposta.classList.remove("erro", "sucesso");
        resposta.classList.add(tipo);
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = campoNome.value.trim();
        const mensagem = campoMensagem.value.trim();

        if (nome === "") {
            mostrarResposta("Por favor, digite seu nome.", "erro");
            campoNome.focus();
            return;
        }

        if (mensagem.length < 100) {
            const faltam = 100 - mensagem.length;
            mostrarResposta(
                `Faltam ${100} letras.`,
                "erro"
            );
            campoMensagem.focus();
            return;
        }

        mostrarResposta(`Obrigada, ${nome}! Sua mensagem foi enviada.`, "sucesso");
        formulario.reset();
    });

    // Some com o erro assim que a pessoa volta a digitar
    formulario.addEventListener("input", () => {
        if (resposta.classList.contains("erro")) {
            resposta.textContent = "";
            resposta.classList.remove("erro");
        }
    });
}