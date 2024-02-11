import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";


const Login = () => {
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [isImageContainerVisible, setIsImageContainerVisible] = useState(false);
    
  const handleMouseMove = (event) => {
    const x = -(event.clientX / window.innerWidth)*4; // Calculate percentage position based on mouse X coordinate
    const y = -(event.clientY / window.innerHeight)*4; // Calculate percentage position based on mouse Y coordinate
    setBackgroundPosition({ x, y });
  };

    return (
        <div onMouseMove={handleMouseMove}>
            <img 
                id="login-background"
                style={{
                  top: `${backgroundPosition.y}vw`,
                  left: `${backgroundPosition.x}vw`,
                  height: '90vh',
                }}
            ></img>
             <div id = "login-window">
                <div id = "image-container">
                    <img id = "nutri-logo"></img>
                    <img id = "wolf-logo"></img>
                </div>
                <input className = "login-user-input" type="text" placeholder="Username" style={{ top: '44%' }}/>
                <input className = "login-user-input" type="password" placeholder="Password" style={{ top: '51%' }}  />
                <Link to = "/survey" id = "login-submit" >Submit</Link> 
                <svg
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',overflow: 'visible' }}
                width="20vw"
                height="20vw"
                >
                    <circle cx="110%" cy="50%" r={`${-backgroundPosition.x*3+39}vw`} stroke="rgba(255,255,255,0.18)" strokeWidth="0.12vw" fill="none" />
                    <circle cx="110%" cy="50%" r={`${-backgroundPosition.x*4+50}vw`} stroke="rgba(255,255,255,0.18)" strokeWidth="0.12vw" fill="none" />
                    <circle cx="110%" cy="50%" r={`${-backgroundPosition.x*6+60}vw`} stroke="rgba(255,255,255,0.14)" strokeWidth="0.09vw" fill="none" />
                    <circle cx="110%" cy="50%" r={`${-backgroundPosition.x*8+72}vw`} stroke="rgba(255,255,255,0.1)" strokeWidth="0.06vw" fill="none" />
                </svg>
            </div>
        </div>
    );
};

export default Login;
