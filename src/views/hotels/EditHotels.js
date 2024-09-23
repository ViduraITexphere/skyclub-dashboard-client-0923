import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';

function EditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    name: '',
    country: '',
    city: '',
    description: '',
    image: '',
    rating: '',
    reviews: '',
    category: '',
    duration: '',
    hours: '',
    tags: '',
    activities: '',
    featured: false,
    verified: false,
    recommended: false,
  });
  console.log('hotel', hotel);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `https://skyclub-dashboard-server-0923.vercel.app/api/hotels/${id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setHotel(data);
          console.log('data:::', data);
        } else {
          console.error('Failed to fetch place details.');
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    fetchPlaceDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setHotel((prevPlace) => ({
      ...prevPlace,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotel((prevPlace) => ({
          ...prevPlace,
          image: reader.result.split(',')[1], // Remove data URL part
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://skyclub-dashboard-server-0923.vercel.app/api/hotels/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hotel),
        },
      );
      if (response.ok) {
        navigate(`/hotels`);
      } else {
        console.error('Failed to update place.');
      }
    } catch (error) {
      console.error('Error updating place:', error);
    }
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: '80%', margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Edit Place
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={hotel.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={hotel.country}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={hotel.city}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={hotel.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: '16px' }}
            />
            {hotel.image && (
              <img
                src={`data:image/jpeg;base64,${hotel.image}`}
                alt="Selected"
                style={{ width: '100px', height: 'auto', borderRadius: '8px' }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              value={hotel.rating}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Reviews"
              name="reviews"
              type="number"
              value={hotel.reviews}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="category"
              value={hotel.category}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration"
              name="duration"
              type="number"
              value={hotel.duration}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hours"
              name="hours"
              value={hotel.hours}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tags (comma separated)"
              name="tags"
              value={hotel.tags}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Activities (comma separated)"
              name="activities"
              value={hotel.activities}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={hotel.featured}
                onChange={handleChange}
              />
              Featured
            </label>
            <label>
              <input
                type="checkbox"
                name="verified"
                checked={hotel.verified}
                onChange={handleChange}
              />
              Verified
            </label>
            <label>
              <input
                type="checkbox"
                name="recommended"
                checked={hotel.recommended}
                onChange={handleChange}
              />
              Recommended
            </label>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'right', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/places`)}
            sx={{ ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default EditHotel;
