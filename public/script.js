const introTexts = {
  fr: `
    <p>Le patient n° 404 s'est enfui de l'asile Sainte-Anne dans la nuit brumeuse.</p>
    <p>Obsédé par le folklore obscur et les pièges phonétiques, il rôde dans les ruelles sombres.</p>
    <p class="rule-hint">💡 <em>Activez votre microphone ou préparez votre clavier. Chaque erreur détruira votre esprit.</em></p>
  `,
  pt: `
    <p>O paciente nº 404 fugiu do manicômio Sainte-Anne na noite nebulosa.</p>
    <p>Obcecado pelo folclore sombrio e por armadilhas fonéticas, ele ronda os becos escuros.</p>
    <p class="rule-hint">💡 <em>Ative o seu microfone ou prepare o seu teclado. Cada erro destruirá a sua sanidade.</em></p>
  `
};

const chapters = [
  {
    title: "La Bête du Gévaudan",
    loreFr: "« Hahaha ! Tu as entendu parler de la Bête qui dévorait les paysans en 1764 ? Ses griffes déchirent la chair... Montre-moi que tes dents ne claquent pas de terreur ! »",
    lorePt: "« Hahaha! Já ouviu falar da Fera que devorava camponeses em 1764? Suas garras rasgam a carne... Mostre-me que os seus dentes não batem de pavor! »",
    phrase: "six saucisses sèches",
    phraseTranslationPt: "Tradução: seis salsichas secas (repita em francês)",
    targetClean: "six saucisses seches",
    audioSrc: "audio/chapter_1.mp3"
  },
  {
    title: "La Dame Blanche",
    loreFr: "« Au détour d'un virage brumeux, elle attend sous l'orage... Si tu ne la prends pas en stop, elle hurle et te précipite dans le ravin ! »",
    lorePt: "« Na curva de uma estrada enevoada, ela espera sob a tempestade... Se você não lhe der carona, ela grita e te atira no despenhadeiro! »",
    phrase: "un chasseur sachant chasser sans son chien",
    phraseTranslationPt: "Tradução: um caçador que sabe caçar sem o seu cão (repita em francês)",
    targetClean: "un chasseur sachant chasser sans son chien",
    audioSrc: "audio/chapter_2.mp3"
  },
  {
    title: "Le Wendigo des forêts laurentiennes",
    loreFr: "« Dans les bois glacés du Québec, ceux qui goûtent à la chair humaine perdent leur âme et errent à jamais affamés... Répète ceci sans trembler ! »",
    lorePt: "« Nas matas gélidas de Quebec, quem prova da carne humana perde a alma e vaga faminto para sempre... Repita isto sem tremer! »",
    phrase: "panier piano panier piano",
    phraseTranslationPt: "Tradução: cesto piano cesto piano (repita em francês)",
    targetClean: "panier piano panier piano",
    audioSrc: "audio/chapter_3.mp3"
  }
];

const globalAudio = {
  victory: "audio/victory.mp3",
  defeat: "audio/defeat.mp3",
  correct: "audio/correct.mp3",
  wrong: "audio/wrong.mp3"
};

let currentAudioPlayer = new Audio();

let currentStage = 0;
let sanity = 100;
let isIntroInPt = false;
let isGameInPt = false;

// Gravação via backend
let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

let startScreen;
let gameScreen;
let startBtn;
let restartBtn;
let introTranslateBtn;
let introTextEl;
let gameTranslateBtn;
let loreEl;
let phraseEl;
let phraseTranslationEl;
let challengeLabelEl;
let feedbackEl;
let micBtn;
let stageNumEl;
let sanityFill;
let fallbackForm;
let manualInput;

function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim();
}

function stopAudio() {
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer.currentTime = 0;
  }
}

function playAudio(src) {
  if (!src) return;
  stopAudio();
  currentAudioPlayer.src = src;
  currentAudioPlayer.play().catch(err => {
    console.warn("Lecture audio bloquée ou fichier introuvable:", src, err);
  });
}

async function requestMicPermission() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.warn("Permission micro refusée:", err);
    }
  }
}

