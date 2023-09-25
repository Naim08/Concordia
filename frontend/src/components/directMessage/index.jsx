import React, { useState, useEffect } from "react";
import {
  fetchConversations,
  createConversation,
  deleteConversation,
} from "../../store/conversation";

const ConversationsTester = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Load all conversations on component mount
    const loadConversations = async () => {
      const result = await fetchConversations();
      setConversations(result.conversations);
    };

    loadConversations();
  }, []);

  const handleCreate = async () => {
    const newConversation = await createConversation();
    if (newConversation) {
      setConversations([...conversations, newConversation]);
    }
  };

  const handleDelete = async (id) => {
    const isSuccess = await deleteConversation(id);
    if (isSuccess) {
      setConversations(conversations.filter((convo) => convo.id !== id));
    }
  };

  return (
    <div>
      <h2>Conversations</h2>
      <button onClick={handleCreate}>Create New Conversation</button>
      <ul>
        {conversations &&
          conversations.map((convo) => (
            <li key={convo.id}>
              {convo.title || "Untitled Conversation"}
              <button onClick={() => handleDelete(convo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ConversationsTester;
