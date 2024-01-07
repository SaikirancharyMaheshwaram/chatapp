"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}
interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`State is undefined`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log("Send Message", msg);
      if (socket) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );
  const onMessageRecive = useCallback((msg: string) => {
    console.log("From the Server", msg);
  }, []);
  useEffect(() => {
    const _socket = io("http://localhost:8000");
    setSocket(_socket);
    _socket.on("message", onMessageRecive);

    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageRecive);
      setSocket(undefined);
    };
  }, []);
  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
