import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatItem from "./ChatItem";

const socket = io.connect("http://localhost:3003");

const ChatRoom = (props) => {
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const [message, setMessage] = useState("");

  const [messageList, setMessageList] = useState([]);

  const { projectId } = useParams();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (currentProjectId === null || currentProjectId != projectId) {
      socket.emit("leave_project_chat", currentProjectId);

      socket.emit("join_project_chat", projectId);

      socket.off("receive_message");

      socket.on("receive_message", (data) => {
        // console.log('receive_message', data)
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
      axios(`http://localhost:3001/projects/${projectId}/chat`, {
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          console.log(response);
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
            // console.log(newChat, 'test newchat')
          });
          setMessageList(newMessageList);
        })
        .catch((err) => console.log(err));
    }
  }, [projectId]);

  const sendMessage = () => {
    const data = {
      user_id: userId,
      project_id: projectId,
      username: username,
      chat: message,
      createdAt: new Date(),
    };
    console.log(data, "ini data sendmessage");
    socket.emit("send_message", { data });
    // setMessageList(prev => [...prev, {
    //     data: {
    //         username: username,
    //         chat: message,
    //         createdAt: new Date()
    //     }
    // }])
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: "8px",
        margin: "40px 40px",
        width: "80vw",
        height: "80vh",
        backgroundColor: "lightgray",
        flexOverflow: "wrap",
        overflowY: "scroll",
      }}
    >
      <h1>ProjectId: {projectId}</h1>

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
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "10px",
        }}
      >
        <input
          style={{
            width: "100%",
            height: "40px",
            padding: "10px",
            fontSize: "24px",
          }}
          placeholder="type your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          style={{
            width: "80px",
            backgroundColor: "lime",
            cursor: "pointer",
          }}
          type="button"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
