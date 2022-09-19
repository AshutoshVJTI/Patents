## Installation

Install the dependencies and devDependencies and start the server.

```sh
- cd patents-master
- npm i
- npm start
```

## Setting up Port

```sh
- Create a .env file in root directory
- Specify port- PORT=[PORT] //Example: PORT=3001
- After changing port you have to restart the server
```

# Setting up Docker

1. Create a Dockerfile in root directory and paste the subsequent config

```sh
# pull official base image

FROM node:13.12.0-alpine

# set working directory

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app

COPY . ./

# start app

CMD ["npm", "start"]
```

2. docker build -t patents:dev .
3. docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true patents:dev
