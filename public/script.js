const introTexts = {
  fr: `
    <p>
      Le patient n° 404 a disparu sans laisser de trace.<br>
      Seul indice : les verrous fracturés de la vieille bibliothèque municipale et d'étranges échos montant des étages supérieurs.<br>
      Oseriez-vous gravir les marches pour vérifier qui hante ces combles ?
    </p>
    <p>
      Mais prenez garde : le professeur est aussi fou que sourd, et ses oreilles fatiguées n'admettent que la perfection du peu qu'il parvient à saisir.<br>
      Face à lui, seule une diction impeccable de la langue de Molière pourra vous sauver.<br>
      Une seule hésitation ou une syllabe mal comprise scellera votre destin.
    </p>
    <p class="rule-hint">💡 <em>Activez votre microphone ou utilisez le clavier pour réciter chaque mot distinctement.</em></p>
  `,
  pt: `
    <p>
      O paciente nº 404 sumiu sem deixar rastros.<br>
      A única pista: as trancas arrombadas da velha biblioteca municipal e ecos estranhos ecoando dos andares superiores.<br>
      Você teria coragem de subir os degraus para ver quem assombra aquele sótão?
    </p>
    <p>
      Mas cuidado: o professor é tão louco quanto surdo, e seus ouvidos castigados só toleram a perfeição do pouco que consegue entender.<br>
      Diante dele, apenas uma dicção impecável da língua de Molière poderá salvar você.<br>
      Uma única hesitação ou sílaba mal entendida selará o seu destino.
    </p>
    <p class="rule-hint">💡 <em>Ative o microfone ou use o teclado para recitar cada palavra com clareza.</em></p>
  `
};

const endTexts = {
  victory: {
    fr: {
      lore: "« Chut...<br>Vous avez l'oreille fine et la voix pure.<br>Je vous laisse filer dans la nuit...<br>Mais gardez le secret sur ma retraite.<br>Pas un mot aux gardiens de l'asile...<br>Silence absolu ! »",
      feedback: "Le Professeur a confiance en votre silence.<br>Vous êtes libre !"
    },
    pt: {
      lore: "« Chut...<br>Você tem o ouvido apurado e a voz límpida.<br>Deixo você partir na noite...<br>Mas guarde segredo sobre meu refúgio.<br>Nem uma palavra aos guardas do hospício...<br>Silêncio absoluto! »",
      feedback: "O Professor Virelangue confia no seu silêncio.<br>Você escapou!"
    }
  },
  defeat: {
    fr: {
      lore: "« Hahahahaha !<br>Vos cordes vocales cèdent, votre raison s'effondre !<br>Vous resterez enfermé dans mes archives pour l'éternité !<br>Hahahaha ! »",
      challengeLabel: "PRONONCEZ CE MOT :",
      phrase: "FOLIE ACADÉMIQUE",
      feedback: "GAME OVER.<br>Votre esprit s'est éteint."
    },
    pt: {
      lore: "« Hahahahaha !<br>Suas cordas vocais cedem, sua razão desmorona!<br>Você ficará trancado nos meus arquivos pela eternidade!<br>Hahahaha ! »",
      challengeLabel: "DIGA ESTA FRASE :",
      phrase: "LOUCURA ACADÊMICA",
      feedback: "FIM DE JOGO.<br>Sua mente sucumbiu."
    }
  }
};

