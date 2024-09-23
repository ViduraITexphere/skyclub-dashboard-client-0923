import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function AddHotel() {
  const [formData, setFormData] = useState({
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
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result.split(',')[1], // Extract Base64 part
      });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://skyclub-dashboard-server-0923.vercel.app/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Place added successfully!'); // Success message
        setTimeout(() => {
          navigate('/hotels'); // Redirect after success message
        }, 2000); // Delay to allow the toast to be visible
        // Clear form or redirect as needed
        setFormData({
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
      } else {
        toast.error('Failed to add hotel.'); // Error message
      }
    } catch (error) {
      toast.error('Error adding hotel:', error); // Error message
    }
  };

  return (
    <Paper sx={{ padding: 2, margin: 'auto', maxWidth: 800 }}>
      <Typography variant="h6" gutterBottom>
        Add New Hotel
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              fullWidth
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
            {formData.image && (
              <Box sx={{ marginTop: 1 }}>
                <img
                  src={`data:image/jpeg;base64,${formData.image}`} // Ensure MIME type matches the image
                  alt="Preview"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '200px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tags (comma separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Activities (comma separated)"
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Featured</Typography>
              <Checkbox name="featured" checked={formData.featured} onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Verified</Typography>
              <Checkbox name="verified" checked={formData.verified} onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Recommended</Typography>
              <Checkbox name="recommended" checked={formData.recommended} onChange={handleChange} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'right', mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Add Place
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <ToastContainer /> {/* Add ToastContainer to the component */}
    </Paper>
  );
}

export default AddHotel;
