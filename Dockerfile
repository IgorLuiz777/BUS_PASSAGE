# Etapa 1: Construção do React App
FROM node:18 as build
# Definir diretório de trabalho
WORKDIR /app
# Copiar arquivos de dependências
COPY package.json package-lock.json ./
# Instalar dependências
RUN npm install
# Copiar código-fonte para dentro do container
COPY . .
# Criar o build da aplicação
RUN npm run build
# Etapa 2: Servindo a aplicação com Nginx
FROM nginx:alpine
# Copiar arquivos do build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Expor porta 80
EXPOSE 80
# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
