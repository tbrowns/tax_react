import React from 'react';
import { AnimatePresence} from 'framer-motion';

import './App.css';

import { Routes, Route} from 'react-router-dom';

import { Kenya, Uganda, Tanzania,Header } from './components';


function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="App">
        <div className='wrapper'>
        <div className='bg_shape'></div>
        </div>
      <Header />

      <Routes basePath='/tax_react'>
        <Route path="/" element={<Kenya/>} />
        <Route path="/Uganda" element={<Uganda />} />
        <Route path="/Tanzania" element={<Tanzania />} />
      </Routes>

    </div>
    </AnimatePresence>
  );
}

export default App;
