import { useState, useMemo } from 'react';

// Sample conversation data with status and read properties
const conversationsData = [
  {
    id: 1,
    sender: 'Luis',
    company: 'Github',
    message: 'Hey! I have a questio...',
    time: '45m',
    avatar: 'L',
    color: 'primary.light',
    status: 'open',
    isRead: true,
    timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  },
  {
    id: 2,
    sender: 'Ivan',
    company: 'Nike',
    message: 'Hi there, I have a qu...',
    time: '30m',
    hasAlert: true,
    alertText: '3min',
    avatar: 'I',
    color: 'error.main',
    status: 'open',
    isRead: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    id: 3,
    sender: 'Lead from New York',
    message: 'Good morning, let me...',
    time: '45m',
    avatar: 'L',
    color: 'primary.light',
    hasNewMessage: true,
    status: 'open',
    isRead: false,
    timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  },
  {
    id: 4,
    sender: 'Booking API problems',
    message: 'Bug report',
    subtext: 'Luis - Small Crafts',
    time: '45m',
    avatar: 'icon',
    color: 'grey.700',
    status: 'closed',
    isRead: true,
    timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  },
  {
    id: 5,
    sender: 'Miracle',
    company: 'Exemplary Bank',
    message: 'Hey there, I\'m here to...',
    time: '45m',
    avatar: 'M',
    color: 'secondary.main',
    status: 'open',
    isRead: true,
    timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  }
];

export const useSidebar = () => {
  const [statusFilter, setStatusFilter] = useState('open');
  const [sortBy, setSortBy] = useState('waiting');

  // Filter conversations based on status
  const filteredConversations = useMemo(() => {
    if (statusFilter === 'all') {
      return conversationsData;
    }
    return conversationsData.filter(conv => conv.status === statusFilter);
  }, [statusFilter]);

  // Sort conversations based on selected criteria
  const sortedConversations = useMemo(() => {
    const sorted = [...filteredConversations];
    
    switch (sortBy) {
      case 'waiting':
        // Sort by oldest first (waiting longest)
        return sorted.sort((a, b) => a.timestamp - b.timestamp);
      
      case 'recent':
        // Sort by newest first (most recent)
        return sorted.sort((a, b) => b.timestamp - a.timestamp);
      
      case 'unread':
        // Sort unread first, then by timestamp
        return sorted.sort((a, b) => {
          if (a.isRead === b.isRead) {
            return b.timestamp - a.timestamp;
          }
          return a.isRead - b.isRead;
        });
      
      default:
        return sorted;
    }
  }, [filteredConversations, sortBy]);

  // Get count based on current filter
  const getCount = () => {
    return filteredConversations.length;
  };

  return {
    conversations: sortedConversations,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    count: getCount()
  };
};