FROM nginx:alpine

# Copiar todos os arquivos do projeto para o diretório do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]