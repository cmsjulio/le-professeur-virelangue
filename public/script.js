// Base de dados das etapas de terror e virelangues
const chapters = [
  {
    title: "La Bête du Gévaudan",
    lore: "« Hahaha ! Tu as entendu parler de la Bête qui dévorait les paysans en 1764 ? Ses griffes déchirent la chair comme des rasoirs... Montre-moi que tes dents ne claquent pas de peur ! »",
    phrase: "six saucisses sèches",
    targetClean: "six saucisses seches"
  },
  {
    title: "La Dame Blanche",
    lore: "« Au détour de la route brumeuse d'Yvetot, elle attend sous la pluie battante... Si tu ne la prends pas en stop, elle hurle et te précipite dans le fossé ! »",
    phrase: "un chasseur sachant chasser sans son chien",
    targetClean: "un chasseur sachant chasser sans son chien"
  },
  {
    title: "Le Wendigo des forêts laurentiennes",
    lore: "« Dans les bois glacés de la Nouvelle-France, ceux qui goûtent à la chair humaine perdent leur âme et deviennent affamés pour l'éternité... Répète ceci sans défaillir ! »",
    phrase: "panier piano panier piano",
    targetClean: "panier piano panier piano"
  }
];

let currentStage = 0;
let sanity = 100;

// Elementos DOM
const loreEl = document.getElementById("lore-text");
const phraseEl = document.getElementById("target-phrase");
const feedbackEl = document.getElementById("feedback");
const micBtn = document.getElementById("mic-btn");
const stageNumEl = document.getElementById("stage-num");
const sanityFill = document.getElementById("sanity-fill");
const fallbackForm = document.getElementById("fallback-form");
const manualInput = document.getElementById("manual-input");

// Normalizador de texto (ignora acentos e pontuações na comparação)
function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim();
}

// Síntese de Voz (Voz do Professor)
function speak(text) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.pitch = 0.5; // Tom grave e fantasmagórico
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

// Configuração do Reconhecimento de Fala
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "fr-FR";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    micBtn.classList.add("listening");
    feedbackEl.className = "feedback";
    feedbackEl.textContent = "Le professeur écoute ton souffle...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    validateInput(transcript);
  };

  recognition.onerror = (e) => {
    feedbackEl.className = "feedback fail";
    feedbackEl.textContent = "Je n'entends que le silence d'outre-tombe... Réessaie.";
  };

  recognition.onend = () => {
    micBtn.classList.remove("listening");
  };
} else {
  micBtn.disabled = true;
  micBtn.title = "Reconnaissance vocale non disponible sur ce navigateur";
  feedbackEl.textContent = "Micro non supporté. Utilise le champ texte ci-dessous.";
}

// Validação da resposta
function validateInput(userInput) {
  const cleanUser = normalizeText(userInput);
  const cleanTarget = normalizeText(chapters[currentStage].targetClean);

  if (cleanUser.includes(cleanTarget) || cleanTarget.includes(cleanUser)) {
    feedbackEl.className = "feedback success";
    feedbackEl.textContent = `« ${userInput} »... Hahaha ! Tu as survécu !`;
    speak("Bravo... pour cette fois.");
    setTimeout(nextStage, 1800);
  } else {
    sanity -= 35;
    updateSanity();
    feedbackEl.className = "feedback fail";
    feedbackEl.textContent = `Tu as dit: « ${userInput} ». PATHÉTIQUE ! Ta santé mentale faiblit.`;
    speak("Non ! Tu trébuches sur tes propres mots !");
    
    if (sanity <= 0) {
      gameOver();
    }
  }
}

function updateSanity() {
  sanityFill.style.width = Math.max(0, sanity) + "%";
}

function loadStage(index) {
  const ch = chapters[index];
  stageNumEl.textContent = index + 1;
  loreEl.textContent = ch.lore;
  phraseEl.textContent = `« ${ch.phrase} »`;
  feedbackEl.textContent = "";
  manualInput.value = "";
  speak(ch.lore);
}

function nextStage() {
  currentStage++;
  if (currentStage >= chapters.length) {
    loreEl.textContent = "« Tu m'as vaincu... Les mots s'emmêlent dans ma tête... Je dois retourner à l'asile ! »";
    phraseEl.textContent = "VICTOIRE ! TU ES LIBRE.";
    feedbackEl.className = "feedback success";
    feedbackEl.textContent = "Tu as survécu au Professeur Virelangue !";
    micBtn.style.display = "none";
    fallbackForm.style.display = "none";
    speak("Tu m'as vaincu... Je retourne dans les ténèbres !");
  } else {
    loadStage(currentStage);
  }
}

function gameOver() {
  loreEl.textContent = "« Ton esprit s'est brisé dans l'obscurité. Tu resteras piégé dans mes labyrinthes verbaux pour toujours ! »";
  phraseEl.textContent = "ÉCHEC MENTAL";
  feedbackEl.className = "feedback fail";
  feedbackEl.textContent = "GAME OVER. Recharge pour recommencer.";
  micBtn.style.display = "none";
  fallbackForm.style.display = "none";
  speak("Tu as perdu la raison ! Hahahahaha !");
}

// Event Listeners
micBtn.addEventListener("click", () => {
  if (recognition) {
    try {
      recognition.start();
    } catch (e) {
      recognition.stop();
    }
  }
});

fallbackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (manualInput.value.trim() !== "") {
    validateInput(manualInput.value);
  }
});

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  loadStage(0);
});
