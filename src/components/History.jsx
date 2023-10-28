import React from 'react';
import { useLocation } from 'react-router-dom';

import Spacer from './Spacer';

function History(props) {
  let currency="Ksh.";
  const location=useLocation();

  if(location.pathname==="/Uganda") currency='Ugx.';

  else if(location.pathname==="/Tanzania"){
    currency='Tsh.';

  }
    
  return (
    <div className='m-3 w-48'>
        <div className='flex flex-col pt-2 pl-1 justify-end'
            id='formk'>
            <div className={`${props.one===0? 'flex':'hidden'}`}>
              There is nothing here.
            
            </div>
            <div className={`${props.one===0? 'hidden':'flex'}  my-1`}>
              {currency} <Spacer value={props.one} />
            </div>

            <div className={`${props.two===0? 'hidden':'flex'}  my-1`}>
              {currency} <Spacer value={props.two} />
            </div>

            <div className={`${props.three===0? 'hidden':'flex'}  my-1`}>
              {currency} <Spacer value={props.three} />
            </div>

            <div className='mt-1 text-teal'>history</div>
        </div>
    </div>
  )
}

export default History