FROM node:latest
COPY server.js server.js
COPY client/ client/
COPY package.json package.json
RUN npm install
RUN client/npm install
EXPOSE 8080
CMD node server.js
