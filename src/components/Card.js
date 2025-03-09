import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Card({ name, no, qno }) {
  const [op, setOp] = useState(null);
  const [ans, setAns] = useState(0);

  useEffect(() => {
    let storedData = JSON.parse(localStorage.getItem('Checked' + `${no}`));
    if (storedData) {
      storedData = [...new Set(storedData)];
      let validAnswers = 0;
      for (let i = 0; i < storedData.length; i++) {
        if ((storedData[i] !== ',' && storedData[i] !== '/' && storedData[i] !== '"' && storedData[i] !== '[' && storedData[i] !== ']' && (storedData[i] < 'a' || storedData[i] > 'z') && storedData[i] !== "\\" && storedData[i] !== '+') || storedData.length === 3) {
          validAnswers++;
        }
      }
      setAns(validAnswers);
      setOp(storedData);
    }
  }, [no]);

  const fillerStyles = {
    height: '100%',
    width: `${Math.round((ans * 100) / qno)}%`,
    backgroundColor: "#22C55E",
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out'
  };

  return (
    <Link to={name} className='card-link'>
      <div className='card'>
        <img className='icon' src="https://pluspng.com/img-png/react-logo-png-js-logo-react-react-js-icon-512x512.png" alt="React Logo"></img>
        <h2>{name}</h2>
        <h4>Total Questions: {qno}</h4>
        {ans === 0 ? 
          <h6>Not Yet Started</h6> : 
          Math.round((ans * 100) / qno) !== 100 ?
            <div>
              <div className='flex justify-between mt-2 text-center'>
                <h6 className='status started'>STARTED</h6>
                <img src="https://th.bing.com/th/id/R.15e3df2a05ac767df4359bf37707b781?rik=YoELJf68lvMxWQ&riu=http%3a%2f%2fs3.amazonaws.com%2fpix.iemoji.com%2fimages%2femoji%2fapple%2fios-11%2f256%2fman-technologist-light-skin-tone.png&ehk=uinI8ak5dKPQXLDnNbEcTr%2bSuymPLXBS%2bBPUBpPLgcI%3d&risl=&pid=ImgRaw&r=0" className='w-5 h-5' alt="Started Icon"></img>
                <h6 className='text-green-700'>{Math.round((ans * 100) / qno)}%</h6>
              </div>
              <div className="progress-container">
                <div style={fillerStyles}></div>
              </div>
            </div> :
            <div>
              <div className='flex justify-between mt-2 text-center'>
                <h6 className='status finished'>FINISHED</h6>
                <img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Clapping_Hands_Emoji_ios10_d7ab242e-7230-47bf-b1e2-d46a4bc51b5b_grande.png?v=1571606090" className='w-5 h-5' alt="Finished Icon"></img>
                <h6 className='text-green-700'>100%</h6>
              </div>
              <div className="progress-container full"></div>
            </div>
        }
      </div>
    </Link>
  );
}
