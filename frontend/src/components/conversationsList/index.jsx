import "../server/serverSideBar.css";
import "./ConversationList.css";
import React, { useState, useEffect } from "react";
import { useSelector, u } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchConversations,
  createConversation,
  deleteConversation,
  getConversations,
} from "../../store/conversation";
import { getCurrentUser } from "../../store/session";
import consumer from "../../consumer";
import ConversationIndexList from "./ConversationIndexList";
import ConvoListItem from "../friendsDisplay/FriendsListItem/ConvoListItem";
const ConversationsList = () => {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const convos = useSelector(getConversations);

  const { conversationId } = useParams();
  const selected = conversationId;

  useEffect(() => {
    // Load all conversations on component mount
    dispatch(fetchConversations());

    //filter and onnly keep conversations with unique convo.participant.id

    // const subscription = consumer.subscriptions.create(
    //   { channel: "UsersChannel" },
    //   {
    //     received: ({ type, participant, id }) => {
    //       switch (type) {
    //         // add direct message notifications here later
    //         case "ADD_CONVERSATION":
    //           console.log("works");
    //           // dispatch(createConversation(server));
    //           break;
    //         case "DELETE_SERVER":
    //           dispatch(deleteConversation(id));
    //           break;
    //         default:
    //         // console.log("unknown broadcast type");
    //       }
    //     },
    //   }
    // );

    // return () => {
    //   subscription?.unsubscribe();
    // };
  }, []);

  const uniqueConvos = convos.filter((convo, index) => {
    return (
      convos.findIndex((convo2) => {
        return convo.participant.id === convo2.participant.id;
      }) === index
    );
  });

  return (
    <>
      {uniqueConvos.map((convo) => {
        return (
          <ConvoListItem
            userId={convo.participant.id}
            name={convo.participant.username}
            status={convo.participant.onlineStatus}
            customStatus={convo.participant.customStatus}
            picture={
              convo.participant.profilePictureUrl
                ? convo.participant.profilePictureUrl
                : ""
            }
            key={convo.id}
            actions="friendItem"
            conversationId={convo.id}
          />
        );
      })}
    </>
    //   return (
    //     <>
    //       {convos.map((convo) => {
    //         return (
    //           <div className="friend-box" key={convo.id}>
    //             <div className={`server-item-wrapper ${checkSelected(convo.id)}`}>
    //               <ConversationIndexList
    //                 id={convo.id}
    //                 image={convo.participant.profilePictureUrl}
    //                 name={convo.participant.username || "Untitled Conversation"}
    //                 isServer={false}
    //               />
    //             </div>
    //             <div className="username-place-holder">
    //               {convo.participant.username.toUpperCase()}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </>
    // <>
    //    {
    //     convos.map((convo) => {
    //       return (
    //         <div
    //           className={`server-item-wrapper ${checkSelected(convo.id)}`}
    //           key={convo.id}
    //         >
    //           <ServerIndexList
    //             id={convo.id}
    //             image={""}
    //             name={convo.name || "Untitled Conversation"}
    //           />
    //         </div>
    //       );
    //     });
    //     }

    // </>
  );
};

export default ConversationsList;
