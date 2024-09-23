import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Tabs,
  Tab,
  AppBar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Quotes.css';

const fetchQuotes = async (googleId, tab, setQuotes) => {
  try {
    const endpoint = tab === 'notCostAdded' ? '/api/quotes' : '/api/quotes/revised';
    const response = await fetch(`https://skyclub-dashboard-server-0923.vercel.app${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleId }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched Quotes Data:', data);
      setQuotes(data);
    } else {
      console.error('Failed to fetch quotes.');
    }
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState('notCostAdded');
  const navigate = useNavigate();

  useEffect(() => {
    const googleId = localStorage.getItem('googleId');
    console.log('Google Id:', googleId);

    if (googleId) {
      fetchQuotes(googleId, activeTab, setQuotes);
    } else {
      console.log('No Google ID found in local storage.');
    }
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewDetails = (quoteId) => {
    navigate(`/quote/${quoteId}`);
  };

  const handleDelete = async (quoteId) => {
    try {
      const response = await fetch(
        `https://skyclub-dashboard-server-0923.vercel.app/api/quotes/${quoteId}`,
        {
          method: 'DELETE',
        },
      );
      if (response.ok) {
        const googleId = localStorage.getItem('googleId');
        if (googleId) {
          fetchQuotes(googleId, activeTab, setQuotes);
        }
      } else {
        console.error('Failed to delete quote.');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <AppBar position="static" style={{ marginBottom: '16px' }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="quote tabs" className="tabs">
          <Tab label="Not Cost Added Quotes" value="notCostAdded" style={{ color: 'white' }} />
          <Tab label="Revised Quotes" value="revised" style={{ color: 'white' }} />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes.map((quote) => (
              <TableRow key={quote._id}>
                <TableCell>{quote.userDetails.name}</TableCell>
                <TableCell>{quote.userDetails.email}</TableCell>
                <TableCell>{quote.userDetails.country}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(quote._id)}
                    style={{ marginRight: '8px' }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(quote._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Quotes;
