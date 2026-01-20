FROM node:25-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "dev" ]
EXPOSE 3000
#EXPOSE 49153