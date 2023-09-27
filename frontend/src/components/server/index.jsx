import "./ServerPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DirectMessageDisplay from "../directMessage/DirectMessageDisplay";

import {
  addChannel,
  fetchChannels,
  removeChannel,
  resetChannels,
} from "../../store/channel";
import {
  addMember,
  fetchMembers,
  removeMember,
  resetMembers,
} from "../../store/member";

import {
  getHomeRedirect,
  setDeletedChannelId,
  setScroll,
  setSelectedServer,
} from "../../store/ui";
import {
  addMessage,
  fetchMessages,
  removeMessage,
  removeUserMessages,
  resetMessages,
} from "../../store/message";
import {
  receiveDirectMessage,
  createDirectMessage,
  deleteDirectMessage,
  fetchDirectMessages,
  updateDirectMessage,
} from "../../store/directMessage";
import { getCurrentUser } from "../../store/session";
import MainSideBar from "../mainSideBar";
import MessageDisplay from "../message";
import consumer from "../../consumer";

const ServerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector(getCurrentUser);
  const homeRedirect = useSelector(getHomeRedirect);
  const { serverId, channelId, conversationId } = useParams();

  useEffect(() => {
    if (homeRedirect) navigate(`/home`);
  }, [homeRedirect]);

  useEffect(() => {
    if (sessionUser) {
      dispatch(setSelectedServer(serverId));
      dispatch(fetchChannels(serverId));
      dispatch(fetchMembers(serverId));
    }

    const subscription = consumer.subscriptions.create(
      { channel: "ServersChannel", id: serverId },
      {
        received: ({ type, member, channel, id }) => {
          switch (type) {
            case "UPDATE_MEMBER":
              dispatch(addMember(member));
              break;
            case "DELETE_MEMBER":
              dispatch(removeMember(id));
              dispatch(removeUserMessages(id));
              break;
            case "ADD_MEMBER":
              dispatch(addMember(member));
              break;
            case "ADD_CHANNEL":
              dispatch(addChannel(channel));
              break;
            case "DELETE_CHANNEL":
              dispatch(removeChannel(id));
              dispatch(setDeletedChannelId(id));
              break;
            case "UPDATE_CHANNEL":
              dispatch(addChannel(channel));
              break;
            default:
            // console.log("unknown broadcast type");
          }
        },
      }
    );

    return () => {
      subscription?.unsubscribe();
      dispatch(resetChannels());
      dispatch(resetMembers());
    };
  }, [dispatch, serverId]);

  useEffect(() => {
    if (channelId && sessionUser) {
      dispatch(fetchMessages(channelId));
    }

    const subscription = consumer.subscriptions.create(
      { channel: "MessagesChannel", id: channelId },
      {
        received: ({ type, message, id }) => {
          switch (type) {
            case "RECEIVE_MESSAGE":
              const listEle = document.querySelector(".messages-list");
              const atBottom =
                listEle &&
                Math.round(listEle.scrollHeight - listEle.scrollTop) <=
                  listEle.clientHeight;

              dispatch(addMessage(message));

              if (message.authorId === sessionUser.id || atBottom)
                dispatch(setScroll(true));
              break;
            case "DESTROY_MESSAGE":
              dispatch(removeMessage(id));
              break;
            case "UPDATE_MESSAGE":
              dispatch(addMessage(message));
              break;
            default:
            // console.log("unknown broadcast type");
          }
        },
      }
    );

    return () => {
      subscription?.unsubscribe();
      dispatch(resetMessages());
      dispatch(setScroll(true));
    };
  }, [dispatch, channelId]);

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: "ConversationsChannel", id: conversationId },
      {
        received: ({ type, message, id, direct_message }) => {
          switch (type) {
            case "NEW_DIRECT_MESSAGE":
              const listEle = document.querySelector(".messages-list");
              const atBottom =
                listEle &&
                Math.round(listEle.scrollHeight - listEle.scrollTop) <=
                  listEle.clientHeight;
              console.log(message);
              dispatch(receiveDirectMessage(message));

              if (message.author.id === sessionUser.id || atBottom)
                dispatch(setScroll(true));
              break;
            case "DESTROY_MESSAGE":
              dispatch(deleteDirectMessage(id));
              break;
            case "UPDATE_MESSAGE":
              dispatch(updateDirectMessage(message));
              break;
            default:
            // console.log("unknown broadcast type");
          }
        },
      }
    );

    return () => {
      subscription?.unsubscribe();
      dispatch(resetMessages());
      dispatch(setScroll(true));
    };
  }, [dispatch, conversationId]);

  return (
    <div className="server-page">
      <MainSideBar />
      {channelId ? <MessageDisplay /> : null}
      {conversationId ? <DirectMessageDisplay /> : null}
    </div>
  );
};

export default ServerPage;
