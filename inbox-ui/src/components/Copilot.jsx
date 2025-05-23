import { useState } from 'react';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    Button, 
    Divider,
    Avatar,
    IconButton,
    InputBase,
    Paper,
    CircularProgress
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import CloseIcon from '@mui/icons-material/Close';
  import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
  import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
  import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
  import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
  import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
  import { useChat } from '../hooks/useChat';
  
  // Sample suggestion data
  const suggestions = [
    {
      id: 1,
      type: 'tag',
      title: "Tag this conversation",
      description: "Add tags to organize your conversations",
      icon: <LocalOfferOutlinedIcon fontSize="small" sx={{ color: "#3086EB" }} />
    },
    {
      id: 2,
      type: 'invoice',
      title: "Create invoice",
      description: "Generate an invoice based on the conversation",
      icon: <AttachMoneyOutlinedIcon fontSize="small" sx={{ color: "#3086EB" }} />
    },
    {
      id: 3,
      type: 'summarize',
      title: "Summarize conversation",
      description: "Get a concise summary of this conversation",
      icon: <AssignmentOutlinedIcon fontSize="small" sx={{ color: "#3086EB" }} />
    }
  ];
  
  // Styled components
  const SuggestionCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(1.5),
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1.5),
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default
    }
  }));
  
  const GradientBackground = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #EFF6FF, #FFFFFF)',
    overflow: 'auto'
  }));
  
  const CopilotHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(3, 2, 2),
    position: 'relative'
  }));
  
  const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(0.5)
  }));

  const ChatMessage = styled(Box)(({ theme, isUser }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: isUser ? 'flex-end' : 'flex-start',
    marginBottom: theme.spacing(1),
    '& .message-bubble': {
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.spacing(2),
      maxWidth: '80%',
      backgroundColor: isUser ? '#3086EB' : '#f0f0f0',
      color: isUser ? 'white' : 'black',
      fontSize: '0.875rem',
      lineHeight: 1.4
    }
  }));

  const ChatContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    padding: theme.spacing(1, 2),
    maxHeight: '300px'
  }));
  
  function Copilot({ conversationContext = "" }) {
    const [inputValue, setInputValue] = useState('');
    const [showChat, setShowChat] = useState(false);
    const { messages, isLoading, error, sendMessage, handleSuggestion, clearMessages } = useChat();

    const handleInputSubmit = async () => {
      if (inputValue.trim() && !isLoading) {
        if (!showChat) setShowChat(true);
        await sendMessage(inputValue);
        setInputValue('');
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleInputSubmit();
      }
    };

    const handleSuggestionClick = async (suggestion) => {
      if (!showChat) setShowChat(true);
      await handleSuggestion(suggestion.type, conversationContext);
    };

    return (
      <GradientBackground
        sx={{
          position: 'relative',
          // Ensure consistent font sizing
          '& h3, & .MuiTypography-h3': { 
            fontSize: '1.25rem', 
            fontWeight: 600,
            lineHeight: 1.2
          },
          '& h4, & .MuiTypography-h4': { 
            fontSize: '1.125rem', 
            fontWeight: 600,
            lineHeight: 1.2
          },
          '& .MuiTypography-body1': { fontSize: '0.875rem' },
          '& .MuiTypography-body2': { fontSize: '0.75rem', color: 'text.secondary' },
        }}
      >
        <CopilotHeader>
          <CloseButton size="small" aria-label="close">
            <CloseIcon fontSize="small" />
          </CloseButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Avatar sx={{ bgcolor: '#3086EB', width: 28, height: 28 }}>
              <SmartToyOutlinedIcon fontSize="small" />
            </Avatar>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Hi, I'm Fin
            </Typography>
          </Box>
          
          <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700, color: 'text.primary' }}>
            AI Copilot
          </Typography>
          
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Ask me anything about this conversation.
          </Typography>
        </CopilotHeader>
        
        <Divider />
        
        <Box sx={{ p: 2, flexGrow: 1, pb: 8, display: 'flex', flexDirection: 'column' }}>
          {!showChat ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Suggestions
                </Typography>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
              
              {suggestions.map((suggestion) => (
                <SuggestionCard 
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <Box 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 36,
                          height: 36,
                          borderRadius: 1
                        }}
                      >
                        {suggestion.icon}
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.25, color: 'text.primary' }}>
                          {suggestion.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {suggestion.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </SuggestionCard>
              ))}
              
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth 
                startIcon={<StarOutlinedIcon sx={{ color: '#3086EB' }} />}
                sx={{ 
                  mt: 1, 
                  borderRadius: 1.5,
                  textTransform: 'none',
                  justifyContent: 'center',
                  py: 1.2,
                  color: '#3086EB',
                  borderColor: '#3086EB'
                }}
              >
                Share feedback
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Chat with Fin
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => {
                    setShowChat(false);
                    clearMessages();
                  }}
                  sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                >
                  Back to suggestions
                </Button>
              </Box>
              
              <ChatContainer>
                {messages.length === 0 && (
                  <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                    Start a conversation with Fin...
                  </Typography>
                )}
                
                {messages.map((message) => (
                  <ChatMessage key={message.id} isUser={message.isUser}>
                    <Box className="message-bubble">
                      {message.content}
                    </Box>
                  </ChatMessage>
                ))}
                
                {isLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <CircularProgress size={20} />
                  </Box>
                )}
                
                {error && (
                  <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', mt: 1 }}>
                    {error}
                  </Typography>
                )}
              </ChatContainer>
            </>
          )}
        </Box>
        
        {/* Chat input field at bottom */}
        <Paper
          elevation={0}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pl: 2,
            borderRadius: 8,
            bgcolor: '#F0F0F5', // Darker shade
            border: '1px solid #D0D0D8', // Visible border
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: '#EAEAF2', // Even darker on hover
              borderColor: '#B0B0C0', // Darker border on hover
            },
            '&:focus-within': { // When input is focused
              bgcolor: '#EAEAF2',
              borderColor: '#3086EB', // Primary color border when focused
              boxShadow: '0 0 0 2px rgba(48, 134, 235, 0.1)' // Subtle focus ring
            }
          }}
        >
          <InputBase
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            sx={{ 
              ml: 0.5, 
              flex: 1,
              fontSize: '0.875rem',
              color: '#333', // Darker text
              '&::placeholder': {
                color: '#666', // Darker placeholder
                opacity: 1
              },
              '&.Mui-disabled': {
                color: '#999'
              }
            }}
          />
          <IconButton 
            onClick={handleInputSubmit}
            disabled={!inputValue.trim() || isLoading}
            sx={{ 
              p: 1, 
              color: inputValue.trim() && !isLoading ? '#3086EB' : '#999',
              '&:hover': {
                color: inputValue.trim() && !isLoading ? '#2070D0' : '#999'
              },
              '&.Mui-disabled': {
                color: '#999'
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={16} />
            ) : (
              <ArrowUpwardIcon fontSize="small" />
            )}
          </IconButton>
        </Paper>
      </GradientBackground>
    );
  }
  
  export default Copilot;