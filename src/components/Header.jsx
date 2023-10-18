//npm install rsuite
//npm install next

import React from 'react'

import { useLocation } from 'react-router-dom';

import { Dropdown } from "rsuite"; 
import "rsuite/dist/rsuite.min.css"; 

function Header() {
  let country="Kenya";
  
  const location=useLocation();

  if(location.pathname==="/Uganda"){
    country="Uganda";
    
  }else if(location.pathname==="/Tanzania"){
    country="Tanzania";
  }

  return (
    <div className=' px-4 flex justify-between items-center'>
        <div id='title'
         className='font-bold text-5xl'>
          Tax Calculator
        </div>
        <div className='text-lg '>
        <Dropdown title={country}>
          <Dropdown.Item as="a" href="/*">Kenya</Dropdown.Item>
          <Dropdown.Item as="a" href="/Uganda">Uganda</Dropdown.Item>
          <Dropdown.Item as="a" href="/Tanzania">Tanzania</Dropdown.Item>

        </Dropdown>

        </div>
        
        </div>
        
  )
}

export default Header