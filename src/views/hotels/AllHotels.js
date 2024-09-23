import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AllHotels() {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    city: '',
    country: '',
    category: '',
  });
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cities, countries, and categories for filter options (you might need separate endpoints for these)
    const fetchFilterOptions = async () => {
      try {
        const [cityResponse, countryResponse, categoryResponse] = await Promise.all([
          fetch(
            'https://skyclub-dashboard-server-0923.vercel.app/api/places/filter-options/cities',
          ),
          fetch(
            'https://skyclub-dashboard-server-0923.vercel.app/api/places/filter-options/countries',
          ),
          fetch(
            'https://skyclub-dashboard-server-0923.vercel.app/api/places/filter-options/categories',
          ),
        ]);

        const cityData = await cityResponse.json();
        const countryData = await countryResponse.json();
        const categoryData = await categoryResponse.json();

        setCities(cityData.cities);
        setCountries(countryData.countries);
        setCategories(categoryData.categories);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        const query = new URLSearchParams({
          page: page + 1,
          limit: rowsPerPage,
          ...filters,
        }).toString();

        const response = await fetch(
          `https://skyclub-dashboard-server-0923.vercel.app/api/hotels?${query}`,
        );
        if (response.ok) {
          const data = await response.json();
          setHotels(data.places);
          console.log('data', data);
          setTotal(data.total);
        } else {
          console.error('Failed to fetch all places.');
        }
      } catch (error) {
        console.error('Error fetching all places:', error);
      }
    };
    fetchAllPlaces();
  }, [page, rowsPerPage, filters]);

  const handleView = (id) => {
    navigate(`/hotels/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/hotels/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://skyclub-dashboard-server-0923.vercel.app/api/hotels/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (response.ok) {
        setHotels(hotels.filter((hotel) => hotel._id !== id));
      } else {
        console.error('Failed to delete place.');
      }
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <Box sx={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>City</InputLabel>
            <Select name="city" value={filters.city} onChange={handleFilterChange} label="City">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              label="Country"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Country</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Reviews</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels && hotels.length > 0 ? (
              hotels.map((place) => (
                <TableRow key={place._id}>
                  <TableCell sx={{ color: 'text.secondary' }}>{place.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{place.country}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{place.city}</TableCell>
                  <TableCell>
                    <img
                      src={`data:image/jpeg;base64,${place.image}`}
                      alt={place.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '100px',
                        objectFit: 'cover',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{place.rating}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{place.reviews}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{place.category}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleView(place._id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEdit(place._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(place._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hotels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 8, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default AllHotels;
