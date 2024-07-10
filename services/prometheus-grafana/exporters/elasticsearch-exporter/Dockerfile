FROM quay.io/prometheuscommunity/elasticsearch-exporter:latest

ARG ELASTIC_PASSWORD=${ELASTIC_PASSWORD}

EXPOSE 9114

CMD ["--es.uri=https://elastic:$ELASTIC_PASSWORD@elasticsearch:9200", "--es.ssl-skip-verify", "--es.all"]
