FROM node:25-alpine

# Create app directory
WORKDIR /

# Install app dependencies
COPY package.json package.json

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "dev" ]
EXPOSE 8080