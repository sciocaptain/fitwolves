import React from 'react';
import axios from 'axios'; // Import Axios library

const Survey = () => {
    // Function to handle button click
    const handleButtonClick = () => {
        // Send POST request to /getJSON endpoint
        axios.get('http://localhost:8000/getJSON')
            .then(response => {
                // Handle the response data here
                console.log('Received meal plan JSON from server:', response.data);
                // Process the received JSON data as needed
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error('Error fetching meal plan JSON:', error);
            });
    };

    return (
        <div>
            {/* Button to trigger the request */}
            <button onClick={handleButtonClick}>Fetch Meal Plan</button>
        </div>
    );
};

export default Survey;
