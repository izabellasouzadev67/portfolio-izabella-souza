// Função para criar os gatos flutuantes na tela
function criarGato() {
    const contenedor = document.querySelector('.gatos-flutuantes');
    if (!contenedor) return;

    const gato = document.createElement('div');
    gato.classList.add('gato');
    gato.innerHTML = '🐱'; // Emoji de gato (ou você pode usar uma tag img)
    
    // Posição horizontal aleatória baseada no seu CSS
    gato.style.setProperty('--left', Math.random() * 100 + '%');
    
    contenedor.appendChild(gato);

    // Remove o gato após 5 segundos para não pesar o navegador
    setTimeout(() => {
        gato.remove();
    }, 5000);
}

// Faz um gato novo surgir a cada 600 milissegundos
setInterval(criarGato, 600);