import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const PlacesOverview = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'pie',
      },
      labels: [],
      title: {
        text: 'Distribution of Places by Category',
        align: 'center',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  const [totalPlaces, setTotalPlaces] = useState(0); // State to hold total places count

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          'https://skyclub-dashboard-server-0923.vercel.app/api/places',
        ); // Adjust the endpoint as per your backend
        const data = response.data.places; // Access the `places` array from the response

        console.log('Fetched Places:', data); // Log to verify the response structure

        // Calculate total places count
        setTotalPlaces(data.length);

        // Calculate distribution by category
        const categoryCount = {};
        data.forEach((place) => {
          const category = place.category;
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        console.log('Category Count:', categoryCount); // Log to verify the category distribution

        const categories = Object.keys(categoryCount);
        const counts = Object.values(categoryCount);

        setChartData({
          series: counts, // Array of counts per category
          options: {
            ...chartData.options,
            labels: categories, // Category labels for the pie chart
          },
        });
      } catch (err) {
        console.error('Error fetching places:', err);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Places Overview</h1>
      <h2>Total Places: {totalPlaces}</h2> {/* Display total places count */}
      {chartData.series.length > 0 ? (
        <Chart options={chartData.options} series={chartData.series} type="pie" height={350} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PlacesOverview;
