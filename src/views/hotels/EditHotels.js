import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

function EditHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    name: '',
    country: '',
    city: '',
    shortTitle: '',
    description: '',
    price: '',
    image: '',
    gallery: [],
    startRating: '',
    category: '',
    numberOfGuests: '',
    bedrooms: '',
    beds: '',
    baths: '',
    tags: '',
    map: '',
    facilities: [],
    featured: false,
    verified: false,
    recommended: false,
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://skyclub-dashboard-server-0923.vercel.app/api/hotels/${id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setHotel(data);
        } else {
          console.error('Failed to fetch hotel details.');
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setHotel((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHotel((prev) => ({
          ...prev,
          image: reader.result.split(',')[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setHotel((prev) => ({
        ...prev,
        gallery: images,
      }));
    });
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
        console.error('Failed to update hotel.');
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: '80%', margin: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Edit Hotel
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
              label="Short Title"
              name="shortTitle"
              value={hotel.shortTitle}
              onChange={handleChange}
              fullWidth
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
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={hotel.price}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Rating"
              name="startRating"
              type="number"
              value={hotel.startRating}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Guests"
              name="numberOfGuests"
              type="number"
              value={hotel.numberOfGuests}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={hotel.bedrooms}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Beds"
              name="beds"
              type="number"
              value={hotel.beds}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Baths"
              name="baths"
              type="number"
              value={hotel.baths}
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
              label="Map URL/Coordinates"
              name="map"
              value={hotel.map}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Facilities (comma separated)"
              name="facilities"
              value={hotel.facilities.join(',')}
              onChange={(e) =>
                setHotel((prev) => ({
                  ...prev,
                  facilities: e.target.value.split(','),
                }))
              }
              fullWidth
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
          <Grid item xs={12}>
            <input type="file" accept="image/*" multiple onChange={handleGalleryChange} />
            {hotel.gallery.length > 0 &&
              hotel.gallery.map((img, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${img}`}
                  alt={`Gallery ${index + 1}`}
                  style={{ width: '100px', height: 'auto', margin: '5px' }}
                />
              ))}
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox name="featured" checked={hotel.featured} onChange={handleChange} />
              }
              label="Featured"
            />
            <FormControlLabel
              control={
                <Checkbox name="verified" checked={hotel.verified} onChange={handleChange} />
              }
              label="Verified"
            />
            <FormControlLabel
              control={
                <Checkbox name="recommended" checked={hotel.recommended} onChange={handleChange} />
              }
              label="Recommended"
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'right', mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Update Hotel
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default EditHotel;
