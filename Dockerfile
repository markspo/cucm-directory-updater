FROM node:18-slim

WORKDIR /app

COPY package.json ./
RUN npm install

COPY index.js ./
RUN mkdir data

CMD ["node", "index.js"]