import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const formatItinerary = (itineraries) => {
  if (Array.isArray(itineraries) && itineraries.length > 0) {
    return itineraries.map((itinerary, index) => (
      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`day-${index}-content`}
          id={`day-${index}-header`}
        >
          <Typography>Day {itinerary.day}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1">Places:</Typography>
          <List>
            {itinerary.places.length > 0 ? (
              itinerary.places.map((place) => (
                <ListItem key={place._id}>
                  <ListItemText
                    primary={`${place.name} (${place.category})`}
                    secondary={`${place.description}. Rating: ${place.rating}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>No places found</ListItem>
            )}
          </List>
          <Typography variant="subtitle1">Restaurants:</Typography>
          <List>
            {itinerary.restaurants.length > 0 ? (
              itinerary.restaurants.map((restaurant) => (
                <ListItem key={restaurant._id}>
                  <ListItemText
                    primary={`${restaurant.name} (${restaurant.category})`}
                    secondary={`${restaurant.description}. Rating: ${restaurant.rating}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>No restaurants found</ListItem>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    ));
  }
  return <Typography>No itinerary data available</Typography>;
};

const formatHotels = (selectedHotels) => {
  if (selectedHotels && selectedHotels.length > 0) {
    return (
      <div className="hotel-section">
        <h2 className="hotel-title">Selected Hotels</h2>
        {selectedHotels.map((hotel, index) => (
          <div key={index} className="hotel-container">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <span className="item-number">{index + 1}</span> {hotel.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>{hotel.description}</p>
                <p>
                  <strong>City:</strong> {hotel.city}
                </p>
                {hotel.image && (
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} className="img-fluid rounded" />
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    );
  }
  return null; // Return null if there are no hotels
};

const QuoteDetails = () => {
  const { id } = useParams(); // Extract the quote ID from the URL
  console.log('Quote ID:', id);
  const [itinerary, setItinerary] = useState([]);
  const [hotel, setHotels] = useState([]);
  const [costs, setCosts] = useState({
    accommodationCost: '',
    flightTicketCost: '',
    trainTicketCost: '',
    taxiRentalCost: '',
    personCount: 1,
    tax: 0, // Tax will be calculated
    subTotal: 0,
    totalCost: 0,
  });

  const [data, setData] = useState({});

  const fetchQuoteDetails = async (quoteId, setItinerary) => {
    try {
      const response = await fetch(
        `https://skyclub-dashboard-server-0923.vercel.app/api/quotes/${quoteId}`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Quote Details Data:', data);
        setItinerary(data.itinerary);
        setHotels(data.hotels);
        setData(data);
      } else {
        console.error('Failed to fetch quote details.');
      }
    } catch (error) {
      console.error('Error fetching quote details:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuoteDetails(id, setItinerary);
    }
  }, [id]);

  useEffect(() => {
    // Calculate the sub total based on person count and other costs
    const subTotal = (
      (Number(costs.accommodationCost) +
        Number(costs.flightTicketCost) +
        Number(costs.trainTicketCost) +
        Number(costs.taxiRentalCost)) *
      Number(costs.personCount)
    ).toFixed(2);

    // Calculate tax as 5% of sub total
    const tax = (Number(subTotal) * 0.05).toFixed(2);

    // Calculate total cost as subTotal + tax
    const totalCost = (Number(subTotal) + Number(tax)).toFixed(2);

    setCosts((prevCosts) => ({
      ...prevCosts,
      subTotal,
      tax,
      totalCost, // Ensure the total cost is rounded to 2 decimal places
    }));
  }, [
    costs.accommodationCost,
    costs.flightTicketCost,
    costs.trainTicketCost,
    costs.taxiRentalCost,
    costs.personCount,
  ]);

  const handleInputChange = (e) => {
    setCosts({
      ...costs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update costs in the quote first
      const response = await fetch(
        `https://skyclub-dashboard-server-0923.vercel.app/api/quotes/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cost: costs }), // Send the updated costs
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Costs updated successfully:', data);

        // Extract the user's email from the `data` object
        const userEmail = data.userDetails?.email;
        console.log('User Email:🆘', userEmail);

        // Check if email exists before sending the email
        if (userEmail) {
          // Send email notification to the user
          const emailResponse = await fetch(
            'https://skyclub-dashboard-server-0923.vercel.app/api/sendEmail',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: userEmail,
                subject: 'Your Quotation Details',
                // Update the message to include the itinerary title. e.g., 'Your Quotation for Paris for 5 Days'
                message: `Dear ${data.userDetails.name},\n\nYour quotation for ${data.itinerary[0].places[0].name} for ${data.itinerary.length} Days has been generated. Here are the details:\n\nTotal Cost: $${costs.totalCost}\n\nThank you for choosing our service.\n\nBest regards,\nSky Travel Club`,
              }),
            },
          );

          if (emailResponse.ok) {
            toast.success('Email sent successfully!');
            console.log('Email sent successfully!');
          } else {
            console.error('Failed to send email');
          }
        } else {
          console.error('User email not found');
        }
      } else {
        console.error('Failed to update costs');
      }
    } catch (error) {
      console.error('Error updating costs or sending email:', error);
    }
  };

  return (
    <Paper style={{ padding: '24px', maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Itinerary Details
      </Typography>
      {formatItinerary(itinerary)}
      {formatHotels(hotel)}

      {/* show user details in table format here */}
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{data.userDetails?.name}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{data.userDetails?.email}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>{data.userDetails?.phone}</td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>{data.userDetails?.country}</td>
          </tr>
          <tr>
            <td>Passport No:</td>
            <td>{data.userDetails?.passportNo}</td>
          </tr>
          <tr>
            <td>No of Pax:</td>
            <td>{data.userDetails?.noOfPax}</td>
          </tr>
          <tr>
            <td>Meal Plan:</td>
            <td>{data.userDetails?.mealPlan}</td>
          </tr>
          <tr>
            <td>Hotel Category:</td>
            <td>{data.userDetails?.hotelCategory}</td>
          </tr>
          <tr>
            <td>Vehicle Type:</td>
            <td>{data.userDetails?.vehicleType}</td>
          </tr>
          <tr>
            <td>Special Requirements:</td>
            <td>{data.userDetails?.specialRequirements}</td>
          </tr>
          <tr>
            <td>Children:</td>
            <td>
              {data.userDetails?.children?.map((age, index) => (
                <span key={index}>
                  {age} year{age > 1 ? 's' : ''} child
                  {index < data.userDetails.children.length - 1 ? ' and ' : ''}
                </span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      {/* add revised quotes here */}
      <Typography variant="h4" gutterBottom>
        Revised Quotes
      </Typography>
      <p>
        {data.revision ? (
          <span>
            <strong
              style={{
                backgroundColor: '#FABC3F',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              Revised Quote:
              {data.revision}
            </strong>{' '}
            <br />
            <strong>Total Cost : {data.cost.totalCost}</strong>
            <strong>Accommodation Cost : {data.cost.accommodationCost}</strong>
            <strong>Flight Ticket Cost : {data.cost.flightTicketCost}</strong>
            <strong>Train Ticket Cost : {data.cost.trainTicketCost}</strong>
            <strong>Taxi Rental Cost : {data.cost.taxiRentalCost}</strong>
            <strong>Person Count : {data.cost.personCount}</strong>
          </span>
        ) : (
          'No revised quotes available'
        )}
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
        <Typography variant="h6" gutterBottom>
          Add Costs
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Accommodation Cost"
              name="accommodationCost"
              value={costs.accommodationCost}
              onChange={handleInputChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Flight Ticket Cost"
              name="flightTicketCost"
              value={costs.flightTicketCost}
              onChange={handleInputChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Train Ticket Cost"
              name="trainTicketCost"
              value={costs.trainTicketCost}
              onChange={handleInputChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Taxi Rental Cost"
              name="taxiRentalCost"
              value={costs.taxiRentalCost}
              onChange={handleInputChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of People"
              name="personCount"
              value={costs.personCount}
              onChange={handleInputChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Tax (5% of Subtotal): ${costs.tax}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Sub Total:</Typography>
            <Typography
              variant="h6"
              style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}
            >
              ${costs.subTotal}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Typography
              variant="h6"
              style={{
                backgroundColor: '#e0f7fa',
                padding: '8px',
                borderRadius: '4px',
                display: 'inline-block',
              }}
            >
              Total Cost: ${costs.totalCost}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <Button type="submit" variant="contained" color="primary">
              Send Quotation
            </Button>
          </Grid>
        </Grid>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Paper>
  );
};

export default QuoteDetails;
