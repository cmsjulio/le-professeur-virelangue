FROM python:3.10-slim

# Dependências de sistema para manuseio de áudio
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pré-baixa o modelo Whisper 'tiny' durante o build da imagem para evitar delay na inicialização
RUN python3 -c "from faster_whisper import WhisperModel; WhisperModel('tiny', device='cpu', compute_type='int8')"

COPY . .

EXPOSE 8000

CMD ["uvicorn", "server.py:app", "--host", "0.0.0.0", "--port", "8000"]
