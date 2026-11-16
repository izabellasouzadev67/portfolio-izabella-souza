// ==========================================
// SCRIPT DA PÁGINA DE CONTATO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Contador de Caracteres
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

    // 2. Envio do Formulário via Formspree com Feedback
    const formContato = document.getElementById('form-contato');
    const respostaP = document.getElementById('resposta'); // O <p id="resposta"></p> que já tens no teu HTML

    if (formContato) {
        formContato.addEventListener('submit', async function(e) {
            e.preventDefault(); // Impede o recarregamento brusco da página

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
                    // Mostra a mensagem de sucesso no elemento <p id="resposta">
                    if (respostaP) {
                        respostaP.textContent = "Sua mensagem foi enviada com sucesso! 🎉";
                        respostaP.style.color = "#4ade80";
                        respostaP.style.display = "block";
                    } else {
                        alert('Sua mensagem foi enviada com sucesso! 🎉');
                    }

                    // Limpa o formulário e reinicia o contador
                    formContato.reset();
                    if (contadorSpan) {
                        contadorSpan.textContent = limiteMaximo;
                    }

                    // Esconde a mensagem após 6 segundos
                    if (respostaP) {
                        setTimeout(() => {
                            respostaP.style.display = 'none';
                        }, 6000);
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