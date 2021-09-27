FROM node:lts-alpine

# Install packages
RUN apk add --no-cache bash && \
  apk add curl && \
  apk add openssl && \
  deluser --remove-home node && \
  adduser -h /home/node -s /bin/sh -u 55002 -D -g 'Node User' node

USER node
# Append SAN section to openssl.cnf and generate a new self-signed certificate and key
RUN mkdir -p /home/node/ssl/certs && \
    cp /etc/ssl/openssl.cnf /home/node/ssl/openssl.cnf && \
    printf "[SAN]\nsubjectAltName=DNS:*.hul.harvard.edu,DNS:*.lts.harvard.edu" >> /home/node/ssl/openssl.cnf && \
    openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj "/C=US/ST=Massachusetts/L=Cambridge/O=Library Technology Services/CN=*.lib.harvard.edu" -extensions SAN -reqexts SAN -config /home/node/ssl/openssl.cnf -keyout /home/node/ssl/certs/server.key -out /home/node/ssl/certs/server.crt && \
    mkdir -p /home/node/app

# Set working directory
WORKDIR /home/node/app

# Copy code
COPY . /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3002 8081
CMD [ "npm", "start" ]