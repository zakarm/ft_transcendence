FROM python:3.11

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /back-end

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "while ! nc -z data-base 5432; do sleep 6; done; python manage.py migrate && python3 manage.py runserver 0.0.0.0:8000"]
