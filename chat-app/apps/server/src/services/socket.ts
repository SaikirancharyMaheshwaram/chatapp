import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    console.log("init socket server");
    this._io = new Server();
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
      });
    });
  }
}
export default SocketService;
