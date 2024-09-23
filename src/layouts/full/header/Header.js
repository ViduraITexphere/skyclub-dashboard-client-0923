import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge } from '@mui/material';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = (props) => {
  const [hasRevisedQuotes, setHasRevisedQuotes] = useState(false);
  const [notificationVisited, setNotificationVisited] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRevisedStatus = async () => {
      try {
        const googleId = localStorage.getItem('googleId');
        if (googleId) {
          const response = await axios.post(
            'https://skyclub-server-new.vercel.app/api/itinerary/getAllQuotes',
            { googleId },
          );
          const revisedQuote = response.data.some((quote) => quote.revision);
          setHasRevisedQuotes(revisedQuote);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchRevisedStatus();
  }, []);

  useEffect(() => {
    // Check if the notification page has been visited
    const visited = localStorage.getItem('notificationVisited') === 'true';
    setNotificationVisited(visited);
  }, []);

  useEffect(() => {
    if (location.pathname === '/notifications') {
      setNotificationVisited(true);
      localStorage.setItem('notificationVisited', 'true'); // Mark as visited
    }
  }, [location.pathname]);

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          onClick={handleNotificationClick}
          sx={{
            ...(hasRevisedQuotes &&
              !notificationVisited && {
                color: 'primary.main', // Change color if there are revised quotes and the page hasn't been visited
              }),
          }}
        >
          <Badge variant="dot" color={hasRevisedQuotes ? 'primary' : 'default'}>
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
