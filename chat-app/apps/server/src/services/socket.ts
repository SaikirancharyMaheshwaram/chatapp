import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "redis-d374acf-leonardo-chatapp.a.aivencloud.com",
  port: 15069,
  username: "default",
  password: "AVNS_XPZvHg3eoCyIahVLiS5",
});
const sub = new Redis({
  host: "redis-d374acf-leonardo-chatapp.a.aivencloud.com",
  port: 15069,
  username: "default",
  password: "AVNS_XPZvHg3eoCyIahVLiS5",
});

class SocketService {
  private _io: Server;
  constructor() {
    console.log("init socket server");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGE");
  }
  get io() {
    return this._io;
  }
  public initEventListeners() {
    const io = this.io;
    console.log("initize socket listeners");
    io.on("connect", (socket) => {
      console.log(`New socket connected`, socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("new message ", message);
        await pub.publish("MESSAGE", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      console.log("here");
      if (channel === "MESSAGE") {
        io.emit("message", message);
      }
    });
  }
}
export default SocketService;
