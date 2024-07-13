FROM docker.elastic.co/logstash/logstash:8.12.2

USER '0'

COPY ./config/logstash.yml /usr/share/logstash/config/logstash.yml
COPY ./pipeline /usr/share/logstash/pipeline
