import React from 'react'
import { useLocation } from 'react-router-dom';

import Spacer from './Spacer';

function Compare({amount}) {
  const location=useLocation();

  let kenyan_amount=Number(amount);
  let ugandan_amount=Number(amount);
  let tanzanian_amount=Number(amount);

  function kenyan_tax(){
    let temp=kenyan_amount;
    
    if(location.pathname==="/Uganda")  temp=(kenyan_amount-1080)*0.04;
      
    else if(location.pathname==="/Tanzania") temp=(kenyan_amount-1080)*0.06;

    else temp=kenyan_amount-1080

    let gross_tax=0;
    let tax=temp;
    let i=0;

    let percentages=[10,25,30,32.5,35]
    let tax_bracket=[24000,8333,467667,300000,800000]

    while(i<5){
        if(tax<tax_bracket[i]||i===4){
            gross_tax+=(percentages[i]/100)*tax;
            break;

        }else{
            gross_tax+=(percentages[i]/100)*tax_bracket[i];
            tax-=tax_bracket[i]
            i++;

        }
    }
    if(gross_tax<=2400) return kenyan_amount;
        
    else{
      return temp-(gross_tax-2400)-(kenyan_amount*0.015);
      
    }
  }

  function ugandan_tax(){
    if(location.pathname==="/*"||location.pathname==="") ugandan_amount*=25;
      
    else if(location.pathname==="/Tanzania") ugandan_amount*=1.5;
    let gross_tax=0;
    let tax=ugandan_amount;
    let i=0;

    let percentages=[0,10,20,30,40]
    let tax_bracket=[235000,100000,75000,9590000,10000000]

    while(i<5){
        if(tax<tax_bracket[i]||i===4){
            gross_tax+=(percentages[i]/100)*tax;
            break;

        }else{
            gross_tax+=(percentages[i]/100)*tax_bracket[i];
            tax-=tax_bracket[i]
            i++;

        }
    }
    return (ugandan_amount-(gross_tax+ugandan_amount*0.05));
  }

  function tanzanian_tax(){
    if(location.pathname==="/*"||location.pathname==="")  tanzanian_amount*=16.6;
      
    else if(location.pathname==="/Uganda") tanzanian_amount*=0.66;

    let gross_tax=0;
    let tax=tanzanian_amount-(tanzanian_amount*0.1);
    let i=0;

    let percentages=[0,8,20,25,30]
    let tax_bracket=[270000,250000,240000,240000,1000000]

    while(i<5){
        if(tax<tax_bracket[i]||i===4){
            gross_tax+=(percentages[i]/100)*tax;
            break;

        }else{
            gross_tax+=(percentages[i]/100)*tax_bracket[i];
            tax-=tax_bracket[i]
            i++;

        }
    }
    return (tanzanian_amount-(gross_tax+tanzanian_amount*0.1));
  }
  const net={
    kenya:kenyan_tax(),
    uganda:ugandan_tax(),
    tanzania:tanzanian_tax(),

  }

  const percent={
    kenya:100-(kenyan_tax()/kenyan_amount*100),
    uganda:100-(ugandan_tax()/ugandan_amount*100),
    tanzania:100-(tanzanian_tax()/tanzanian_amount*100),

  }


  return (
    <div className='p-3'
      id='formk'>
      <div className='my-2'>
        Kenya:
        <p className='ml-3'>i. amount after tax(Ksh): <Spacer value={net.kenya} /> </p>
        <p className='ml-3'>ii.percentage tax paid: {(percent.kenya).toFixed(2)}%</p>

      </div>

      <div className='my-2'>
        Uganda:
        <p className='ml-3'>i. amount after tax(Ugx): <Spacer value={net.uganda} /> </p>
        <p className='ml-3'>ii.percentage tax paid: {(percent.uganda).toFixed(2)}%</p>
      </div>

      <div className='my-2'>
        Tanzania:
        <p className='ml-3'>i. amount after tax(Tsh): <Spacer value={net.tanzania} /> </p>
        <p className='ml-3'>ii.percentage tax paid: {(percent.tanzania).toFixed(2)}%</p>
      </div>
      
    </div>
  )
}

export default Compare