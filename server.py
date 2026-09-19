import os
import shutil
import tempfile
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from faster_whisper import WhisperModel

app = FastAPI()

# Modelo whisper "tiny" ou "base" em CPU: rápido, leve e preciso em francês
# "tiny" consome ~390MB de RAM, perfeito para a camada gratuita do Render (512MB limit)
model = WhisperModel("tiny", device="cpu", compute_type="int8")


@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    # Cria arquivo temporário para persistir o blob de áudio recebido
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
        shutil.copyfileobj(file.file, temp_audio)
        temp_audio_path = temp_audio.name

    try:
        segments, _ = model.transcribe(
            temp_audio_path, language="fr", beam_size=1)
        transcript = " ".join([segment.text for segment in segments]).strip()
        return {"transcript": transcript}
    except Exception as e:
        return {"transcript": "", "error": str(e)}
    finally:
        if os.path.exists(temp_audio_path):
            os.remove(temp_audio_path)

# Serve a pasta public como arquivos estáticos na raiz
app.mount("/", StaticFiles(directory="public", html=True), name="public")
