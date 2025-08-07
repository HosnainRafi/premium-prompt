// client/src/components/ChatInput.jsx

import { useState } from "react";

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Describe your goal or paste your prompt..."
        rows="3"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;
