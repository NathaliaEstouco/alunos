# Usa o Nginx como servidor web
FROM nginx:latest

# Define o diretório de trabalho
WORKDIR /usr/share/nginx/html

# Copia os arquivos do projeto para dentro do container
COPY . .

# Expõe a porta 8092 (para documentação)
EXPOSE 8092

# Mantém o Nginx rodando
CMD ["nginx", "-g", "daemon off;"]
