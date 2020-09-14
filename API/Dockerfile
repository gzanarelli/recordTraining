FROM node:11

RUN apt-get update && apt-get install -y build-essential

RUN mkdir /app

WORKDIR /app
COPY ./app /app

RUN yarn

RUN yarn global add nodemon


RUN chmod +x start.sh

CMD /app/start.sh