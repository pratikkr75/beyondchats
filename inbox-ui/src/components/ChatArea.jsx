import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton,
  Avatar,
  CircularProgress
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useConversation } from '../hooks/useConversation';

function ChatArea() {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, isTyping, sendMessage } = useConversation();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid #e5e7eb',
          bgcolor: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography 
          sx={{ 
            fontSize: '18px',
            fontWeight: 600,
            color: '#111827',
            letterSpacing: '-0.025em'
          }}
        >
          Luis Easton
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            size="small" 
            sx={{ 
              color: '#6b7280',
              '&:hover': { bgcolor: '#f3f4f6' }
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Button 
            variant="contained"
            size="small"
            startIcon={<CloseIcon sx={{ fontSize: '16px !important' }} />}
            sx={{
              bgcolor: '#374151',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '13px',
              px: 2,
              py: 0.5,
              borderRadius: '6px',
              '&:hover': {
                bgcolor: '#1f2937',
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Box>

      {/* Message Area */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto',
          bgcolor: '#f9fafb',
          px: 3,
          py: 2,
        }}
      >
        {messages.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#6b7280'
          }}>
            <Typography variant="body2">
              Start a conversation by typing a message below...
            </Typography>
          </Box>
        )}

        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 1,
                maxWidth: '70%',
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: message.sender === 'user' ? '#3b82f6' : '#6b7280',
                  fontSize: '14px',
                }}
              >
                {message.sender === 'user' ? 'L' : 'M'}
              </Avatar>
              <Box>
                <Box
                  sx={{
                    bgcolor: message.sender === 'user' ? '#3b82f6' : '#ffffff',
                    color: message.sender === 'user' ? '#ffffff' : '#111827',
                    px: 3,
                    py: 2,
                    borderRadius: message.sender === 'user' 
                      ? '18px 18px 4px 18px' 
                      : '18px 18px 18px 4px',
                    border: message.sender === 'bot' ? '1px solid #e5e7eb' : 'none',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Typography 
                    sx={{ 
                      fontSize: '14px',
                      lineHeight: 1.5,
                      wordBreak: 'break-word'
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
                <Typography 
                  sx={{ 
                    fontSize: '11px', 
                    color: '#6b7280', 
                    mt: 0.5,
                    textAlign: message.sender === 'user' ? 'right' : 'left'
                  }}
                >
                  {formatTime(message.timestamp)}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}

        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mb: 2 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#6b7280', fontSize: '14px' }}>
              M
            </Avatar>
            <Box
              sx={{
                bgcolor: '#ffffff',
                px: 3,
                py: 2,
                borderRadius: '18px 18px 18px 4px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              }}
            >
              <CircularProgress size={16} sx={{ color: '#6b7280' }} />
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box 
        sx={{ 
          p: 3, 
          borderTop: '1px solid #e5e7eb', 
          bgcolor: '#ffffff' 
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
          <TextField
            placeholder="Chat..."
            variant="outlined"
            size="small"
            fullWidth
            multiline
            maxRows={3}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                bgcolor: '#f9fafb',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#9ca3af',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
              '& .MuiInputBase-input': {
                fontSize: '14px',
                lineHeight: 1.5,
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#9ca3af',
                opacity: 1,
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            sx={{
              bgcolor: '#3b82f6',
              minWidth: '60px',
              height: '40px',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              '&:hover': {
                bgcolor: '#2563eb',
              },
              '&:disabled': {
                bgcolor: '#d1d5db',
                color: '#9ca3af',
              },
            }}
          >
            <SendIcon fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatArea;