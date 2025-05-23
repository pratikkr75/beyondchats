// AI Service for handling chat interactions
class AIService {
    constructor() {
      // Vite uses import.meta.env instead of process.env
      this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
      this.baseURL = 'https://api.openai.com/v1/chat/completions';
      
      // You can easily switch to other AI services by changing these:
      // For Anthropic Claude: https://api.anthropic.com/v1/messages
      // For Google Gemini: https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
      // For local/custom API: your endpoint here
    }
  
    // OpenAI GPT implementation
    async sendMessageToOpenAI(message, conversationHistory = []) {
      try {
        const messages = [
          {
            role: 'system',
            content: 'You are Fin, an AI copilot assistant. Help users with their questions about conversations and provide helpful suggestions.'
          },
          ...conversationHistory,
          {
            role: 'user',
            content: message
          }
        ];
  
        const response = await fetch(this.baseURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 500,
            temperature: 0.7
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return {
          success: true,
          message: data.choices[0].message.content,
          usage: data.usage
        };
      } catch (error) {
        console.error('OpenAI API Error:', error);
        return {
          success: false,
          error: error.message,
          message: 'Sorry, I encountered an error. Please try again.'
        };
      }
    }
  
    // Anthropic Claude implementation (alternative)
    async sendMessageToClaude(message, conversationHistory = []) {
      try {
        const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY || '';
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 500,
            messages: [
              ...conversationHistory,
              {
                role: 'user',
                content: message
              }
            ]
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        return {
          success: true,
          message: data.content[0].text,
          usage: data.usage
        };
      } catch (error) {
        console.error('Claude API Error:', error);
        return {
          success: false,
          error: error.message,
          message: 'Sorry, I encountered an error. Please try again.'
        };
      }
    }
  
    // Main method - you can switch AI providers here
    async sendMessage(message, conversationHistory = []) {
      // Default to OpenAI, but you can easily switch to Claude or other services
      const aiProvider = import.meta.env.VITE_AI_PROVIDER || 'openai';
      
      switch (aiProvider) {
        case 'claude':
          return await this.sendMessageToClaude(message, conversationHistory);
        case 'openai':
        default:
          return await this.sendMessageToOpenAI(message, conversationHistory);
      }
    }
  
    // Method for handling suggestion clicks
    async handleSuggestion(suggestionType, conversationContext = '') {
      let prompt = '';
      
      switch (suggestionType) {
        case 'tag':
          prompt = `Based on this conversation context: "${conversationContext}", suggest 3-5 relevant tags that would help organize this conversation. Return only the tags separated by commas.`;
          break;
        case 'invoice':
          prompt = `Based on this conversation context: "${conversationContext}", help me create an invoice. What information do you need to generate a proper invoice?`;
          break;
        case 'summarize':
          prompt = `Please provide a concise summary of this conversation: "${conversationContext}". Include key points, decisions made, and any action items.`;
          break;
        default:
          prompt = message;
      }
  
      return await this.sendMessage(prompt);
    }
  }
  
  export default new AIService();