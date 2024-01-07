"use client";
import React, { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";

const page = () => {
  const [message, SetMessage] = useState("");
  const { sendMessage } = useSocket();
  return (
    <div>
      <div className="all-messages">
        <h1>All messages</h1>
      </div>

      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => SetMessage(e.target.value)}
        className={classes["chat-input"]}
      />
      <button
        className={classes["chat-button"]}
        onClick={() => sendMessage(message)}
      >
        Send
      </button>
    </div>
  );
};

export default page;
