// src/hooks/useConversation.js
import { useState } from 'react';
import { getResponse } from '../services/conversationService';

export const useConversation = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay (realistic chat experience)
    setTimeout(() => {
      const response = getResponse(messageText);
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const clearMessages = () => {
    setMessages([]);
    setIsTyping(false);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages
  };
};