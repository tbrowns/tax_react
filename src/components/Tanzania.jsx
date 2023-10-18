import React, { useEffect } from 'react'
import { useState } from 'react';
import{motion} from "framer-motion";

function Tanzania() {
  const [basic_pay,setBasic_pay] = useState(0);
  const [paye,setPaye] = useState(0);
  const [nssf,setNssf] = useState(0);

  const [invalid,setInvalid] =useState(false);
  const [display,setDisplay]= useState(false);

  const taxable = (basic_pay-nssf).toFixed(2);
  const net_amount = (taxable-paye).toFixed(2);

  useEffect (() => {
    let temp=0;
    if(nssf!==0){
      temp=basic_pay*0.1;
      setNssf(temp)

    }

    let gross_tax=0;
    let tax=basic_pay-temp;
    let i=0;
    
    let percentages=[0,8,20,25,30]
    let tax_bracket=[270000,250000,240000,240000,100000000]

    while(i<=5){
      if(tax<tax_bracket[i]){
          gross_tax+=(percentages[i]/100)*tax;
          break;

      }
      else{
          gross_tax+=(percentages[i]/100)*tax_bracket[i];
          tax-=tax_bracket[i]
          i++;
      }
    }

    setPaye(gross_tax.toFixed(2));
    setDisplay(false);

  },[basic_pay]);

  function checkValidity(){
    if(basic_pay<1 || basic_pay>200000000 || isNaN(basic_pay)){
        setInvalid(true);
        return false;
    }else{
        setInvalid(false);
        return true;
      }
  }
  const handler = () =>{
    if(nssf===0){
      setNssf(basic_pay*0.1)

    }else{
      setNssf(0);
    }
    
  }
  
  const calculate = () => {
    if(checkValidity()) setDisplay(true);
    else{
        setDisplay(false);
        return;
    }

  }

  return (
    <div className='m-4 flex flex-col justify-center items-center '>
        <form action="" id='formk'
            className='bg-white z-50 m-4 h-60 w-72 flex flex-col justify-center items-center'>
            <input className='mt-4 w-64 px-4 h-8 rounded-2xl border border-black' 
                type='text'
                placeholder='Enter basic salary'
                required={basic_pay}
                onChange={(e)=>setBasic_pay(e.target.value)}
            >

            </input>
            <label className={` text-red-600 bg-red-200 text-center w-52 px-4 h-6 rounded-xl border border-red-600
                            ${invalid ? 'block':'hidden'}`} >
                Please enter a valid amount!
                
            </label>

            <div className='flex justify-between items-center my-4 w-56'>
              <label htmlFor="nssf">Apply NSSF:</label>
              <input type='checkbox' id='nssf'
                className='accent-teal'
                onClick={handler}
              >
              
              </input>
            </div>
            
            <motion.button whileTap={{scale: .8}} type="button"
              onClick={calculate}
              className="bg-teal w-28 py-1 my-4 rounded-3xl border border-black" >
              Calculate
            </motion.button>
        </form>

        {display &&
        <div className="flex flex-col justify-center items-center bg-white z-50 w-60 h-96 " 
          id="my_payslip" >
          <div className=" w-36 h-10 my-2 text-2xl bg-teal rounded-lg text-center">
              My Payslip
          </div> 
          <div id='payslip_child'>
            SALARY: 
            <span className='text-sm' id="salary">Tsh. {basic_pay} </span>

          </div>
          <div className={`${nssf!=0?'flex':'hidden'} flex-col justify-center items-center text-lg my-1`}>
            NSSF: 
            <span className='text-sm' id="salary">Tsh. {nssf} </span>

          </div>

          <div id='payslip_child'>
            TAXABLE INCOME: 
            <span className='text-sm' id="salary">Tsh. {taxable} </span>

          </div>
          <div id='payslip_child'>
            PAYE: 
            <span className='text-sm' id="salary">Tsh. {paye} </span>

          </div>
          <div id='payslip_child'>
            NET INCOME: 
            <span className='text-sm' id="salary">Tsh. {net_amount}</span>

          </div>
          
            
        </div>
        }

    </div>
  )
}

export default Tanzania