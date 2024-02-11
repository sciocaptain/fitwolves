import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Window2 = () => {
    const [gender, setGender] = useState('');

    return (
        <div id = "survey-container">
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
            <div id = "Carousel">
                <Link to = "/window2"><img id = "left-arrow-carousel"></img></Link>
                <div id="circle-container">
                    <div class="circle1"></div>
                    <div class="circle1"></div>
                    <div class="circle1"></div>
                    <div class="circle1"></div>
                </div>
                <Link to = "/window4"><img id = "right-arrow-carousel"></img></Link>
            </div>
        </div>
    );
};

export default Window2;
