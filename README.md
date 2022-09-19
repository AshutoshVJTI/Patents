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

```sh
- docker build -t patents:dev .
- docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true patents:dev
```
