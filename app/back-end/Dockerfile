FROM python:3.12

WORKDIR /back-end

COPY tools/configs/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "tools/scripts/init.py"]
