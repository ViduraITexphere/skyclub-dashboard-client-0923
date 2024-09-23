import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Grid, Button } from '@mui/material';

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `https://skyclub-dashboard-server-0923.vercel.app/api/hotels/${id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setHotel(data);
        } else {
          console.error('Failed to fetch place details.');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlaceDetails();
  }, [id]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ padding: 3, maxWidth: '80%', margin: 'auto', mt: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        {hotel.name}
      </Typography>
      <Grid container spacing={2}>
        {/* Image Section */}
        <Grid item xs={12}>
          <img
            src={`data:image/jpeg;base64,${hotel.image}`}
            alt={hotel.name}
            style={{ width: '60px', height: '60px', borderRadius: '100%' }}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* Details Table */}
          {[
            { label: 'Description', value: hotel.description },
            { label: 'Country', value: hotel.country },
            { label: 'City', value: hotel.city },
            { label: 'Rating', value: hotel.rating },
            { label: 'Reviews', value: hotel.reviews },
            { label: 'Category', value: hotel.category },
            { label: 'Duration', value: `${hotel.duration} hours` },
            { label: 'Hours', value: hotel.hours },
            { label: 'Tags', value: hotel.tags.join(', ') },
            { label: 'Activities', value: hotel.activities.join(', ') },
            { label: 'Featured', value: hotel.featured ? 'Yes' : 'No' },
            { label: 'Verified', value: hotel.verified ? 'Yes' : 'No' },
            { label: 'Recommended', value: hotel.recommended ? 'Yes' : 'No' },
          ].map((item) => (
            <Grid container item key={item.label}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography>{item.value}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'right', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          Back
        </Button>
      </Box>
    </Paper>
  );
}

export default HotelDetails;
