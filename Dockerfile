FROM node:latest
COPY server.js server.js
COPY config/ config/
COPY client/ client/
COPY package.json package.json
RUN npm install
RUN npm install --prefix ./client
EXPOSE 8080
CMD node server.js
