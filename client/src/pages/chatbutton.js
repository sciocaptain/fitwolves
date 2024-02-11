import React from 'react';
import axios from 'axios'; // Import Axios library

const ChatButton = () => {
    // Function to handle button click
    const handleButtonClick = () => {
        // Send POST request to /getJSON endpoint
        axios.get('http://localhost:8000/getJSON')
            .then(response => {
                // Handle the response data here
                console.log('Received meal plan JSON from server:', response.data);
                createAndDownloadJsonFile(response.data);
                // Process the received JSON data as needed
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error('Error fetching meal plan JSON:', error);
            });
    };

    

    const createAndDownloadJsonFile = (data) => {
        const filename = "meal_plan.json";
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        // Create a link and trigger the download
        const link = document.createElement('a');
        link.href = href;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Clean up the URL object
        URL.revokeObjectURL(href);
    };

    return (
        <div>
            {/* Button to trigger the request */}
            <button onClick={handleButtonClick}>Fetch Meal Plan</button>
        </div>
    );
};

export default ChatButton;