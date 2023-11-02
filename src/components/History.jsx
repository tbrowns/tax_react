import React from 'react';

import Spacer from './Spacer';
import { Currency } from './Currency';

function History(props) {
    
  return (
    <div className='m-3 w-48'>
        <div className='flex flex-col pt-2 pl-1 justify-end'
            id='formk'>
            <div className={`${props.one===0? 'flex':'hidden'}`}>
              Nothing to display.
            
            </div>
            <div className={`${props.one===0? 'hidden':'flex'}  my-1`}>
              {Currency()} <Spacer value={props.one} />
            </div>

            <div className={`${props.two===0? 'hidden':'flex'}  my-1`}>
              {Currency()} <Spacer value={props.two} />
            </div>

            <div className={`${props.three===0? 'hidden':'flex'}  my-1`}>
              {Currency()} <Spacer value={props.three} />
            </div>

            <div className='mt-1 text-teal'>history</div>
        </div>
    </div>
  )
}

export default History