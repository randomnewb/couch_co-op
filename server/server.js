import colyseus from "colyseus";
import http from "http";
import express from "express";

const { Server, Room, Client } = colyseus;

const port = process.env.PORT || 2567;

const app = express();
app.use(express.json());

const gameServer = new Server({
  server: http.createServer(app),
});

class MyRoom extends Room {
  onCreate(options) {
    console.log("MyRoom created!", options);
  }

  onJoin(client, options) {
    console.log(client.sessionId, "joined!", options);
  }

  onLeave(client, consented) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("Dispose MyRoom");
  }
}

gameServer.define("room_name", MyRoom);

gameServer.listen(port);
