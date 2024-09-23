// src/pages/NotificationPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const NotificationPage = () => {
  const [revisedQuotes, setRevisedQuotes] = useState([]);
  console.log('revisedQuotes:', revisedQuotes);

  useEffect(() => {
    const fetchRevisedQuotes = async () => {
      try {
        const googleId = localStorage.getItem('googleId');
        if (googleId) {
          const response = await axios.post(
            'https://skyclub-server-new.vercel.app/api/itinerary/getAllQuotes',
            { googleId },
          );
          const revised = response.data.filter((quote) => quote.revision);
          setRevisedQuotes(revised);
        }
      } catch (error) {
        console.error('Error fetching revised quotes:', error);
      }
    };

    fetchRevisedQuotes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Revised Quotes
      </Typography>
      {revisedQuotes.length > 0 ? (
        <List>
          {revisedQuotes.map((quote, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Quote ID: ${quote._id}`}
                secondary={`Details: ${quote.revision}`} // Adjust as needed to fit your data structure
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No revised quotes available.</Typography>
      )}
    </Container>
  );
};

export default NotificationPage;
