// --- CONFIGURAÇÃO DO WHATSAPP ---
const meuNumero = "5521976756782"; 

// --- ELEMENTOS DO DOM ---
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const startBtn = document.getElementById("startBtn");
const generateSummaryBtn = document.getElementById("generateSummaryBtn");
const confirmMissionBtn = document.getElementById("confirmMissionBtn");

// Elementos do Resumo Final
const resComida = document.getElementById("resComida");
const resPiada = document.getElementById("resPiada");
const resAtividade = document.getElementById("resAtividade");
const resEncerramento = document.getElementById("resEncerramento");
const resCarta = document.getElementById("resCarta");

// Elementos do Modal de Recusa
const noBtn = document.getElementById("noBtn");
const modalRecusa = document.getElementById("modal");
const modalEmoji = document.getElementById("modalEmoji");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const cancelModal = document.getElementById("cancelModal");
const confirmNo = document.getElementById("confirmNo");
const footerNote = document.getElementById("footerNote");

let tentativasRecusa = 0;

// ===========================
// LÓGICA DAS PIADAS DINÂMICAS
// ===========================
// Seleciona todos os radio buttons
const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        // Encontra o grupo (comida, atividade, etc) do botão clicado
        const grupo = e.target.name; 
        const piadaTexto = e.target.dataset.piada;
        
        // Atualiza a caixa de texto correspondente àquele grupo
        const caixaPiada = document.getElementById(`joke-${grupo}`);
        caixaPiada.textContent = piadaTexto;
        
        // Efeito rápido de piscar para mostrar que mudou
        caixaPiada.style.animation = 'none';
        setTimeout(() => caixaPiada.style.animation = 'fadeIn 0.3s ease', 10);
    });
});

// ===========================
// FLUXO DE TELAS
// ===========================

// 1. Clicou em Aceitar
startBtn.addEventListener("click", () => {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    window.scrollTo(0, 0);
});

// 2. Clicou em Gerar Relatório
generateSummaryBtn.addEventListener("click", () => {
    const comidaInput = document.querySelector('input[name="comida"]:checked');
    const atividadeInput = document.querySelector('input[name="atividade"]:checked');
    const encerramentoInput = document.querySelector('input[name="encerramento"]:checked');
    const cartaInput = document.querySelector('input[name="carta"]:checked');

    // Preenche o resumo final
    resComida.innerText = comidaInput.value;
    resPiada.innerText = `"${comidaInput.dataset.piada}"`;
    resAtividade.innerText = atividadeInput.value;
    resEncerramento.innerText = encerramentoInput.value;
    resCarta.innerText = cartaInput.value;

    step2.classList.add("hidden");
    step3.classList.remove("hidden");
    window.scrollTo(0, 0);
});

// 3. Clicou em Confirmar Reserva (Vai pro WhatsApp)
confirmMissionBtn.addEventListener("click", () => {
    const comida = resComida.innerText;
    const atividade = resAtividade.innerText;
    const encerramento = resEncerramento.innerText;
    const carta = resCarta.innerText;

    let texto = "🚨 *RESERVA CONFIRMADA: OPERAÇÃO ENCONTRO* 🚨\n\n";
    texto += "Roteiro aprovado pela diretoria:\n";
    texto += `🍽️ *Alimentação:* ${comida}\n`;
    texto += `🎉 *Atividade:* ${atividade}\n`;
    texto += `🌃 *Encerramento:* ${encerramento}\n`;
    texto += `🎲 *Carta Especial:* ${carta}\n\n`;
    texto += "Pode preparar o carro. Nos vemos às 18h! 😎";

    const mensagem = encodeURIComponent(texto);
    window.location.href = `https://wa.me/${meuNumero}?text=${mensagem}`;
});

// ===========================
// LÓGICA DO BOTÃO RECUSAR
// ===========================
noBtn.addEventListener("click", () => {
    tentativasRecusa++;
    modalRecusa.classList.remove("hidden");

    if (tentativasRecusa === 1) {
        modalEmoji.textContent = "🥺";
        modalTitle.textContent = "Tem certeza?";
        modalText.textContent = "Eu passei tempo demais fazendo esse site...";
        confirmNo.textContent = "💔 Tenho certeza";
    } else if (tentativasRecusa === 2) {
        modalEmoji.textContent = "😢";
        modalTitle.textContent = "Tem CERTEZA mesmo?";
        modalText.textContent = "O desenvolvedor revisou esse convite umas 37 vezes.";
        confirmNo.textContent = "💔 Sim...";
    } else {
        modalEmoji.textContent = "😭";
        modalTitle.textContent = "Última chance";
        modalText.textContent = "Ainda dá tempo de mudar de ideia.";
        confirmNo.textContent = "😭 Recusar mesmo assim";
    }
});

cancelModal.addEventListener("click", () => {
    modalRecusa.classList.add("hidden");
});

confirmNo.addEventListener("click", () => {
    modalRecusa.classList.add("hidden");

    if (tentativasRecusa >= 3) {
        noBtn.style.display = "none";
        footerNote.innerHTML = `
            🤨 Nossa equipe técnica detectou que a funcionalidade
            <strong>"Recusar"</strong> apresentava falhas críticas e decidiu
            desativá-la temporariamente.
            <br><br>
            ❤️ Agradecemos a compreensão. (Agora só resta aceitar!)
        `;
        return;
    }
    noBtn.click();
});