async function toggleRecording() {
  stopAudio();

  if (isRecording) {
    // Para a gravação; onstop cuidará do envio
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    return;
  }

  // Inicia a gravação
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    
    // Suporte amplo a formatos de gravação cross-browser
    const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
    mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstart = () => {
      isRecording = true;
      if (micBtn) {
        micBtn.classList.add("listening");
        micBtn.innerHTML = '<span class="btn-icon">⏹️</span> ARRÊTER ET ENVOYER';
      }
      if (feedbackEl) {
        feedbackEl.className = "feedback";
        feedbackEl.textContent = isGameInPt
          ? "Gravando sua voz... Fale agora e clique de novo para enviar."
          : "Enregistrement... Parlez puis cliquez pour analyser.";
      }
    };

    mediaRecorder.onstop = async () => {
      isRecording = false;
      stream.getTracks().forEach(track => track.stop());

      if (micBtn) {
        micBtn.classList.remove("listening");
        micBtn.innerHTML = '<span class="btn-icon">🎙️</span> PARLER (fr-FR)';
      }

      if (feedbackEl) {
        feedbackEl.className = "feedback";
        feedbackEl.textContent = isGameInPt
          ? "O professor está decifrando suas palavras..."
          : "Le professeur déchiffre vos paroles...";
      }

      const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || "audio/webm" });
      await sendAudioToBackend(audioBlob);
    };

    mediaRecorder.start();
  } catch (err) {
    console.error("Erreur d'accès au micro:", err);
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.textContent = isGameInPt
        ? "Não foi possível acessar o microfone. Permita nas configurações ou digite."
        : "Accès micro refusé. Activez-le ou utilisez le champ texte.";
    }
  }
}

async function sendAudioToBackend(blob) {
  const formData = new FormData();
  formData.append("file", blob, "voice.webm");

  try {
    const res = await fetch("/transcribe", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Erreur serveur lors de la transcription");

    const data = await res.json();
    if (data.transcript && data.transcript.trim() !== "") {
      validateInput(data.transcript);
    } else {
      if (feedbackEl) {
        feedbackEl.className = "feedback fail";
        feedbackEl.textContent = isGameInPt
          ? "O professor não ouviu nada além do vento. Tente de novo."
          : "Le professeur n'a rien entendu d'intelligible. Réessaie.";
      }
    }
  } catch (err) {
    console.error(err);
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.textContent = isGameInPt
        ? "Erro ao enviar áudio ao servidor. Tente digitar."
        : "Erreur de transmission audio au serveur. Tapez ci-dessous.";
    }
  }
}

function updateGameTexts() {
  if (currentStage >= chapters.length || sanity <= 0) return;

  const ch = chapters[currentStage];
  if (loreEl) loreEl.textContent = isGameInPt ? ch.lorePt : ch.loreFr;
  if (phraseEl) phraseEl.textContent = `« ${ch.phrase} »`;

  if (isGameInPt) {
    if (challengeLabelEl) challengeLabelEl.textContent = "REPITA EM FRANCÊS APÓS MIM :";
    if (phraseTranslationEl) {
      phraseTranslationEl.textContent = ch.phraseTranslationPt;
      phraseTranslationEl.style.display = "block";
    }
    if (gameTranslateBtn) gameTranslateBtn.textContent = "🇫🇷 Voir en Français";
  } else {
    if (challengeLabelEl) challengeLabelEl.textContent = "RÉPÉTEZ APRÈS MOI :";
    if (phraseTranslationEl) phraseTranslationEl.style.display = "none";
    if (gameTranslateBtn) gameTranslateBtn.textContent = "🌐 Traduire en PT";
  }
}

function validateInput(userInput) {
  const cleanUser = normalizeText(userInput);
  const cleanTarget = normalizeText(chapters[currentStage].targetClean);

  if (cleanUser.includes(cleanTarget) || cleanTarget.includes(cleanUser)) {
    if (feedbackEl) {
      feedbackEl.className = "feedback success";
      feedbackEl.textContent = isGameInPt
        ? `« ${userInput} »... Hahaha! Você sobreviveu!`
        : `« ${userInput} »... Hahaha ! Tu as survécu !`;
    }
    playAudio(globalAudio.correct);
    setTimeout(nextStage, 1800);
  } else {
    sanity -= 35;
    updateSanity();
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.textContent = isGameInPt
        ? `Você disse: « ${userInput} ». PATÉTICO! Sua sanidade cai.`
        : `Tu as dit: « ${userInput} ». PATHÉTIQUE !`;
    }
    playAudio(globalAudio.wrong);

    if (sanity <= 0) {
      gameOver();
    }
  }
}

function updateSanity() {
  if (sanityFill) {
    sanityFill.style.width = Math.max(0, sanity) + "%";
  }
}

function loadStage(index) {
  const ch = chapters[index];
  if (stageNumEl) stageNumEl.textContent = index + 1;
  updateGameTexts();
  if (feedbackEl) feedbackEl.textContent = "";
  if (manualInput) manualInput.value = "";
  playAudio(ch.audioSrc);
}

