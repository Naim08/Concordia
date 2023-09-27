// import React, { useState, useEffect } from "react";

// import { connect } from "react-redux";

// import {
//   fetchDirectMessages,
//   createDirectMessage,
//   updateDirectMessage,
//   deleteDirectMessage,
// } from "../../store/directMessage";
// import DirectMessageInput from "./DirectMessageInput";

// import { useParams } from "react-router-dom";
// import consumer from "../../consumer";
// import { useSelector, useDispatch } from "react-redux";
// import { getCurrentUser } from "../../store/session";

// function DirectMessageDisplay() {
//   const dispatch = useDispatch();
//   const { conversationId } = useParams();
//   const messages = useSelector(
//     (state) => state.entities.directMessages[conversationId] || []
//   );
//   const currentUser = useSelector(getCurrentUser);

//   const [content, setContent] = useState("");

//   useEffect(() => {
//     dispatch(fetchDirectMessages(conversationId));

//     const conversationsSubscription = consumer.subscriptions.create(
//       { channel: "ConversationsChannel", conversation_id: conversationId },
//       {
//         received: (data) => {
//           switch (data.type) {
//             case "NEW_DIRECT_MESSAGE":
//               dispatch(createDirectMessage(data.message));
//               break;
//             case "UPDATE_DIRECT_MESSAGE":
//               dispatch(updateDirectMessage(data.message));
//               break;
//             case "DELETE_DIRECT_MESSAGE":
//               dispatch(deleteDirectMessage(data.messageId));
//               break;
//             default:
//               break;
//           }
//         },
//       }
//     );

//     return () => {
//       consumer.subscriptions.remove(conversationsSubscription);
//     };
//   }, [conversationId, dispatch]);

//   const handleSendMessage = () => {
//     const messageData = {
//       content: content,
//       // Add any other required fields
//     };
//     dispatch(createDirectMessage(conversationId, messageData));
//     setContent("");
//   };

//   return (
//     <div className="message-display-container">
//       <div className="messages-list">
//         {messages.map((message) => (
//           <div key={message.id} className="message-item">
//             {/* Adapt this structure based on your message data */}
//             <span>
//               {message.author.username}: {message.content}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="message-input-container">
//         <DirectMessageInput />
//       </div>
//     </div>
//   );
// }

// export default DirectMessageDisplay;

import "../message/Messages.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../store/session";
import DirectMessagesList from "./DirectMessagesList";
import { useEffect } from "react";
import consumer from "../../consumer";
import {
  createDirectMessage,
  updateDirectMessage,
  deleteDirectMessage,
} from "../../store/directMessage";
const DirectMessageDisplay = () => {
  const dispatch = useDispatch();
  const { conversationId } = useParams();

  // useEffect(() => {
  //   const conversationsSubscription = consumer.subscriptions.create(
  //     { channel: "ConversationsChannel", id: conversationId },
  //     {
  //       received: (data) => {
  //         switch (data.type) {
  //           case "NEW_DIRECT_MESSAGE":
  //             console.log(data);
  //             dispatch(createDirectMessage(conversationId, data.message));
  //             break;
  //           case "UPDATE_DIRECT_MESSAGE":
  //             dispatch(updateDirectMessage(data.message));
  //             break;
  //           case "DELETE_DIRECT_MESSAGE":
  //             dispatch(deleteDirectMessage(data.messageId));
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //     }
  //   );

  //   return () => {
  //     consumer.subscriptions.remove(conversationsSubscription);
  //   };
  // }, [conversationId, dispatch]);

  return (
    <div className="message-display">
      <div className="messages-container">
        <DirectMessagesList />
      </div>
    </div>
  );
};

export default DirectMessageDisplay;
