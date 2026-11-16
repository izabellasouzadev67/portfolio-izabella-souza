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
// ------------------------------------------
    // 0. MODO CLARO / ESCURO (Funciona em todas as páginas)
    // ------------------------------------------
    const botaoTema = document.getElementById('tema');
    
    if (botaoTema) {
        // Verifica se o utilizador já tinha o modo escuro ativo antes
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