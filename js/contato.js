// ==========================================
// SCRIPT DA PÁGINA DE CONTATO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    // ------------------------------------------
    // 0. MODO CLARO / ESCURO (Funciona em todas as páginas)
    // ------------------------------------------
    const botaoTema = document.getElementById('tema');

    if (botaoTema) {
        if (localStorage.getItem('tema') === 'escuro') {
            document.body.classList.add('modo-escuro');
            botaoTema.textContent = 'Modo claro';
        }

        botaoTema.addEventListener('click', () => {
            document.body.classList.toggle('modo-escuro');

            if (document.body.classList.contains('modo-escuro')) {
                botaoTema.textContent = 'Modo claro';
                localStorage.setItem('tema', 'escuro');
            } else {
                botaoTema.textContent = 'Modo escuro';
                localStorage.setItem('tema', 'claro');
            }
        });
    }

    // ------------------------------------------
    // 1. CONTADOR DE CARACTERES
    // ------------------------------------------
    const mensagemInput = document.getElementById('mensagem');
    const contadorSpan = document.getElementById('contador');
    const limiteMaximo = 500;

    if (mensagemInput && contadorSpan) {
        mensagemInput.addEventListener('input', () => {
            const caracteresAtuais = mensagemInput.value.length;
            const caracteresRestantes = limiteMaximo - caracteresAtuais;
            contadorSpan.textContent = caracteresRestantes;
        });
    }

    // ------------------------------------------
    // 2. ENVIO DO FORMULÁRIO VIA FORMSPREE COM FEEDBACK
    // ------------------------------------------
    const formContato = document.getElementById('form-contato');
    const respostaP = document.getElementById('resposta');
    let timerResposta;

    if (formContato) {
        formContato.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(formContato);

            try {
                const response = await fetch(formContato.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (respostaP) {
                        clearTimeout(timerResposta);
                        respostaP.textContent = "Sua mensagem foi enviada com sucesso! 🎉";
                        respostaP.style.color = "#4ade80";
                        respostaP.style.display = "block";

                        timerResposta = setTimeout(() => {
                            respostaP.style.display = 'none';
                        }, 6000);
                    } else {
                        alert('Sua mensagem foi enviada com sucesso! 🎉');
                    }

                    formContato.reset();
                    if (contadorSpan) {
                        contadorSpan.textContent = limiteMaximo;
                    }
                } else {
                    alert('Ocorreu um erro ao enviar a mensagem. Tente novamente.');
                }
            } catch (error) {
                alert('Erro de conexão. Verifique a sua internet e tente novamente.');
            }
        });
    }
});