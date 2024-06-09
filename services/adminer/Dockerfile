FROM adminer:latest

USER root

RUN apt-get update && apt-get install -y curl

RUN mkdir /adminer-theme

WORKDIR /adminer-theme

RUN curl -L "https://github.com/Niyko/Hydra-Dark-Theme-for-Adminer/archive/refs/tags/1.0.2.tar.gz" -o "hydra.tar.gz"

RUN tar -xzvf hydra.tar.gz

RUN cp /adminer-theme/Hydra-Dark-Theme-for-Adminer-1.0.2/* /var/www/html/

WORKDIR /var/www/adminer
