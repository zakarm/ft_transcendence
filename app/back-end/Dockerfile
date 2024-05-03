FROM python:3.12

WORKDIR /back-end

COPY tools/configs/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python3", "tools/scripts/init.py"]