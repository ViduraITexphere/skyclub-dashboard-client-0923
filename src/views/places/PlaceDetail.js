import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Grid, Button } from '@mui/material';

function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `https://skyclub-dashboard-server-0923.vercel.app/api/places/${id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setPlace(data);
        } else {
          console.error('Failed to fetch place details.');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlaceDetails();
  }, [id]);

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ padding: 3, maxWidth: '80%', margin: 'auto', mt: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        {place.name}
      </Typography>
      <Grid container spacing={2}>
        {/* Image Section */}
        <Grid item xs={12}>
          <img
            src={`data:image/jpeg;base64,${place.image}`}
            alt={place.name}
            style={{ width: '60px', height: '60px', borderRadius: '100%' }}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {/* Details Table */}
          {[
            { label: 'Description', value: place.description },
            { label: 'Country', value: place.country },
            { label: 'City', value: place.city },
            { label: 'Rating', value: place.rating },
            { label: 'Reviews', value: place.reviews },
            { label: 'Category', value: place.category },
            { label: 'Duration', value: `${place.duration} hours` },
            { label: 'Hours', value: place.hours },
            { label: 'Tags', value: place.tags.join(', ') },
            { label: 'Activities', value: place.activities.join(', ') },
            { label: 'Featured', value: place.featured ? 'Yes' : 'No' },
            { label: 'Verified', value: place.verified ? 'Yes' : 'No' },
            { label: 'Recommended', value: place.recommended ? 'Yes' : 'No' },
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

export default PlaceDetails;
