/* ==========================================================
   VALIDAÇÃO E ENVIO REAL DO FORMULÁRIO DE CONTATO (FORMSPREE)
   ========================================================== */
const formulario = document.querySelector("#formulario");
const resposta = document.querySelector("#resposta");

// Só executa se o formulário existir na página
if (formulario && resposta) {
    const campoNome = document.querySelector("#nome");
    const campoEmail = document.querySelector("#email");
    const campoMensagem = document.querySelector("#mensagem");
    const MINIMO = 100;

    // Criando dinamicamente o contador de caracteres em tempo real
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

        if (resposta.classList.contains("erro")) {
            resposta.textContent = "";
            resposta.classList.remove("erro");
        }
    });

    function mostrarResposta(texto, tipo) {
        resposta.textContent = texto;
        resposta.classList.remove("erro", "sucesso");
        resposta.classList.add(tipo);
    }

    formulario.addEventListener("submit", async (evento) => {
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

        mostrarResposta("Enviando mensagem...", "sucesso");

        try {
            const response = await fetch("https://formspree.io/f/myewewpo", {
                method: "POST",
                body: new FormData(formulario),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                mostrarResposta(`Obrigada, ${nome}! Sua mensagem foi enviada com sucesso.`, "sucesso");
                formulario.reset();
                contadorVisual.textContent = ""; // Limpa o contador após o envio
            } else {
                const data = await response.json();
                if (data.errors) {
                    mostrarResposta(data.errors.map(err => err.message).join(", "), "erro");
                } else {
                    mostrarResposta("Ocorreu um erro ao enviar a mensagem. Tente novamente.", "erro");
                }
            }
        } catch (error) {
            mostrarResposta("Erro de conexão. Verifique sua internet.", "erro");
        }
    });
}