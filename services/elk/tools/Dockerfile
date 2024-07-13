FROM docker.elastic.co/elasticsearch/elasticsearch:8.12.2

COPY ./setup_es_certs.sh /usr/share/elasticsearch/setup_es_certs.sh

USER '0'

RUN chmod +x /usr/share/elasticsearch/setup_es_certs.sh

CMD ["/bin/bash", "/usr/share/elasticsearch/setup_es_certs.sh"]
