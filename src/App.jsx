// client/src/App.jsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

const API_URL = "http://localhost:5000/api/prompt";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! As your Premium Prompt Refinement Specialist, I'm ready to begin. Please share the prompt you'd like to refine, or describe the goal you wish to achieve.",
      },
    ]);
  }, []);

  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const newUserMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, {
        messages: updatedMessages,
      });

      const assistantMessage = response.data;
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = {
        role: "assistant",
        content:
          "I'm sorry, but I seem to be having trouble connecting. Please ensure the server is running and try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <header>
        <h1>✨ Premium Prompt Specialist</h1>
      </header>
      <div className="message-list">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
          <ChatMessage
            message={{ role: "assistant", content: "" }}
            isLoading={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
