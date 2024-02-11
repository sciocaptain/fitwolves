import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Window2 = () => {
    const [gender, setGender] = useState('');

    return (
        <div>
            <div className="tc1">
                Good to meet you, Suyash
            </div>
            <div className="gender-container">
                <div className="text-container-gender">
                    What is your gender?
                </div>
                <div className="radio-container">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={gender === 'Male'}
                            onChange={(e) => setGender(e.target.value)}
                        />Male</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={gender === 'Female'}
                            onChange={(e) => setGender(e.target.value)}
                        />Female</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={gender === 'Other'}
                            onChange={(e) => setGender(e.target.value)}
                        />Other</label>
                </div>
            </div>
            <Link to="/window3" className="btn-link">Go to Window 3</Link> {/* Button to link to Window3 */}
        </div>
    );
};

export default Window2;
