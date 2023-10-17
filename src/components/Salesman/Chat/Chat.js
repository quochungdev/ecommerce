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
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Button onClick={() => setIsChatVisible(!isChatVisible)}>Chat</Button>
      {isChatVisible && (
        <div>
          {messages &&
            messages.map((message, id, uid, photoURL) => (
              <div
                key={message.id}
                className={`msg ${
                  message.uid === user.id ? "own-message" : "received"
                }`}
              >
                {/* <img src={message.photoURL} /> */}
                <p>{message.text}</p>
              </div>
            ))}
          <SendMessage />
        </div>
      )}
    </>
  );
}
export default Chat;
