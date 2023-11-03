import React from 'react'
import { useLocation } from 'react-router-dom';

import Spacer from './Spacer';
import {Kenya} from './Kenya.jsx'
import {Uganda} from './Uganda.jsx'
import {Tanzania} from './Tanzania.jsx'
import { Currency } from './Currency';

function Compare({amount}) {
  const location=useLocation();
  const new_amount=Number(amount);

  function kenyan_tax(){
    let kenyan_amount=new_amount;
    
    if(location.pathname==="/Uganda")  kenyan_amount*=0.04;
      
    else if(location.pathname==="/Tanzania") kenyan_amount*=0.06;

    const result=Kenya(kenyan_amount,1080,false);

    let income=result.total;

    if(location.pathname==="/Uganda")  income/=0.04;
      
    else if(location.pathname==="/Tanzania") income/=0.06;

    return income;
    
  }

  function ugandan_tax(){
    let ugandan_amount=new_amount;

    if(location.pathname==="/"||location.pathname==="") ugandan_amount*=25;
      
    else if(location.pathname==="/Tanzania") ugandan_amount*=1.5;

    const result=Uganda(ugandan_amount,false);

    let income=result.total;

    if(location.pathname==="/"||location.pathname==="") income/=25;
      
    else if(location.pathname==="/Tanzania") income/=1.5;

    return income;
  }

  function tanzanian_tax(){
    let tanzanian_amount=new_amount;

    if(location.pathname==="/"||location.pathname==="")  tanzanian_amount*=16.6;
      
    else if(location.pathname==="/Uganda") tanzanian_amount*=0.66;

    const result=Tanzania(tanzanian_amount);
    let income=result.total;

    if(location.pathname==="/"||location.pathname==="")  income/=16.6;
      
    else if(location.pathname==="/Uganda") income/=0.66;

    return income;
  }

  const net={
    kenya:kenyan_tax(),
    uganda:ugandan_tax(),
    tanzania:tanzanian_tax(),

  }

  const percent={
    kenya:100-(kenyan_tax()/new_amount*100),
    uganda:100-(ugandan_tax()/new_amount*100),
    tanzania:100-(tanzanian_tax()/new_amount*100),

  }


  return (
    <div className='p-3'
      id='formk'>
      <div className='my-2'>
        Kenya:
        <p className='ml-3'>i. amount after tax {Currency()}: <Spacer value={net.kenya} /> </p>
        <p className='ml-3'>ii.percentage tax paid: {(percent.kenya).toFixed(2)}%</p>

      </div>

      <div className='my-2'>
        Uganda:
        <p className='ml-3'>i. amount after tax {Currency()}: <Spacer value={net.uganda} /> </p>
        <p className='ml-3'>ii.percentage tax paid: {(percent.uganda).toFixed(2)}%</p>
      </div>

      <div className='my-2'>
        Tanzania:
        <p className='ml-3'>i. amount after tax {Currency()}: <Spacer value={net.tanzania} /> </p>
        <p className='ml-3'>ii.percentage tax paid: {(percent.tanzania).toFixed(2)}%</p>
      </div>
      
    </div>
  )
}

export default Compare