import { useState, useCallback } from 'react';
import aiService from '../services/aiService';

// Custom hook for managing chat functionality
export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add a new message to the conversation
  const addMessage = useCallback((message, isUser = true) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      content: message,
      isUser,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Send message to AI and get response
  const sendMessage = useCallback(async (message) => {
    if (!message.trim()) return;

    setError(null);
    setIsLoading(true);

    // Add user message
    addMessage(message, true);

    try {
      // Convert messages to format expected by AI service
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      }));

      // Get AI response
      const response = await aiService.sendMessage(message, conversationHistory);
      
      if (response.success) {
        // Add AI response
        addMessage(response.message, false);
      } else {
        setError(response.error || 'Failed to get response');
        addMessage(response.message, false);
      }
    } catch (err) {
      const errorMessage = 'Sorry, I encountered an error. Please try again.';
      setError(err.message);
      addMessage(errorMessage, false);
    } finally {
      setIsLoading(false);
    }
  }, [messages, addMessage]);

  // Handle suggestion clicks
  const handleSuggestion = useCallback(async (suggestionType, conversationContext) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await aiService.handleSuggestion(suggestionType, conversationContext);
      
      if (response.success) {
        // Add suggestion response
        addMessage(response.message, false);
      } else {
        setError(response.error || 'Failed to process suggestion');
        addMessage(response.message, false);
      }
    } catch (err) {
      const errorMessage = 'Sorry, I encountered an error processing your request.';
      setError(err.message);
      addMessage(errorMessage, false);
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  // Clear conversation
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    handleSuggestion,
    clearMessages
  };
};