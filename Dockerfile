FROM node:20.6-bullseye-slim

COPY . /app 
WORKDIR /app 

RUN npm i -f
RUN npm i @nestjs/cli -g 
RUN npm run build

EXPOSE 3000 3005
ENTRYPOINT [ "npm", "run", "start:prod" ]
