FROM nginx:latest

RUN apt-get update && apt-get install -y openssl

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/privkey.pem \
    -out /etc/nginx/certs/cert.pem \
    -subj "/C=MA/ST=Beni Mellal/L=Khouribga/O=Organization/OU=Department/CN=${HOST_IP}"

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
