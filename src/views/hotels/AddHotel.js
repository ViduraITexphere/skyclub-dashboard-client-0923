import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddHotel() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    shortTitle: '',
    description: '',
    price: '',
    image: '',
    gallery: [],
    startRating: '',
    numberOfGuests: '',
    bedrooms: '',
    beds: '',
    baths: '',
    tags: '',
    map: '',
    category: '',
    facilities: [],
    featured: false,
    verified: false,
    recommended: false,
  });

  const navigate = useNavigate();

  // Predefined list of facilities
  const facilitiesList = [
    'Free Wi-Fi',
    'Swimming Pool',
    'Gym',
    'Parking',
    'Air Conditioning',
    'Spa',
    'Restaurant',
    'Bar',
    'Room Service',
  ];

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle facilities checkbox changes
  const handleFacilitiesChange = (facility) => {
    setFormData((prev) => {
      const updatedFacilities = prev.facilities.includes(facility)
        ? prev.facilities.filter((item) => item !== facility) // Remove if already selected
        : [...prev.facilities, facility]; // Add if not selected
      return { ...prev, facilities: updatedFacilities };
    });
  };

  // Handle single image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result.split(',')[1], // Base64
      });
    };
    if (file) reader.readAsDataURL(file);
  };

  // Handle multiple gallery images upload
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]); // Base64
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }),
    )
      .then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          gallery: base64Images,
        }));
      })
      .catch(() => toast.error('Error uploading gallery images.'));
  };

  // Handle form submission
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
        toast.success('Hotel added successfully!');
        setTimeout(() => navigate('/hotels'), 2000);
        setFormData({
          name: '',
          country: '',
          city: '',
          shortTitle: '',
          description: '',
          price: '',
          image: '',
          gallery: [],
          startRating: '',
          numberOfGuests: '',
          bedrooms: '',
          beds: '',
          baths: '',
          tags: '',
          map: '',
          category: '',
          facilities: [],
          featured: false,
          verified: false,
          recommended: false,
        });
      } else {
        toast.error('Failed to add hotel.');
      }
    } catch (error) {
      toast.error('Error adding hotel.');
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
              label="Short Title"
              name="shortTitle"
              value={formData.shortTitle}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Rating"
              name="startRating"
              value={formData.startRating}
              onChange={handleChange}
              fullWidth
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Guests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              fullWidth
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              fullWidth
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Beds"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              fullWidth
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Baths"
              name="baths"
              value={formData.baths}
              onChange={handleChange}
              fullWidth
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Facilities
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {facilitiesList.map((facility) => (
                <FormControlLabel
                  key={facility}
                  control={
                    <Checkbox
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilitiesChange(facility)}
                    />
                  }
                  label={facility}
                />
              ))}
            </Box>
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
                  src={`data:image/jpeg;base64,${formData.image}`}
                  alt="Preview"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '5px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" component="label">
              Upload Gallery
              <input type="file" hidden accept="image/*" multiple onChange={handleGalleryChange} />
            </Button>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              {formData.gallery.map((image, index) => (
                <img
                  key={index}
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Gallery ${index + 1}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '5px',
                    objectFit: 'cover',
                  }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'right', mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Add Hotel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <ToastContainer />
    </Paper>
  );
}

export default AddHotel;
