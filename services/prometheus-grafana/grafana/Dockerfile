FROM alpine:latest AS builder

RUN apk add --no-cache openssl

RUN mkdir -p /etc/grafana/certs

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/grafana/certs/server.key \
    -out /etc/grafana/certs/server.crt \
    -subj "/CN=localhost"

RUN chmod 666 /etc/grafana/certs/*

FROM grafana/grafana:latest

COPY --from=builder /etc/grafana/certs /etc/grafana/certs

COPY grafana.ini /etc/grafana/grafana.ini

EXPOSE 3002

CMD ["grafana-server", "--config=/etc/grafana/grafana.ini"]
