import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Window1 = () => {
    const [gender, setGender] = useState('');
    return (
        <div id="survey-container">
            <div>
                <div className="text-container-1">
                    Hey there, Seawolf.
                </div>
                <div className="text-container-2">
                    What's your name?
                </div>
                <input className="user_name" type="text" placeholder="My name is" style={{ top: '55%' }}/>
                <div className="text-container-3">
                    What's your date of birth?
                </div>
                <input className="user_DOB" type="text" placeholder="I was born on" style={{ top: '55%' }}  />
            </div>
            <Link to="/window2" className="btn-link">Go to Window 2</Link> {/* Button to link to Window2 */}
        </div>
    );
};

export default Window1;
