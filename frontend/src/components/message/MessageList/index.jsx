import "./MessageLists.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChannel } from "../../../store/channel";
import { getMembersObject } from "../../../store/member";
import { getMessages } from "../../../store/message";
import { getSetScroll, setQuickDelete, setScroll } from "../../../store/ui";
import { getCurrentUser } from "../../../store/session";
import { getServer } from "../../../store/server";
import TimeDivider from "./MessageItem/Time";
import MessageItem from "./MessageItem";
import SimpleMessageItem from "./MessageItem/SimpleMessage";
import MessageInput from "./MessageInput";
import FirstServerMessage from "./MessageItem/FirstMessage/FirstServerMessage";
import FirstChannelMessage from "./MessageItem/FirstMessage/FirstChannelMessage";

const MessageList = () => {
  const dispatch = useDispatch();

  const { serverId, channelId } = useParams();
  const [disabled, setDisabled] = useState(false);
  const scroll = useSelector(getSetScroll);
  const channelInfo = useSelector(getChannel(channelId));
  const serverInfo = useSelector(getServer(serverId));
  const messages = useSelector(getMessages);
  const members = useSelector(getMembersObject);
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

  let previousDate = null;
  let previousTime = null;
  let previousUser = null;
  let previousUserTime = null;
  if (!messages || !members || !channelInfo || !serverInfo)
    return <div className="message-list-wrapper" />;

  return (
    <div className="message-list-wrapper">
      <div className="messages-list">
        {channelInfo.id === serverInfo.firstChannelId ? (
          <FirstServerMessage />
        ) : (
          <FirstChannelMessage channelInfo={channelInfo} />
        )}

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
                <MessageItem
                  message={message}
                  user={members[message.authorId]}
                  date={date}
                  extraTimeInfo={extraTimeInfo}
                  key={message.id}
                  sessionId={sessionUser.id}
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
              <MessageItem
                message={message}
                user={members[message.authorId]}
                date={date}
                extraTimeInfo={extraTimeInfo}
                key={message.id}
                sessionId={sessionUser.id}
              />
            );
          } else {
            previousTime = date;

            return (
              <SimpleMessageItem
                message={message}
                user={members[message.authorId]}
                date={date}
                extraTimeInfo={extraTimeInfo}
                key={message.id}
                sessionId={sessionUser.id}
              />
            );
          }
        })}
        <div className="message-list-spacer" />
      </div>
      <MessageInput channelInfo={channelInfo} />
    </div>
  );
};

export default MessageList;
