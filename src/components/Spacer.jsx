import React from 'react'

function Spacer({ value }) {
  let new_value=Number(Number(value).toFixed(2));

  const formattedValue = new_value.toLocaleString('en-US', {
    useGrouping: true,
  });

  return (
    <div className='ml-1'>
      {formattedValue}
    </div>
  );
}

export default Spacer