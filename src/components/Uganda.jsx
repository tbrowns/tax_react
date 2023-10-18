import React from 'react'
import { useState } from 'react';
import{motion} from "framer-motion";

function Uganda() {
  const [basic_pay,setBasic_pay] = useState(0);
  const [nssf,setNssf] = useState(0);
  const [paye,setPaye] = useState(0);
  const [net_amount,setNet_amount] = useState(0.0);

  const [isnssf,setisNssf] = useState(false);
  const [islst,setisLst] = useState(false);

  const [invalid,setInvalid] =useState(false);
  const [display,setDisplay]= useState(false);

  function checkValidity(){
    if(basic_pay<=0 || basic_pay>200000000 || isNaN(basic_pay)){
        setInvalid(true);
        return false;
    }else{
        setInvalid(false);
        return true;
      }
  }

  let taxable=basic_pay;

  const marknssf = () => {
    if(isnssf){
        setisNssf(false);
    }else{
        setisNssf(true);
    }
  }

  const marklst = () => {
    if(islst){
        setisLst(false);
    }else{
        setisLst(true);
    }
  }

  const handler = (e) => {
    setBasic_pay(e.target.value)
    if(isnssf) setNssf(taxable*0.05);
  }

  const calculate = () => {
    if(checkValidity()) setDisplay(true);
    else{
        setDisplay(false);
        return;
    }

    let gross_tax=0;
    let tax=taxable;
    let i=0;
    
    let percentages=[0,10,20,30,40]
    let tax_bracket=[235000,100000,75000,9590000,100000000]

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
    setNet_amount(taxable-(gross_tax+nssf));

  }

  return (
    <div className='m-4 flex flex-col justify-center items-center '>
        <form action="" id='formk'
            className='bg-white z-50 m-4 h-60 w-72 flex flex-col justify-center items-center'>
            <input className='mt-2 w-64 px-4 h-8 rounded-2xl border border-black' 
                type='text'
                placeholder='Enter basic salary'
                required={basic_pay}
                onChange={handler}
            >

            </input>
            <label className={` text-red-600 bg-red-200 text-center w-52 px-4 h-6 rounded-xl border border-red-600
                            ${invalid ? 'block':'hidden'}`} >
                Please enter a valid amount!
                
            </label>

            <div className='flex justify-between items-center my-2 w-56'>
              <label htmlFor="nssf">Apply NSSF:</label>
              <input type='checkbox' id='nssf'
                className='accent-teal'
                onClick={marknssf}
              >
              
              </input>
            </div>

            <div className='flex justify-between items-center my-2 w-56'>
              <label htmlFor="lst">Apply LST:</label>
              <input type='checkbox' id='lst'
                className='accent-teal'
                onClick={marklst}
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
            <span className='text-sm' id="salary">Ugx. {basic_pay} </span>

          </div>
          <div className={`${isnssf?'flex':'hidden'} flex-col justify-center items-center text-lg my-1`}>
            NSSF: 
            <span className='text-sm' id="salary">Ugx.{nssf} </span>

          </div>
          <div className={`${islst?'flex':'hidden'} flex-col justify-center items-center text-lg my-1`}>
            LST: 
            <span className='text-sm' id="salary">Ugx. </span>

          </div>
          <div id='payslip_child'>
            TAXABLE INCOME: 
            <span className='text-sm' id="salary">Ugx. {taxable}</span>

          </div>
          <div id='payslip_child'>
            PAYE: 
            <span className='text-sm' id="salary">Ugx. {paye} </span>

          </div>
          <div id='payslip_child'>
            NET INCOME: 
            <span className='text-sm' id="salary">Ugx. {net_amount}</span>

          </div>
          
            
        </div>
        }

    </div>
  )
}

export default Uganda