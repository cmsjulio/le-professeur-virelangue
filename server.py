import os
import shutil
import tempfile
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from groq import Groq

app = FastAPI(title="Le Professeur Virelangue Backend")

# Inicializa o cliente da Groq utilizando a variável de ambiente GROQ_API_KEY
groq_api_key = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=groq_api_key) if groq_api_key else None

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="Arquivo de áudio não enviado.")

    if not client:
        raise HTTPException(
            status_code=500, 
            detail="GROQ_API_KEY não configurada no servidor. Adicione a chave nas variáveis de ambiente."
        )

    # Cria arquivo temporário preservando a extensão original (.webm, .mp4, etc.)
    suffix = os.path.splitext(file.filename)[1] or ".webm"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_path = temp_file.name
        shutil.copyfileobj(file.file, temp_file)

    try:
        # Envia diretamente para a LPU da Groq (tempo médio de resposta: ~300ms)
        with open(temp_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                file=(os.path.basename(temp_path), audio_file.read()),
                model="whisper-large-v3-turbo",
                prompt="maison roi ville raisin eau",
                response_format="json",
                language="fr",
                temperature=0.0
            )

        full_transcript = transcription.text.strip()
        return {"transcript": full_transcript}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro no processamento da Groq: {str(e)}")
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

# Monta arquivos estáticos do jogo
app.mount("/", StaticFiles(directory="public", html=True), name="public")

@app.get("/")
async def read_index():
    return FileResponse("public/index.html")
