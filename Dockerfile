FROM node:20-slim

RUN apt update && \ 
	apt install procps && \
	npm install -g @nestjs/cli@10.1.18

WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null" ]