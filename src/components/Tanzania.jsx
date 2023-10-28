import React, { useEffect } from 'react'
import { useState } from 'react';
import{motion} from "framer-motion";

import History from './History.jsx'
import Spacer from './Spacer.jsx';
import Compare from './Compare.jsx';

function Tanzania() {
  const [basic_pay,setBasic_pay] = useState(0);
  const [paye,setPaye] = useState(0);

  const [display_analysis,setDisplay_analysis]= useState(false);
  const [invalid,setInvalid] =useState(false);
  const [display,setDisplay]= useState(false);

  const [first,setFirst]=useState(0);
  const [second,setSecond]=useState(0);
  const [third,setThird]=useState(0);

  const nssf= basic_pay*0.1;
  const taxable = basic_pay-nssf;
  const net_amount = taxable-paye;

  useEffect (() => {
    setDisplay(false);
    setInvalid(false);

    let gross_tax=0;
    let tax=basic_pay-nssf;
    let i=0;
    
    let percentages=[0,8,20,25,30]
    let tax_bracket=[270000,250000,240000,240000,100000000]

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

    setPaye(gross_tax);
    

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

  const calculate = () => {
    setDisplay_analysis(false);
    
    if(checkValidity()) setDisplay(true);
    else{
        setDisplay(false);
        return;
    }

    if(first!==net_amount){
      setFirst(net_amount);
      setSecond(first);
      setThird(second);

    }
  }

  const analysis = () => {
    setDisplay(false);
    setDisplay_analysis(true);
   
  }

  return (
    <div className='mt-32 h-96'>
        <div className=''>
           <History one={first} two={second} three={third}/>
        </div>
        <div className='m-2 flex flex-wrap justify-center items-center'>
        <form action="" id='formk'
            className='m-4 py-4 w-72 flex flex-col justify-center items-center'>
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
            <div className='flex text-center items-center m-3  w-20 h-8  border border-black rounded-2xl'>
                <motion.button whileTap={{scale: .8}} type="button"
                  className='ml-2 flex items-center  rounded-2xl h-6 w-20 '>
                    <div className=''>NSSF</div>
                    <div className='flex items-center justify-center ml-1 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                </motion.button>
            </div>
            
            <motion.button whileTap={{scale: .8}} type="button"
              onClick={calculate}
              className="bg-teal w-28 py-1 my-4 rounded-3xl border border-black" >
              Calculate
            </motion.button>

            {display &&
            <motion.button whileTap={{scale: .8}} type='button'
              onClick={analysis}
              className="bg-teal w-28 py-1 my-4 rounded-3xl border border-black" >
              Analyze

            </motion.button>}
        </form>

        {display_analysis && 
            <div className=''>
                <Compare amount={basic_pay}/>
            </div>
        }

        {display &&
        <div className="flex flex-col justify-center items-center bg-white z-50 w-60 h-96 " 
          id="my_payslip" >
          <div className=" w-36 h-10 my-2 text-2xl bg-teal rounded-lg text-center">
              My Payslip
          </div> 
          <div id='payslip_child'>
            SALARY: 
            <span className='flex text-sm' id="salary">Tsh. <Spacer value={basic_pay}/> </span>

          </div>
          <div className={`${nssf!==0?'flex':'hidden'} flex-col justify-center items-center text-lg my-1`}>
            NSSF: 
            <span className='flex text-sm' id="salary">Tsh. <Spacer value={nssf}/> </span>

          </div>

          <div id='payslip_child'>
            TAXABLE INCOME: 
            <span className='flex text-sm' id="salary">Tsh. <Spacer value={taxable}/> </span>

          </div>
          <div id='payslip_child'>
            PAYE: 
            <span className='flex text-sm' id="salary">Tsh. <Spacer value={paye}/> </span>

          </div>
          <div id='payslip_child'>
            NET INCOME: 
            <span className='flex text-sm' id="salary">Tsh. <Spacer value={net_amount}/></span>

          </div>
          
            
        </div>
        }
        </div>

    </div>
  )
}

export default Tanzania