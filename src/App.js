import React from 'react';
import { AnimatePresence} from 'framer-motion';

import './App.css';

import {Header,Main } from './components';

function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="App">
        <div className='wrapper'>
          <div className='bg_shape'></div>
        </div>

        <Header />
        <Main/>

      </div>
    </AnimatePresence>
  );
}

export default App;
