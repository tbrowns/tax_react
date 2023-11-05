import React from 'react';

import Spacer from './Spacer';
import { Currency } from './Currency';

function History(props) {
  const netIncomes = props.values.map(item => 
    <div className={`flex my-1`}>
              {Currency()} <Spacer value={item} />
    </div>
    
  );
    
  return (
    <div className='m-3 w-48'>
        <div className='flex flex-col pt-2 pl-1 justify-end'
            id='formk'>
            <div className={`${props.values.length===0 ? 'flex':'hidden'}`}>
              Nothing to display here.
            
            </div>
            {netIncomes}

            <div className='mt-1 ml-32 text-teal'>History</div>
        </div>
    </div>
  )
}

export default History