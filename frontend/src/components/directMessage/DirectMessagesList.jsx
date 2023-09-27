import "../message/MessageList/MessageLists.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDirectMessages,
  fetchDirectMessages,
} from "../../store/directMessage";
import { fetchConversation, getConversation } from "../../store/conversation";
import { getCurrentUser } from "../../store/session";
import { getSetScroll, setQuickDelete, setScroll } from "../../store/ui";
import TimeDivider from "../message/MessageList/MessageItem/Time";
import DirectMessageItem from "./DirectMessageItem";
import SimpleMessageItem from "./SimpleDirectMessage";
import DirectMessageInput from "./DirectMessageInput";
import FirstDirectMessage from "./FirstDirectMessage";

const DirectMessagesList = () => {
  const dispatch = useDispatch();

  const { conversationId } = useParams();
  const [disabled, setDisabled] = useState(false);
  const scroll = useSelector(getSetScroll);
  const messages = useSelector(getDirectMessages);
  const conversation = useSelector(getConversation(conversationId));
  const sessionUser = useSelector(getCurrentUser);

  useEffect(() => {
    const messageElement = document.querySelector(".messages-list");
    if (messageElement && scroll) {
      messageElement.scrollTo(0, messageElement.scrollHeight);
      dispatch(setScroll(false));
    }
  }, [dispatch, messages, scroll]);

  useEffect(() => {
    const keydownListener = (e) => {
      const formModal = document.querySelector(".modal-form");
      const adminModal = document.querySelector(".setting-page-modal");
      const dropdownModal = document.querySelector(".server-settings");
      if (formModal || adminModal || dropdownModal) return;

      const editInput = document.querySelector(".message-textarea.edit");
      if (e.key === "Shift" && !e.repeat) {
        dispatch(setQuickDelete(true));
      } else if (e.key === "Escape" && editInput) {
        setDisabled(true);
        setTimeout(() => setDisabled(false), 500);
      } else if (e.key === "Escape" && !disabled) {
        const messageElement = document.querySelector(".messages-list");
        if (messageElement)
          messageElement.scrollTo(0, messageElement.scrollHeight);
      }
    };

    const keyupListener = (e) => {
      e.preventDefault();
      const formModal = document.querySelector(".modal-form");
      const adminModal = document.querySelector(".setting-page-modal");
      const dropdownModal = document.querySelector(".server-settings");
      if (formModal || adminModal || dropdownModal) return;
      else if (e.key === "Shift") dispatch(setQuickDelete(false));
    };

    document.addEventListener("keydown", keydownListener);
    document.addEventListener("keyup", keyupListener);

    return () => {
      dispatch(setQuickDelete(false));
      document.removeEventListener("keydown", keydownListener);
      document.removeEventListener("keyup", keyupListener);
    };
  }, []);

  console.log(messages);
  let previousDate = null;
  let previousTime = null;
  let previousUser = null;
  let previousUserTime = null;

  if (!messages) return <div className="message-list-wrapper" />;

  return (
    <div className="message-list-wrapper">
      <div className="messages-list">
        <FirstDirectMessage />

        {messages.map((message, index) => {
          const date = new Date(message.createdAt);
          let minuteDifference = null;
          let previousUserMinuteDiff = null;

          if (previousTime) {
            minuteDifference = (date - previousTime) / (1000 * 60);
          }

          if (previousUserTime) {
            previousUserMinuteDiff = (date - previousUserTime) / (1000 * 60);
          }

          const extraTimeInfo = date.toLocaleString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          if (index === 0 || extraTimeInfo !== previousDate) {
            previousDate = extraTimeInfo;
            previousTime = date;
            previousUser = message.authorId;
            previousUserTime = date;

            return (
              <div
                key={`${message.id} ${extraTimeInfo}`}
                className="time-message-wrapper"
              >
                <TimeDivider date={extraTimeInfo} key={extraTimeInfo} />
                <DirectMessageItem
                  message={message}
                  user={message.authorId}
                  date={date}
                  extraTimeInfo={extraTimeInfo}
                  key={message.id}
                  sessionId={sessionUser.id}
                  participant={conversation.participant}
                />
              </div>
            );
          } else if (
            index === 0 ||
            message.authorId !== messages[index - 1].authorId ||
            minuteDifference > 5 ||
            (message.authorId === previousUser && previousUserMinuteDiff > 10)
          ) {
            previousUser = message.authorId;
            previousUserTime = date;
            previousTime = date;

            return (
              <DirectMessageItem
                message={message}
                user={message.authorId}
                date={date}
                extraTimeInfo={extraTimeInfo}
                key={message.id}
                sessionId={sessionUser.id}
                participant={conversation.participant}
              />
            );
          } else {
            previousTime = date;

            return (
              <SimpleMessageItem
                message={message}
                user={message.authorId}
                date={date}
                extraTimeInfo={extraTimeInfo}
                key={message.id}
                sessionId={sessionUser.id}
                participant={conversation.participant}
              />
            );
          }
        })}
        <div className="message-list-spacer" />
      </div>
      <DirectMessageInput conversationId={conversationId} />
    </div>
  );
};

export default DirectMessagesList;
