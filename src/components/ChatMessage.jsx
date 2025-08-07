// client/src/components/ChatMessage.jsx

import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ message, isLoading }) => {
  const { role, content } = message;
  const messageClass = `message ${role}`; // 'message user' or 'message assistant'

  // A simple markdown-like renderer for newlines
  const formatContent = (text) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  if (isLoading) {
    return (
      <div className="message assistant">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className={messageClass}>
      <div className="message-content">{formatContent(content)}</div>
    </div>
  );
};

export default ChatMessage;
