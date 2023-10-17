import React, { useContext, useState } from 'react'
import { db } from '.././configs/firebase'
import { collection, addDoc, serverTimestamp} from "firebase/firestore";
import { MyUserContext } from '../App';

function SendMessage({selectedUser}) {
    const [user] = useContext(MyUserContext)
    const [msg, setMsg] = useState('')
    const messagesRef = collection(db, "messages");
  
       const sendMsg = async (e) => {
        // const { uid, photoURL } = user
        
        await addDoc(messagesRef, {
            text: msg,
            createdAt: serverTimestamp(),
            sender: user.username,
            receiver: "hung",
        })
        setMsg('');
      };

    return (
        <div className="fixed bottom-0 right-5">
               <input placeholder='Message...' 
                 type="text" value={msg} 
                 onChange={(e) => setMsg(e.target.value)}
              />
              <button onClick={sendMsg}>Send</button>
        </div>
    )
}

export default SendMessage