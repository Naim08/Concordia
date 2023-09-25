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
const ConversationsList = () => {
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const convos = useSelector(getConversations);

  const { conversationId } = useParams();
  const selected = conversationId;

  useEffect(() => {
    // Load all conversations on component mount
    dispatch(fetchConversations());

    const subscription = consumer.subscriptions.create(
      { channel: "UsersChannel" },
      {
        received: ({ type, participant, id }) => {
          switch (type) {
            // add direct message notifications here later
            case "ADD_CONVERSATION":
              console.log("works");
              // dispatch(createConversation(server));
              break;
            case "DELETE_SERVER":
              dispatch(deleteConversation(id));
              break;
            default:
            // console.log("unknown broadcast type");
          }
        },
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  const checkSelected = (id) => {
    if (selected === id.toString()) return "selected";
    return "";
  };
  console.log(convos);

  return (
    <>
      {convos.map((convo) => {
        return (
          <div className="friend-box" key={convo.id}>
            <div className={`server-item-wrapper ${checkSelected(convo.id)}`}>
              <ConversationIndexList
                id={convo.id}
                image={convo.participant.profilePictureUrl}
                name={convo.participant.username || "Untitled Conversation"}
                isServer={false}
              />
            </div>
            <div className="username-place-holder">
              {convo.participant.username.toUpperCase()}
            </div>
          </div>
        );
      })}
    </>
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
