FROM python:3.11

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /back-end

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python3", "init.py"]