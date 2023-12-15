FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .

EXPOSE 3006

CMD ["node", "app.js"]


# CMD ["nodemon", "index.js"]