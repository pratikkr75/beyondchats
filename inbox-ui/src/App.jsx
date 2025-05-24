import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, IconButton, Drawer, useScrollTrigger, Zoom, Fab } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Copilot from './components/Copilot';

// Scroll to top button component
function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    primary: { main: '#3B82F6' },
    text: { primary: '#1F2937', secondary: '#6B7280' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontSize: '1.25rem', fontWeight: 600 },
    h2: { fontSize: '1.125rem', fontWeight: 600 },
    h3: { fontSize: '1rem', fontWeight: 600 },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.75rem', color: '#6B7280' },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'inherit',
          border: 'none',
        }
      }
    }
  },
});

// Constants for sidebar widths
const SIDEBAR_WIDTH = {
  xs: '85%',  // Nearly full width on very small screens
  sm: '320px', // Fixed width on small-medium screens
  md: '280px', // Slightly smaller on medium screens
  default: '280px', // Default size
};

const COPILOT_WIDTH = {
  xs: '85%',
  sm: '320px',
  md: '280px',
  default: '280px',
};

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Initialize panel states based on screen size
  const [showSidebar, setShowSidebar] = useState(!isTablet);
  const [showCopilot, setShowCopilot] = useState(!isTablet);
  
  // Update panel visibility when screen size changes
  useEffect(() => {
    // On mobile, always close both panels initially
    if (isMobile) {
      setShowSidebar(false);
      setShowCopilot(false);
    } else if (isTablet) {
      // On tablet, maybe show one panel but not both
      if (showSidebar && showCopilot) {
        setShowCopilot(false);
      }
    }
  }, [isMobile, isTablet]);
  
  // Calculate current sidebar width based on breakpoints
  const getSidebarWidth = () => {
    if (isMobile) return SIDEBAR_WIDTH.xs;
    if (isTablet) return SIDEBAR_WIDTH.sm;
    return SIDEBAR_WIDTH.default;
  };
  
  // Calculate current copilot width based on breakpoints
  const getCopilotWidth = () => {
    if (isMobile) return COPILOT_WIDTH.xs;
    if (isTablet) return COPILOT_WIDTH.sm;
    return COPILOT_WIDTH.default;
  };

  const sidebarWidth = getSidebarWidth();
  const copilotWidth = getCopilotWidth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        component="div"
        id="back-to-top-anchor" 
        sx={{ 
          display: 'flex', 
          height: '100vh', 
          width: '100vw',
          overflow: 'hidden', 
          bgcolor: 'background.default',
          position: 'relative'
        }}
      >
        {/* SIDEBAR - Mobile: Drawer, Desktop: Static Panel */}
        {isTablet ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={showSidebar}
            onClose={() => setShowSidebar(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: sidebarWidth,
                borderRight: '1px solid #E5E7EB',
                boxSizing: 'border-box',
              },
              zIndex: theme.zIndex.appBar + 1,
            }}
          >
            <Sidebar />
          </Drawer>
        ) : (
          <Box
            component="aside"
            sx={{
              width: showSidebar ? sidebarWidth : 0,
              flexShrink: 0,
              height: '100%',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              bgcolor: 'background.paper',
              borderRight: showSidebar ? '1px solid #E5E7EB' : 'none',
              overflow: 'hidden',
              display: showSidebar ? 'block' : 'none',
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Toggle button for sidebar */}
        <IconButton
          onClick={() => setShowSidebar(s => !s)}
          sx={{
            position: 'absolute',
            top: 70, // Move down on all screens to avoid overlapping content
            left: isTablet ? 16 : (showSidebar ? `calc(${sidebarWidth} - 20px)` : 16),
            zIndex: theme.zIndex.appBar + 2,
            bgcolor: 'background.paper',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            opacity: 0.7, // Reduced opacity on all screens
            transition: theme.transitions.create(['left', 'opacity'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            '&:hover': { 
              bgcolor: 'background.paper',
              opacity: 1, // Full opacity on hover
            },
          }}
          size="small"
          aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
        >
          {showSidebar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        {/* CHAT AREA - Flexible width */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100%',
            bgcolor: '#F9FAFB',
            display: 'flex',
            flexDirection: 'column',
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflow: 'auto',
          }}
        >
          <ChatArea />
        </Box>

        {/* COPILOT - Mobile: Drawer, Desktop: Static Panel */}
        {isTablet ? (
          <Drawer
            variant="temporary"
            anchor="right"
            open={showCopilot}
            onClose={() => setShowCopilot(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: copilotWidth,
                borderLeft: '1px solid #E5E7EB',
                boxSizing: 'border-box',
                background: 'linear-gradient(to bottom, #EFF6FF, #FFFFFF)',
              },
              zIndex: theme.zIndex.appBar + 1,
            }}
          >
            <Copilot />
          </Drawer>
        ) : (
          <Box
            component="aside"
            sx={{
              width: showCopilot ? copilotWidth : 0,
              flexShrink: 0,
              height: '100%',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              background: 'linear-gradient(to bottom, #EFF6FF, #FFFFFF)',
              borderLeft: showCopilot ? '1px solid #E5E7EB' : 'none',
              overflow: 'hidden',
              display: showCopilot ? 'block' : 'none',
            }}
          >
            <Copilot />
          </Box>
        )}

        {/* Toggle button for copilot */}
        <IconButton
          onClick={() => setShowCopilot(s => !s)}
          sx={{
            position: 'absolute',
            top: 70, // Move down on all screens to avoid overlapping content
            right: isTablet ? 16 : (showCopilot ? `calc(${copilotWidth} - 20px)` : 16),
            zIndex: theme.zIndex.appBar + 2,
            bgcolor: 'background.paper',
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            opacity: 0.7, // Reduced opacity on all screens
            transition: theme.transitions.create(['right', 'opacity'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            '&:hover': { 
              bgcolor: 'background.paper',
              opacity: 1, // Full opacity on hover
            },
          }}
          size="small"
          aria-label={showCopilot ? "Hide copilot" : "Show copilot"}
        >
          {showCopilot ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>

        {/* Scroll-to-top button */}
        <ScrollTop>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </ThemeProvider>
  );
}