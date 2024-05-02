FROM debian:bullseye

RUN apt-get update -y && apt-get install -y \
    --no-install-recommends \
    redis-server=5:6.0.16-1+deb11u2 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY ./conf/redis.conf /etc/redis/

EXPOSE 6379

CMD ["redis-server", "--protected-mode", "no"]