const chapters = [
  {
    title: "La Maison Hantée de Canter",
    loreFr: "« Ah, vous voilà !<br>Écoutez les poutres gémir dans cette vieille maison.<br>Oui, une maison...<br>Répétez après moi : une maison !<br>Ouvrez bien la bouche et récitez ce mot avant que la porte ne se referme ! »",
    lorePt: "« Ah, você veio!<br>Escute as vigas gemerem nesta velha casa (maison).<br>Sim, uma maison...<br>Repita depois de mim: une maison!<br>Abra bem a boca e recite esta palavra antes que a porta se feche! »",
    phrase: "maison",
    phraseTranslationPt: "Tradução: casa (diga em francês: maison)",
    targetClean: "maison",
    audioSrc: "audio/chapter_1.mp3",
    imgSrc: "images/le-prof-virelangue-1.png"
  },
  {
    title: "Le Spectre du Roi Maudit",
    loreFr: "« Voyez ce grimoire ancien !<br>Il conte la chute tragique d'un roi oublié.<br>Faites rouler le R au fond de votre gorge : un roi !<br>Répétez son noble titre sans faire trébucher votre langue ! »",
    lorePt: "« Veja este antigo tomo!<br>Ele narra a queda trágica de um rei (roi) esquecido.<br>Faça vibrar o som na garganta: un roi!<br>Repita seu nobre título sem fazer sua língua tropeçar! »",
    phrase: "roi",
    phraseTranslationPt: "Tradução: rei (diga em francês: roi)",
    targetClean: "roi",
    audioSrc: "audio/chapter_2.mp3",
    imgSrc: "images/le-prof-virelangue-2.png"
  },
  {
    title: "La Cité Fantôme",
    loreFr: "« Regardez-moi bien !<br>La prononciation est la clé !<br>Dehors, le brouillard spectral dévore toute la ville.<br>Attention au piège : on prononce ville, pas de son mouillé !<br>Nommez ce dédale pavé ! »",
    lorePt: "« Olhe bem para mim!<br>A pronúncia é a chave!<br>Lá fora, o nevoeiro espectral devora toda a cidade (ville).<br>Atenção à armadilha: pronuncia-se ville, sem som mole!<br>Diga o nome deste labirinto de pedras! »",
    phrase: "ville",
    phraseTranslationPt: "Tradução: cidade (diga em francês: ville)",
    targetClean: "ville",
    audioSrc: "audio/chapter_3.mp3",
    imgSrc: "images/le-prof-virelangue-3.png"
  },
  {
    title: "Le Festin Écarlate",
    loreFr: "« Dans les caves obscures, un jus fermente comme un venin noir.<br>Un nectar amer extrait d'un sombre raisin.<br>Je ne le répéterai pas deux fois : à vous de parler ! »",
    lorePt: "« Nos porões escuros, um caldo fermenta como veneno negro.<br>Um néctar amargo extraído de uma uva (raisin) escura.<br>Não repetirei duas vezes: cabe a você falar! »",
    phrase: "raisin",
    phraseTranslationPt: "Tradução: uva (diga em francês: raisin)",
    targetClean: "raisin",
    audioSrc: "audio/chapter_4.mp3",
    imgSrc: "images/le-prof-virelangue-2.png"
  },
  {
    title: "Le Lac des Noyés",
    loreFr: "« Des mains spectrales émergent des marécages profonds.<br>Une seule syllabe pure pour nommer l'eau glacée.<br>Prononcez-la sans trembler avant d'être englouti ! »",
    lorePt: "« Mãos espectrais emergem dos pântanos profundos.<br>Apenas uma única sílaba pura para nomear a água (eau) gélida.<br>Pronuncie-a sem tremer antes de ser afogado! »",
    phrase: "eau",
    phraseTranslationPt: "Tradução: água (diga em francês: eau)",
    targetClean: "eau",
    audioSrc: "audio/chapter_5.mp3",
    imgSrc: "images/le-prof-virelangue-3.png"
  }
];

const globalAudio = {
  intro: "audio/intro.mp3",
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
let gameStatus = "playing";

let mediaRecorder = null;
let audioChunks = [];
let isRecording = false;

let gateScreen;
let jouerBtn;

let startScreen;
let gameScreen;
let startBtn;
let restartBtn;
let introTranslateBtn;
let introFlagEl;
let introFlagLabelEl;
let introTextEl;

let gameTranslateBtn;
let gameFlagEl;
let gameFlagLabelEl;
let professorImg;
let loreEl;
let challengeBoxEl;
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
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_.,!?;:'"«»()]/g, " ")
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  if (longer.length === 0) return 1.0;
  return (longer.length - levenshteinDistance(longer, shorter)) / parseFloat(longer.length);
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
    console.warn("Lecture audio bloquée ou absente:", src, err);
  });
}

function startIntroAudio() {
  stopAudio();
  currentAudioPlayer.src = globalAudio.intro;
  currentAudioPlayer.play().catch(err => {
    console.warn("Audio intro bloqué ou absent:", err);
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
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        channelCount: 1
      }
    });
    audioChunks = [];
    
    const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : (MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "");

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
        feedbackEl.innerHTML = isGameInPt
          ? "Gravando...<br>Articule bem a palavra e clique para parar."
          : "Enregistrement...<br>Articulez bien le mot puis cliquez.";
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
        feedbackEl.innerHTML = isGameInPt
          ? "O professor examina a sua pronúncia..."
          : "Le professeur examine votre diction...";
      }

      const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || "audio/webm" });
      await sendAudioToBackend(audioBlob);
    };

    mediaRecorder.start();
  } catch (err) {
    console.error("Erreur micro:", err);
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.innerHTML = isGameInPt
        ? "Microfone não acessível.<br>Digite a resposta abaixo."
        : "Accès micro impossible.<br>Utilisez le champ texte.";
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

    if (!res.ok) throw new Error("Erreur serveur");

    const data = await res.json();
    if (data.transcript && data.transcript.trim() !== "") {
      validateInput(data.transcript, false);
    } else {
      if (feedbackEl) {
        feedbackEl.className = "feedback fail";
        feedbackEl.innerHTML = isGameInPt
          ? "O professor não conseguiu ouvir nada além de ruído.<br>Tente de novo."
          : "Le professeur n'a rien saisi.<br>Répétez plus distinctement.";
      }
    }
  } catch (err) {
    console.error(err);
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.innerHTML = isGameInPt
        ? "Erro no servidor.<br>Tente responder digitando."
        : "Erreur de connexion.<br>Tapez votre mot ci-dessous.";
    }
  }
}

