FROM prom/alertmanager:latest

ARG SMTP_TO=${SMTP_TO}
ARG SMTP_FROM=${SMTP_FROM}
ARG SMTP_SMARTHOST=${SMTP_SMARTHOST}
ARG SMTP_AUTH_USERNAME=${SMTP_AUTH_USERNAME}
ARG SMTP_AUTH_IDENTITY=${SMTP_AUTH_IDENTITY}
ARG SMTP_AUTH_PASSWORD=${SMTP_AUTH_PASSWORD}

COPY ./alertmanager.yml /etc/alertmanager/alertmanager.yml

RUN sed -i "s|SMTP_TO|${SMTP_TO}|g" /etc/alertmanager/alertmanager.yml
RUN sed -i "s|SMTP_FROM|${SMTP_FROM}|g" /etc/alertmanager/alertmanager.yml
RUN sed -i "s|SMTP_SMARTHOST|${SMTP_SMARTHOST}|g" /etc/alertmanager/alertmanager.yml
RUN sed -i "s|SMTP_AUTH_USERNAME|${SMTP_AUTH_USERNAME}|g" /etc/alertmanager/alertmanager.yml
RUN sed -i "s|SMTP_AUTH_IDENTITY|${SMTP_AUTH_IDENTITY}|g" /etc/alertmanager/alertmanager.yml
RUN sed -i "s|SMTP_AUTH_PASSWORD|${SMTP_AUTH_PASSWORD}|g" /etc/alertmanager/alertmanager.yml

CMD ["--config.file=/etc/alertmanager/alertmanager.yml"]
