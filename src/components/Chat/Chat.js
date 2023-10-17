import React, { useState, useEffect, useContext } from "react";
import { db } from "../../configs/firebase";
import SendMessage from "../SendMessage";
import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { MyUserContext } from "../../App";
import "./Chat.css";
import { Button } from "react-bootstrap";
function Chat() {
  const [messages, setMessages] = useState([]);
  const [user] = useContext(MyUserContext);
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    // Fetch messages to populate messages
    const fetchMessages = async () => {
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt"),
        limit(50)
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let messages = [];
        QuerySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(messages);
      });

      return () => data;
    };

    fetchMessages();
  }, []);

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "messages"),
  //     orderBy("createdAt"),
  //     limit(50)
  //   );
  //   const data = onSnapshot(q, (QuerySnapshot) => {
  //     let messages = [];
  //     QuerySnapshot.forEach((doc) => {
  //       messages.push({ ...doc.data(), id: doc.id });
  //     });
  //     setMessages(messages);
  //   });
  //   return () => data;
  // }, []);

  const selectUser = (username) => {
    setSelectedUser(username);
  };
  
  return (
    <>
      <Button
        className="fixed z-50 bottom-0 right-2 p-3 w-1/12"
        onClick={() => setIsChatVisible(!isChatVisible)}
      >
        Chat
      </Button>
      {isChatVisible && (
        <div className="w-1/2 h-1/2 fixed z-50 bottom-0 right-2 p-3 bg-red-500">
          <button className="" onClick={() => setIsChatVisible(!isChatVisible)}>
            Đóng
          </button>

          <div className="flex h-full">
            <div className="bg-yellow-200 w-2/6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => selectUser(message.receiver)}
                  className={`user-item ${
                    selectedUser === message.receiver ? "selected" : ""
                  }`}
                >
                  {message.receiver}
                </div>
              ))}
              {/* <div onClick={() => setSelectedUser(message.receiver)}>
                shopbanhbeo
              </div> */}
            </div>
            <div className="bg-green-500 w-4/6">
              {messages
                .filter(
                  (message) =>
                    (message.sender === user.username &&
                      message.receiver === selectedUser) ||
                    (message.sender === selectedUser &&
                      message.receiver === user.username)
                )
                .map((message) => (
                  <div
                    key={message.id}
                    className={`msg ${
                      message.sender === user.username
                        ? "own-message"
                        : "received"
                    }`}
                  >
                    <img src={message.photoURL} alt="User Avatar" />
                    <p>{message.text}</p>
                  </div>
                ))}
            </div>
          </div>
          <SendMessage selectedUser={selectedUser} />
        </div>
      )}
    </>
  );
}
export default Chat;