function updateGameTexts() {
  if (gameStatus === "won") {
    const t = isGameInPt ? endTexts.victory.pt : endTexts.victory.fr;
    if (loreEl) loreEl.innerHTML = t.lore;
    if (feedbackEl) {
      feedbackEl.className = "feedback success";
      feedbackEl.innerHTML = t.feedback;
    }
    updateFlagUI();
    return;
  }

  if (gameStatus === "lost") {
    const t = isGameInPt ? endTexts.defeat.pt : endTexts.defeat.fr;
    if (loreEl) loreEl.innerHTML = t.lore;
    if (challengeLabelEl) challengeLabelEl.textContent = t.challengeLabel;
    if (phraseEl) phraseEl.textContent = t.phrase;
    if (phraseTranslationEl) phraseTranslationEl.style.display = "none";
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.innerHTML = t.feedback;
    }
    updateFlagUI();
    return;
  }

  if (currentStage >= chapters.length) return;

  const ch = chapters[currentStage];
  if (professorImg) professorImg.src = ch.imgSrc;
  if (loreEl) loreEl.innerHTML = isGameInPt ? ch.lorePt : ch.loreFr;
  if (phraseEl) phraseEl.textContent = `« ${ch.phrase} »`;

  if (isGameInPt) {
    if (challengeLabelEl) challengeLabelEl.textContent = "DIGA A PALAVRA EM FRANCÊS :";
    if (phraseTranslationEl) {
      phraseTranslationEl.textContent = ch.phraseTranslationPt;
      phraseTranslationEl.style.display = "block";
    }
  } else {
    if (challengeLabelEl) challengeLabelEl.textContent = "PRONONCEZ CE MOT :";
    if (phraseTranslationEl) phraseTranslationEl.style.display = "none";
  }

  updateFlagUI();
}

function updateFlagUI() {
  if (gameFlagEl && gameFlagLabelEl) {
    if (isGameInPt) {
      gameFlagEl.textContent = "🇫🇷";
      gameFlagLabelEl.textContent = "FR";
    } else {
      gameFlagEl.textContent = "🇧🇷";
      gameFlagLabelEl.textContent = "PT";
    }
  }
}

