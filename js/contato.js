/* ==========================================================
   VALIDAÇÃO E INTERATIVIDADE DO FORMULÁRIO DE CONTATO
   ========================================================== */
const formulario = document.querySelector("#formulario");
const resposta = document.querySelector("#resposta");

// Só executa se o formulário existir na página (evita erro em outras páginas)
if (formulario && resposta) {
    const campoNome = document.querySelector("#nome");
    const campoEmail = document.querySelector("#email"); // Caso tenha campo de e-mail
    const campoMensagem = document.querySelector("#mensagem");
    const MINIMO = 100;

    // Criando dinamicamente um elemento para mostrar o contador de caracteres em tempo real
    const contadorVisual = document.createElement("small");
    contadorVisual.style.display = "block";
    contadorVisual.style.marginTop = "6px";
    contadorVisual.style.color = "#CED4DA";
    campoMensagem.parentNode.appendChild(contadorVisual);

    // Atualiza o contador enquanto o usuário digita
    campoMensagem.addEventListener("input", () => {
        const digitados = campoMensagem.value.length;
        const faltam = MINIMO - digitados;

        if (faltam > 0) {
            contadorVisual.textContent = `Faltam ${faltam} caracteres (Mínimo de ${MINIMO}).`;
            contadorVisual.style.color = "#FFAFCC";
        } else {
            contadorVisual.textContent = `Tamanho ideal alcançado! (${digitados} caracteres)`;
            contadorVisual.style.color = "#70E000"; // Verde indicando sucesso
        }

        // Some com a mensagem de erro geral assim que a pessoa volta a digitar
        if (resposta.classList.contains("erro")) {
            resposta.textContent = "";
            resposta.classList.remove("erro");
        }
    });

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

        if (mensagem.length < MINIMO) {
            const faltam = MINIMO - mensagem.length;
            mostrarResposta(
                `A mensagem é muito curta. Faltam ${faltam} caracteres.`,
                "erro"
            );
            campoMensagem.focus();
            return;
        }

        mostrarResposta(`Obrigada, ${nome}! Sua mensagem foi enviada com sucesso.`, "sucesso");
        formulario.reset();
        contadorVisual.textContent = ""; // Limpa o contador após o envio
    });
}