function nextStage() {
  currentStage++;
  if (currentStage >= chapters.length) {
    if (loreEl) {
      loreEl.textContent = isGameInPt
        ? "« Você me derrotou... Minhas próprias armadilhas devoram a minha mente... Devo voltar ao hospício! »"
        : "« Tu m'as vaincu... Mes propres pièges me dévorent l'esprit... Je retourne à l'asile ! »";
    }
    if (phraseEl) phraseEl.textContent = isGameInPt ? "VITÓRIA! VOCÊ ESTÁ LIVRE." : "VICTOIRE ! TU ES LIBRE.";
    if (phraseTranslationEl) phraseTranslationEl.style.display = "none";
    if (feedbackEl) {
      feedbackEl.className = "feedback success";
      feedbackEl.textContent = isGameInPt
        ? "Você escapou das garras do Professor!"
        : "Tu as échappé aux griffes du Professeur.";
    }
    endGameUI();
    playAudio(globalAudio.victory);
  } else {
    loadStage(currentStage);
  }
}

function gameOver() {
  if (loreEl) {
    loreEl.textContent = isGameInPt
      ? "« Sua mente se quebrou na noite escura. Você ficará trancado comigo para sempre! »"
      : "« Ton esprit s'est brisé dans la nuit noire. Tu resteras enfermé avec moi pour l'éternité ! »";
  }
  if (phraseEl) phraseEl.textContent = isGameInPt ? "COLAPSO MENTAL" : "ÉCHEC MENTAL";
  if (phraseTranslationEl) phraseTranslationEl.style.display = "none";
  if (feedbackEl) {
    feedbackEl.className = "feedback fail";
    feedbackEl.textContent = isGameInPt ? "FIM DE JOGO. Sua sanidade acabou." : "GAME OVER. Ton esprit est perdu.";
  }
  endGameUI();
  playAudio(globalAudio.defeat);
}

function endGameUI() {
  stopAudio();
  if (micBtn) micBtn.style.display = "none";
  if (fallbackForm) fallbackForm.style.display = "none";
  if (restartBtn) restartBtn.style.display = "flex";
  if (gameTranslateBtn) gameTranslateBtn.style.display = "none";
}

function resetGame() {
  stopAudio();
  sanity = 100;
  currentStage = 0;
  isRecording = false;
  updateSanity();
  if (micBtn) {
    micBtn.style.display = "flex";
    micBtn.classList.remove("listening");
    micBtn.innerHTML = '<span class="btn-icon">🎙️</span> PARLER (fr-FR)';
  }
  if (fallbackForm) fallbackForm.style.display = "flex";
  if (restartBtn) restartBtn.style.display = "none";
  if (gameTranslateBtn) gameTranslateBtn.style.display = "inline-block";
  loadStage(0);
}

document.addEventListener("DOMContentLoaded", () => {
  startScreen = document.getElementById("start-screen");
  gameScreen = document.getElementById("game-screen");
  startBtn = document.getElementById("start-btn");
  restartBtn = document.getElementById("restart-btn");

  introTranslateBtn = document.getElementById("intro-translate-btn");
  introTextEl = document.getElementById("intro-text");
  gameTranslateBtn = document.getElementById("game-translate-btn");

  loreEl = document.getElementById("lore-text");
  phraseEl = document.getElementById("target-phrase");
  phraseTranslationEl = document.getElementById("target-phrase-translation");
  challengeLabelEl = document.getElementById("challenge-label");
  feedbackEl = document.getElementById("feedback");
  micBtn = document.getElementById("mic-btn");
  stageNumEl = document.getElementById("stage-num");
  sanityFill = document.getElementById("sanity-fill");
  fallbackForm = document.getElementById("fallback-form");
  manualInput = document.getElementById("manual-input");

  if (introTranslateBtn && introTextEl) {
    introTranslateBtn.addEventListener("click", () => {
      isIntroInPt = !isIntroInPt;
      introTextEl.innerHTML = isIntroInPt ? introTexts.pt : introTexts.fr;
      introTranslateBtn.textContent = isIntroInPt ? "🇫🇷 Voir en Français" : "🌐 Traduire en PT";
    });
  }

  if (gameTranslateBtn) {
    gameTranslateBtn.addEventListener("click", () => {
      isGameInPt = !isGameInPt;
      updateGameTexts();
    });
  }

  if (startBtn && startScreen && gameScreen) {
    startBtn.addEventListener("click", async () => {
      await requestMicPermission();
      startScreen.classList.remove("active");
      gameScreen.classList.add("active");
      resetGame();
    });
  }

  if (restartBtn && startScreen && gameScreen) {
    restartBtn.addEventListener("click", () => {
      stopAudio();
      gameScreen.classList.remove("active");
      startScreen.classList.add("active");
    });
  }

  if (micBtn) {
    micBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleRecording();
    });
  }

  if (fallbackForm && manualInput) {
    fallbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (manualInput.value.trim() !== "") {
        validateInput(manualInput.value);
      }
    });
  }
});
