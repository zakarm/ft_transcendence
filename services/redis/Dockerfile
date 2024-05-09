FROM redis:6.0.16-bullseye

COPY ./conf/redis.conf /usr/local/etc/redis/redis.conf

EXPOSE 6379

CMD ["redis-server", "/usr/local/etc/redis/redis.conf", "--protected-mode", "no"]
