import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Status from './Status';

function Navbar({ mode, setmode }) {
  const [hidden1, sethidden1] = useState("hidden");

  useEffect(() => {
    document.body.classList.toggle('light', mode === "light");
  }, [mode]);

  const handleToggle = () => {
    setmode(mode === "light" ? "dark" : "light");
  };

  const handleTipToggle = () => {
    sethidden1(hidden1 === "hidden" ? "visible" : "hidden");
  };

  return (
    <div className='navbar'>
      <div className='title'>
        <Link to="/" className='tracker-title'>LeetCode Tracker</Link>
      </div>
      <div className='controls'>
        <div className={`toggle-switch ${mode === "light" ? 'active' : ''}`} onClick={handleToggle}></div>
        <div className='tips' onClick={handleTipToggle}>
          <img src="bulb.png" alt="bulb icon" />
        </div>
      </div>
      <Status visi={hidden1} />
    </div>
  );
}

export default Navbar;
