FROM nginx:alpine

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia os arquivos estáticos da pasta public
COPY public /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
