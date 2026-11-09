FROM nginxinc/nginx-unprivileged:stable-alpine

# Site estático servido pelo nginx na porta 8080 (padrão do Cloud Run)
COPY index.html style.css script.js /usr/share/nginx/html/
COPY *.webp /usr/share/nginx/html/

EXPOSE 8080