function validateInput(userInput, isTyped = false) {
  const cleanUser = normalizeText(userInput);
  const cleanTarget = normalizeText(chapters[currentStage].targetClean);

  if (!cleanUser) {
    sanity -= 25;
    updateSanity();
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.innerHTML = isGameInPt
        ? "Resposta vazia!<br>Sua sanidade cai."
        : "Réponse vide !<br>Votre santé mentale faiblit.";
    }
    playAudio(globalAudio.wrong);
    if (sanity <= 0) gameOver();
    return;
  }

  let isMatch = false;

  if (isTyped) {
    isMatch = (cleanUser === cleanTarget);
  } else {
    const words = cleanUser.split(" ");
    isMatch = (cleanUser === cleanTarget) || words.includes(cleanTarget);

    if (!isMatch) {
      for (const word of words) {
        if (calculateSimilarity(word, cleanTarget) >= 0.75) {
          isMatch = true;
          break;
        }
      }
    }
  }

  if (isMatch) {
    if (feedbackEl) {
      feedbackEl.className = "feedback success";
      feedbackEl.innerHTML = isGameInPt
        ? `« ${userInput} »...<br>Admira-se a perfeição! Você acertou!`
        : `« ${userInput} »...<br>Magnifique ! Votre réponse est juste !`;
    }
    playAudio(globalAudio.correct);
    setTimeout(nextStage, 1800);
  } else {
    sanity -= 25;
    updateSanity();
    if (feedbackEl) {
      feedbackEl.className = "feedback fail";
      feedbackEl.innerHTML = isGameInPt
        ? `Você ${isTyped ? "digitou" : "disse"}: « ${userInput} ».<br>Incorreto! (Esperado: « ${cleanTarget} »)`
        : `Vous avez ${isTyped ? "écrit" : "dit"} : « ${userInput} ».<br>Hérétique ! (Attendu : « ${cleanTarget} »)`;
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
  if (challengeBoxEl) challengeBoxEl.style.display = "block";
  updateGameTexts();
  if (feedbackEl) feedbackEl.innerHTML = "";
  if (manualInput) manualInput.value = "";
  playAudio(ch.audioSrc);
}

function nextStage() {
  currentStage++;
  if (currentStage >= chapters.length) {
    gameStatus = "won";
    if (professorImg) professorImg.src = "images/le-prof-virelangue-4.png";
    if (challengeBoxEl) challengeBoxEl.style.display = "none";
    updateGameTexts();
    endGameUI();
    playAudio(globalAudio.victory);
  } else {
    loadStage(currentStage);
  }
}

function gameOver() {
  gameStatus = "lost";
  if (professorImg) professorImg.src = "images/le-prof-virelangue-5.png";
  if (challengeBoxEl) challengeBoxEl.style.display = "block";
  updateGameTexts();
  endGameUI();
  playAudio(globalAudio.defeat);
}

function endGameUI() {
  stopAudio();
  if (micBtn) micBtn.style.display = "none";
  if (fallbackForm) fallbackForm.style.display = "none";
  if (restartBtn) restartBtn.style.display = "flex";
  if (gameTranslateBtn) gameTranslateBtn.style.display = "inline-flex";
}

function resetGame() {
  stopAudio();
  sanity = 100;
  currentStage = 0;
  gameStatus = "playing";
  isRecording = false;
  updateSanity();
  if (challengeBoxEl) challengeBoxEl.style.display = "block";
  if (micBtn) {
    micBtn.style.display = "flex";
    micBtn.classList.remove("listening");
    micBtn.innerHTML = '<span class="btn-icon">🎙️</span> PARLER (fr-FR)';
  }
  if (fallbackForm) fallbackForm.style.display = "flex";
  if (restartBtn) restartBtn.style.display = "none";
  if (gameTranslateBtn) gameTranslateBtn.style.display = "inline-flex";
  loadStage(0);
}

document.addEventListener("DOMContentLoaded", () => {
  gateScreen = document.getElementById("gate-screen");
  jouerBtn = document.getElementById("jouer-btn");

  startScreen = document.getElementById("start-screen");
  gameScreen = document.getElementById("game-screen");
  startBtn = document.getElementById("start-btn");
  restartBtn = document.getElementById("restart-btn");

  introTranslateBtn = document.getElementById("intro-translate-btn");
  introFlagEl = document.getElementById("intro-flag");
  introFlagLabelEl = document.getElementById("intro-flag-label");
  introTextEl = document.getElementById("intro-text");

  gameTranslateBtn = document.getElementById("game-translate-btn");
  gameFlagEl = document.getElementById("game-flag");
  gameFlagLabelEl = document.getElementById("game-flag-label");

  professorImg = document.getElementById("professor-img");
  loreEl = document.getElementById("lore-text");
  challengeBoxEl = document.getElementById("challenge-box");
  phraseEl = document.getElementById("target-phrase");
  phraseTranslationEl = document.getElementById("target-phrase-translation");
  challengeLabelEl = document.getElementById("challenge-label");
  feedbackEl = document.getElementById("feedback");
  micBtn = document.getElementById("mic-btn");
  stageNumEl = document.getElementById("stage-num");
  sanityFill = document.getElementById("sanity-fill");
  fallbackForm = document.getElementById("fallback-form");
  manualInput = document.getElementById("manual-input");

  if (jouerBtn && gateScreen && startScreen) {
    jouerBtn.addEventListener("click", () => {
      gateScreen.classList.remove("active");
      startScreen.classList.add("active");
      startIntroAudio();
    });
  }

  if (introTranslateBtn && introTextEl) {
    introTranslateBtn.addEventListener("click", () => {
      isIntroInPt = !isIntroInPt;
      introTextEl.innerHTML = isIntroInPt ? introTexts.pt : introTexts.fr;
      if (startBtn) {
        startBtn.textContent = isIntroInPt ? "SEGUIR OS ECOS" : "SUIVRE LES ÉCHOS";
      }
      if (introFlagEl && introFlagLabelEl) {
        introFlagEl.textContent = isIntroInPt ? "🇫🇷" : "🇧🇷";
        introFlagLabelEl.textContent = isIntroInPt ? "FR" : "PT";
      }
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
      stopAudio();
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
      if (startBtn) {
        startBtn.textContent = isIntroInPt ? "SEGUIR OS ECOS" : "SUIVRE LES ÉCHOS";
      }
      startIntroAudio();
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
      const val = manualInput.value.trim();
      if (val !== "") {
        validateInput(val, true);
      }
    });
  }
});
