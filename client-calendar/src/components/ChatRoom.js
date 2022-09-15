import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { URL_SERVER } from "../helpers/server-link";
import { errorHandler } from "../helpers/toast";
import ChatItem from "./ChatItem";

const socket = io.connect("https://wokitout-socket-server.herokuapp.com/");
// https://wokitout-socket-server.herokuapp.com/

const ChatRoom = (props) => {
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const [message, setMessage] = useState("");

  const [messageList, setMessageList] = useState([]);

  const { projectId } = useParams();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const chatRoomRef = useRef();

  useEffect(() => {
    if (currentProjectId === null || currentProjectId !== projectId) {
      socket.emit("leave_project_chat", currentProjectId);

      socket.emit("join_project_chat", projectId);

      socket.off("receive_message");

      socket.on("receive_message", (data) => {
        setMessageList((prev) => [
          ...prev,
          {
            data: {
              username: data.data.username,
              chat: data.data.chat,
              createdAt: data.data.createdAt,
            },
          },
        ]);
      });
      setCurrentProjectId(projectId); //terima watch
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      axios(`${URL_SERVER}/projects/${projectId}/chat`, {
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          const newMessageList = [];
          response.data.chat.forEach((chat) => {
            const newChat = {
              data: {
                username: chat.User.username,
                chat: chat.chat,
                createdAt: chat.createdAt,
              },
            };
            newMessageList.push(newChat);
          });
          setMessageList(newMessageList);
        })
        .catch((err) => errorHandler(err));
    }
  }, [projectId]);

  useEffect(() => {
    chatRoomRef.current?.scrollTo(0, chatRoomRef.current?.scrollHeight);
  }, [messageList]); //buat ngerender ke paling bawah kalo ada perubahan di message list

  const sendMessage = () => {
    const data = {
      user_id: userId,
      project_id: projectId,
      username: username,
      chat: message,
      createdAt: new Date(),
    };
    socket.emit("send_message", { data });

    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: "56vh",
        backgroundColor: "lightgray",
        borderRadius: 8,
      }}
    >
      <div
        id="chat-room"
        style={{
          flexOverflow: "wrap",
          overflow: "auto",
          position: "relative",
          width: "100%",
          height: "45",
        }}
        ref={chatRoomRef}
      >
        {/* <h1>ProjectId: {projectId}</h1> */}

        {messageList.map((message, index) => {
          return (
            <ChatItem
              key={`chat-item-${index}`}
              user={message.data.username}
              message={message.data.chat}
              createdAt={message.data.createdAt}
            />
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "10px",
        }}
      >
        <input
          style={{
            width: "95%",
            height: "30px",
            padding: "5px",
            fontSize: "12px",
            color: "black",
            borderRadius: 8,
          }}
          placeholder="message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          style={{
            width: "30px",
            backgroundColor: "#292524",
            cursor: "pointer",
            borderRadius: "5px",
            fontSize: "12px",
          }}
          type="button"
          onClick={sendMessage}
        >
          <i className="far fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
