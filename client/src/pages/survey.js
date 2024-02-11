import React, { useState } from 'react';

const Survey = () => {
    const [gender, setGender] = useState('');
    return (
        <div id="survey-container" style = {{overflow: "hidden"}}>
            <div id="survey-window-1" style = {{visibility: "hidden"}}>
                <div class="text-container-1">
                    Hey there, Seawolf.
                </div>
                <div class="text-container-2">
                    What's your name?
                </div>
                <input className = "user_name" type="text" placeholder="My name is" style={{ top: '55%'}}/>
                <div class="text-container-3">
                    What's your date of birth?
                </div>
                <input className = "user_DOB" type="text" placeholder="MM-DD-YYYY" style={{ top: '55%' }}  />
            </div>
            <div id="survey-window-2" style = {{visibility: "hidden", overflow: "hidden"}}>
                <div class="tc1" style = {{textAlign: "left", left : "10%"}}>
                    Nice to meet you
                </div>
                <div className="gender-container">
                    <div className="text-container-gender" >
                        What is your gender?
                    </div>
                    <div className="radio-container">
                    <label>
                     <input
                          type="radio"
                          class = "radButton"
                          name="gender"
                          value="Male"
                          checked={gender === 'Male'}
                          onChange={(e) => setGender(e.target.value)}
                    />Male</label>
                    <label>
                        <input
                          type="radio"
                          class = "radButton"
                          name="gender"
                          value="Female"
                          checked={gender === 'Female'}
                          onChange={(e) => setGender(e.target.value)}
                        />Female</label>
                    <label>
                        <input
                        type="radio"
                        class = "radButton"
                        name="gender"
                        value="Other"
                        checked={gender === 'Other'}
                        onChange={(e) => setGender(e.target.value)}
                        />Other</label>
                    </div>
                </div>
            </div>
            <div id="survey-window-3" style = {{visibility: "hidden"}}>
                <div class="hw-container-1">
                    We've got a surprise in store.
                </div>
                <div class="hw-container-2">
                   How tall are you?
                </div>
                <input className = "user_height" type="text" placeholder="    ft    in" style={{ top: '55%', left: "22%"}}/>
                <div class="hw-container-3">
                    What's your weight?
                </div>
                <input className = "user_weight" type="text" placeholder="            lb" style={{ top: '55%' }}  />
            </div>
            <div id = "survey-window-5" style = {{visibility: "visible"}}>
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
                
            </div>
            <div id = "survey-window-6" style = {{visibility: "hidden"}}>
                <div id = "title-win-4">When are you free?</div>
                <img id = "background-schedule"></img>
                <div id = "schedule-picker">
                    
                </div>
            </div>
            <div id = "survey-window-7">
            
            </div>
        </div>
    );
        
        // <div>

        // </div>
};

export default Survey;