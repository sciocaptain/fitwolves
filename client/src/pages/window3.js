import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Window3 = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = async () => {
        const surveyData = {
            height: parseInt(height), // Convert height to a number
            weight: parseInt(weight), // Convert weight to a number
        };

        try {
            const calorieIntake = calculateCalorieIntake(surveyData);
            console.log("WE ARE HERE")
            await axios.post('http://localhost:8000/postCalories', { calories: calorieIntake });
           
        } catch (error) {
            window.alert("Server Error");
        }
    };

    function calculateCalorieIntake(userData) {
        const { height, weight } = userData;

        // This is a simplified version and does not consider gender or activity level
        const calorieIntake = (10 * weight) + (6.25 * height) - 5;
        return calorieIntake;
    }

    return (
        <div id="survey-container">
            <div>
                <div class="hw-container-1">
                    We've got a surprise in store.
                </div>
                <div class="hw-container-2">
                    How tall are you?
                </div>

                <input className="user_height" type="text" placeholder="    ft    in" value={height} onChange={(e) => setHeight(e.target.value)} style={{ top: '55%' }} />
                <div class="hw-container-3">
                    What's your weight?
                </div>
                <input className="user_weight" type="text" placeholder="            lb" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ top: '55%' }} />

                <button onClick={handleSubmit} id="clickey">Submit Survey</button>
            </div>
            <Link to="/window4" className="btn-link">Go to Window 4</Link>
        </div>
    );
};

export default Window3;
