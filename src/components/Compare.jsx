import React from 'react'
import { useLocation } from 'react-router-dom';

import Spacer from './Spacer';
import {Kenya} from './Kenya.jsx'
import {Uganda} from './Uganda.jsx'
import {Tanzania} from './Tanzania.jsx'
import { Currency } from './Currency';
import {CurrencyConverter} from './CurrencyConverter.jsx';

function Compare({amount}) {
  const location=useLocation();
  const new_amount=Number(amount);
  const country = location.pathname.slice(1);

  function kenyan_tax(){
    const kenyan_amount = CurrencyConverter(country,'KES',new_amount);

    const result = Kenya(kenyan_amount, 1080, false);

    const income = CurrencyConverter('KES', country, result.total); 

    return income;
    
  }

  function ugandan_tax(){
    const ugandan_amount = CurrencyConverter(country,'UGX',new_amount);

    const result = Uganda(ugandan_amount, false);

    const income = CurrencyConverter('UGX', country, result.total);

    return income;

  }
  function tanzanian_tax(){
    const tanzanian_amount = CurrencyConverter(country,'TZS',new_amount);

    const result = Tanzania(tanzanian_amount);

    const income = CurrencyConverter('TZS', country, result.total);

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
        {net.kenya < 0 ? <p className='ml-3'>i. amount after tax {Currency()}: Loading...</p> : 
                        <div>
                          <p className='ml-3'>i. amount after tax {Currency()}: <Spacer value={net.kenya} /> </p>
                          <p className='ml-3'>ii.percentage tax paid: {(percent.kenya).toFixed(2)}%</p>
                        </div>}

      </div> 

      <div className='my-2'>
        Uganda:
        {net.uganda < 0 ? <p className='ml-3'>i. amount after tax {Currency()}: Loading...</p> :
                        <div>
                          <p className='ml-3'>i. amount after tax {Currency()}: <Spacer value={net.uganda} /> </p>
                          <p className='ml-3'>ii.percentage tax paid: {(percent.uganda).toFixed(2)}%</p>
                        </div>}

      </div>

      <div className='my-2'>
        Tanzania:
        {net.tanzania < 0 ? <p className='ml-3'>i. amount after tax {Currency()}: Loading...</p> :
                        <div>
                          <p className='ml-3'>i. amount after tax {Currency()}: <Spacer value={net.tanzania} /> </p>
                          <p className='ml-3'>ii.percentage tax paid: {(percent.tanzania).toFixed(2)}%</p>
                        </div>}
      </div>
      
    </div>
  )
}

export default Compare