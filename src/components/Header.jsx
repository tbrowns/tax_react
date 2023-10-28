//npm install rsuite
//npm install next

import React,{useEffect,useState} from 'react'

import { useLocation } from 'react-router-dom';

import { Dropdown } from "rsuite"; 
import "rsuite/dist/rsuite.min.css"; 


function Header() {
  const location=useLocation();
  let country="Kenya";

  if(location.pathname==="/Uganda")  country="Uganda";
   
  else if(location.pathname==="/Tanzania") country="Tanzania";
    

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div className={`{ fixed w-full top-0 px-3 py-3 flex justify-between ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
        <div id='title'
         className='font-bold text-5xl'>
          Tax Calculator
        </div>
        <div className='text-lg '>
        <Dropdown title={country}>
          <Dropdown.Item as="a" href="/">Kenya</Dropdown.Item>
          <Dropdown.Item as="a" href="/Uganda">Uganda</Dropdown.Item>
          <Dropdown.Item as="a" href="/Tanzania">Tanzania</Dropdown.Item>

        </Dropdown>

        </div>
        
        </div>
        
  )
}

export default Header