let currentAudio = null;
let currentPlayBtn = null;

const quotes = [
  
  "\"Gimanaa keren gakk suka gak kalau tema kali ini?\"",
  "\"Semangat yaa hari ini, buat hal tadi aku yang harus minta maaf\"",
  "\"Oiyaa hari ini pmr an yaa, semangat yek hati hati jangan nyium knalpot lagi awkawkawk\"",
  "\"Aku minta maaf kalo aku sikapku yang terlalu gini, ini juga lagi diubah kok\"",
  "\"Maaf buat hal yang tadi kalau bikin kamu jadi kecewa yaa\""
];

// Pindah Tampilan (Step 1, 2, atau 3)
function nextStep(stepNumber) {
  document.getElementById('step1').classList.add('hidden-step');
  document.getElementById('step2').classList.add('hidden-step');
  document.getElementById('step3').classList.add('hidden-step');

  const targetStep = document.getElementById(`step${stepNumber}`);
  targetStep.classList.remove('hidden-step');

  if (stepNumber === 3 && typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }
}

// Navigasi Tab
function switchTab(tabName, element) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

  element.classList.add('active');
  document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Acak Quote
function randomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteText = document.getElementById('quoteText');
  
  quoteText.style.opacity = '0';
  setTimeout(() => {
    quoteText.innerText = quotes[randomIndex];
    quoteText.style.opacity = '1';
  }, 150);
}

// Audio Player
function playAudio(url, btn) {
  if (currentAudio && currentAudio.src === url && !currentAudio.paused) {
    currentAudio.pause();
    btn.innerText = '▶';
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
    if (currentPlayBtn) currentPlayBtn.innerText = '▶';
  }

  currentAudio = new Audio(url);
  currentPlayBtn = btn;

  currentAudio.play();
  btn.innerText = '⏸';

  currentAudio.onended = () => {
    btn.innerText = '▶';
  };
}