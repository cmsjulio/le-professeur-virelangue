import os
import shutil
import tempfile
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from faster_whisper import WhisperModel

app = FastAPI()

# Modelo 'base' oferece um salto enorme de precisão em relação ao 'tiny'
# Consome ~250MB de RAM e roda rápido em CPU
model = WhisperModel("base", device="cpu", compute_type="int8")

# Contexto inicial orientando o vocabulário francês esperado no jogo
VOCABULARY_PROMPT = "Maison, roi, ville, raisin, eau. Mots prononcés clairement en français."

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
        shutil.copyfileobj(file.file, temp_audio)
        temp_audio_path = temp_audio.name

    try:
        segments, _ = model.transcribe(
            temp_audio_path,
            language="fr",
            beam_size=5,
            best_of=5,
            temperature=0.0,
            initial_prompt=VOCABULARY_PROMPT,
            vad_filter=False  # Crucial para não descartar palavras monossilábicas
        )
        transcript = " ".join([segment.text for segment in segments]).strip()
        return {"transcript": transcript}
    except Exception as e:
        return {"transcript": "", "error": str(e)}
    finally:
        if os.path.exists(temp_audio_path):
            os.remove(temp_audio_path)

app.mount("/", StaticFiles(directory="public", html=True), name="public")
