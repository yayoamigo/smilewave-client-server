FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
COPY API/package*.json API/
RUN npm  install

COPY client/ client/

COPY API/ API/

CMD ["npm", "run", "deploy"]

EXPOSE 8000