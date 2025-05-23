import { Box, Typography, Chip, List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, MenuItem, Select, FormControl, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useSidebar } from '../hooks/useSidebar';

// Styled components
const AlertChip = styled(Chip)(({ theme }) => ({
  borderRadius: '12px',
  backgroundColor: '#FFD700',
  color: 'black',
  fontSize: '10px',
  height: '20px',
  '& .MuiChip-label': {
    padding: '0 8px'
  }
}));

const NewMessageIndicator = styled(Box)(({ theme }) => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: 'black',
  marginRight: '8px'
}));

function Sidebar() {
  const { 
    conversations, 
    statusFilter, 
    setStatusFilter, 
    sortBy, 
    setSortBy, 
    count 
  } = useSidebar();

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const getSortLabel = (value) => {
    switch (value) {
      case 'waiting':
        return 'Waiting longest';
      case 'recent':
        return 'Most recent';
      case 'unread':
        return 'Unread first';
      default:
        return 'Waiting longest';
    }
  };

  const getStatusLabel = (value) => {
    switch (value) {
      case 'open':
        return 'Open';
      case 'closed':
        return 'Closed';
      case 'all':
        return 'All';
      default:
        return 'Open';
    }
  };

  return (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        // Ensure consistent font sizes
        '& h1, & .MuiTypography-h1': { 
          fontSize: '2.125rem', 
          fontWeight: 700,
          lineHeight: 1.2,
          mb: 1
        },
        '& .MuiTypography-body1': { fontSize: '0.875rem' },
        '& .MuiTypography-body2': { fontSize: '0.75rem', color: 'text.secondary' },
      }}
    >
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <Typography variant="h1">Your inbox</Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant="standard" sx={{ minWidth: 80 }}>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                disableUnderline
                sx={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                <MenuItem value="open">Open ({conversations.filter(c => c.status === 'open').length})</MenuItem>
                <MenuItem value="closed">Closed ({conversations.filter(c => c.status === 'closed').length})</MenuItem>
                <MenuItem value="all">All ({count})</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <FormControl variant="standard" sx={{ minWidth: 140 }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              disableUnderline
              sx={{ fontSize: '0.75rem', color: 'text.secondary' }}
            >
              <MenuItem value="waiting">Waiting longest</MenuItem>
              <MenuItem value="recent">Most recent</MenuItem>
              <MenuItem value="unread">Unread first</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      <Divider />
      
      <List sx={{ width: '100%', bgcolor: 'background.paper', flexGrow: 1, overflow: 'auto', p: 0 }}>
        {conversations.map((conversation) => (
          <ListItem
            key={conversation.id}
            alignItems="flex-start"
            sx={{ 
              py: 1.5,
              px: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:hover': { bgcolor: 'action.hover' },
              cursor: 'pointer'
            }}
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {conversation.hasAlert && <AlertChip label={conversation.alertText} />}
                <Typography variant="body2" color="text.secondary">
                  {conversation.time}
                </Typography>
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: conversation.color }}>
                {conversation.avatar === 'icon' ? (
                  <ViewListIcon fontSize="small" />
                ) : (
                  conversation.avatar
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {conversation.hasNewMessage && <NewMessageIndicator />}
                  <Typography 
                    component="span" 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 500,
                      display: 'inline',
                      pr: 0.5
                    }}
                  >
                    {conversation.sender}
                  </Typography>
                  {conversation.company && (
                    <Typography 
                      component="span" 
                      variant="body2" 
                      sx={{ color: 'text.secondary' }}
                    >
                      - {conversation.company}
                    </Typography>
                  )}
                </Box>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    {conversation.message}
                  </Typography>
                  {conversation.subtext && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      display="block"
                    >
                      {conversation.subtext}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ 
        p: 1, 
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        borderTop: '1px solid', 
        borderColor: 'divider',
        gap: 0.5
      }}>
        <IconButton aria-label="list view" size="small">
          <ViewListIcon />
        </IconButton>
        <IconButton aria-label="grid view" size="small">
          <ViewModuleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Sidebar;