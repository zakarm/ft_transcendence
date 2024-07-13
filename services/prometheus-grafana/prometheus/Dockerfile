FROM alpine:latest AS builder

RUN apk add --no-cache openssl python3 py3-pip py3-virtualenv

RUN mkdir -p /etc/prometheus/certs /etc/prometheus/auth

COPY  gen-pass.py /gen-pass.py

RUN openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 \
    -subj "/C=MA/ST=1337/L=1337/O=1337/CN=localhost" \
    -keyout /etc/prometheus/certs/server.key -out /etc/prometheus/certs/server.crt

RUN chmod 666 /etc/prometheus/certs/*

ARG PROMETHEUS_PASSWORD=$PROMETHEUS_PASSWORD

RUN python3 -m venv /venv && . /venv/bin/activate &&  pip install bcrypt

RUN . /venv/bin/activate && \
    python3 /gen-pass.py ${PROMETHEUS_PASSWORD} > /etc/prometheus/auth/hashed_password

FROM prom/prometheus:latest

COPY --from=builder /etc/prometheus/certs /etc/prometheus/certs
COPY --from=builder /etc/prometheus/auth /etc/prometheus/auth

COPY prometheus.yml /etc/prometheus/prometheus.yml
COPY web.yml /etc/prometheus/web.yml
COPY alert_rules.yml /etc/prometheus/alert_rules.yml

RUN HASHED_PASSWORD=$(cat /etc/prometheus/auth/hashed_password) && \
    sed -i 's|hashed_password|'"$HASHED_PASSWORD"'|g' /etc/prometheus/web.yml

CMD ["--config.file=/etc/prometheus/prometheus.yml", \
     "--web.listen-address=:9090", \
     "--web.external-url=https://localhost", \
     "--web.config.file=/etc/prometheus/web.yml"]
