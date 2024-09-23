import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';

function EditPlace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState({
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPlace((prevPlace) => ({
      ...prevPlace,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlace((prevPlace) => ({
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
        `https://skyclub-dashboard-server-0923.vercel.app/api/places/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(place),
        },
      );
      if (response.ok) {
        navigate(`/places`);
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
              value={place.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={place.country}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={place.city}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={place.description}
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
            {place.image && (
              <img
                src={`data:image/jpeg;base64,${place.image}`}
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
              value={place.rating}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Reviews"
              name="reviews"
              type="number"
              value={place.reviews}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="category"
              value={place.category}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration"
              name="duration"
              type="number"
              value={place.duration}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hours"
              name="hours"
              value={place.hours}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tags (comma separated)"
              name="tags"
              value={place.tags}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Activities (comma separated)"
              name="activities"
              value={place.activities}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={place.featured}
                onChange={handleChange}
              />
              Featured
            </label>
            <label>
              <input
                type="checkbox"
                name="verified"
                checked={place.verified}
                onChange={handleChange}
              />
              Verified
            </label>
            <label>
              <input
                type="checkbox"
                name="recommended"
                checked={place.recommended}
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

export default EditPlace;
