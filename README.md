# multipler-game

## Run server locally
1. Run `npm i`
2. Create .env file and put env variables inside
3. Run `npm run setup:users`
4. Run `npm run start:dev`

## Environment variables
```
DB_URL=mongodb://root:root@localhost:27017/multipler-game
PORT=3000
PORT_SOCKET=3030
```

## Requirements
- NodeJS 16+
- Docker

## Run MongoDB container

`cd containers/mongodb && docker-compose up -d`

## Doc
Local documentation url `http://localhost:3000/doc`

## API
POST `/api/login` - Login as user and assigne users to game.
POST `/api/game/:id/round/start` - Process game round base on provided options.
GET `/api/game/:id/messages` - Get all game messages.

WS `/chat` - websocket for chat.
  - sendMessage - event name for send messages.
  - reveiveMessage - event name for subscribing and receiving messages.