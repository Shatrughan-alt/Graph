import React from 'react';
import './App.css'; 
import Network from './Components/Network';
import Latency from './Components/Latency';
import Motion from './Components/Motion';
import Battery from './Components/Battery';
const App = () => {
  

  return (
    <>
      <div className='ntwrk'>
      <Network />
    </div>
    <div className='two'>
        <Motion />
    <Latency/>
    </div>
    <div className='battery'>
      <Battery/>
    </div>
    </>
    
  );
};

export default App;
