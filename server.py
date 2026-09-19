import os
import shutil
import tempfile
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from faster_whisper import WhisperModel

app = FastAPI(title="Le Professeur Virelangue Backend")

# Modelo tiny otimizado para CPU de baixa capacidade (Render Free Tier)
# Executa até 4x mais rápido que o modelo base e consome menos de 400MB de RAM
model = WhisperModel("tiny", device="cpu", compute_type="int8", cpu_threads=2)

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="Arquivo de áudio não enviado.")

    suffix = os.path.splitext(file.filename)[1] or ".webm"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_path = temp_file.name
        shutil.copyfileobj(file.file, temp_file)

    try:
        # Inferência direta (greedy search): reduz latência no Render
        segments, _ = model.transcribe(
            temp_path,
            language="fr",
            initial_prompt="maison roi ville raisin eau",
            beam_size=1,
            best_of=1,
            temperature=0.0,
            vad_filter=False,
            without_timestamps=True
        )
        
        full_transcript = " ".join([seg.text for seg in segments]).strip()
        return {"transcript": full_transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no processamento: {str(e)}")
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

app.mount("/", StaticFiles(directory="public", html=True), name="public")

@app.get("/")
async def read_index():
    return FileResponse("public/index.html")
