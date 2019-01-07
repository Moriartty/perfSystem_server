FROM node:lastest

RUN mkdir -p /home/www/perfSystem_server
WORKING /home/www/perfSystem_server

COPY . /home/www/perfSystem_server

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm","run"]
CMD ["start"]
