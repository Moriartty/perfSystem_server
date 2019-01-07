FROM node:latest

RUN mkdir -p /home/www/perfSystem_server
WORKDIR /home/www/perfSystem_server

COPY . /home/www/perfSystem_server

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm","run"]
CMD ["start"]
