import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Window4 = () => {
    const [gender, setGender] = useState('');
    return (
        <div id="survey-container">
                <div id = "title-win-4">Everyone's Beautiful.</div>
                <div id = "container1-5">
                    <img id = "skinny-5"></img>
                    <button id = "thatsme1">That's Me</button>
                </div>
                <div id = "container2-5">
                    <img id = "fit-5"></img>
                    <button id = "thatsme1">That's Me</button>
                </div>
                <div id = "container3-5">
                    <img id = "fat-5"></img>
                    <button id = "thatsme1">That's Me</button>
                </div>
                
            <Link to="/mainpage" className="btn-link">Go to mainpage</Link> {/* Button to link to Window2 */}
        </div>
    );
};

export default Window4;
