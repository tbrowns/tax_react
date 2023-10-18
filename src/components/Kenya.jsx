import React, { useEffect } from 'react'
import { useState } from 'react';
import{motion} from "framer-motion";

function Kenya() {
    const [basic_pay,setBasic_pay] = useState(0);
    const [tier,setTier] = useState('NSSF rates');
    const [nssf,setNssf] = useState(1080);
    const [paye,setPaye] = useState(0);
    
    const [display,setDisplay]= useState(false);
    const [invalid,setInvalid] =useState(false);

    const taxable=basic_pay-nssf;
    const levy = (0.015*basic_pay);
    const net_amount= (taxable-(paye+levy)).toFixed(2);

    function checkValidity(){
        if(basic_pay<=1 || basic_pay>10000000 || isNaN(basic_pay)){
            setInvalid(true);
            return false;
        }else{
            setInvalid(false);
            return true;
        }
    }
    function setter_nssf(){
        if(tier==='None'){
            setNssf(0);
        }else if(tier==='Tier 1'){
            setNssf(360);
        }else if(tier==='Tier 1 & Tier 2'){
            setNssf(1080);
        }
        else if(tier==='Old rates'){
            setNssf(200);
        }
        
    }

    useEffect (() => {
        setter_nssf();
    },[tier]);

    useEffect (() => {
        
        let gross_tax=0;
        let tax=taxable;
        let i=0;
    
        let percentages=[10,25,30,32.5,35]
        let tax_bracket=[24000,8333,467667,300000,1000000]

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
        if(gross_tax>2400){
            setPaye(gross_tax-2400);
        }else{
            setPaye(0);

        }

        setDisplay(false);
        
        
    }, [basic_pay]);

    const calculate = () => {
        if(checkValidity()) setDisplay(true);
        else{
            setDisplay(false);
            return;
        }

    }
  return (
    <div className='m-4 flex flex-col justify-center items-center'>
        <form action="" id='formk'
            className='m-4 h-44 w-72 flex flex-col justify-center items-center'>
            <input className='mt-2 w-64 px-4 h-8 rounded-2xl border border-black' 
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

            <select onChange={(e) => setTier(e.target.value)}
                className='my-3 px-4 w-44 h-7 rounded-2xl border border-black'>
                <option value="NSSF rates">NSSF rates</option>
                <option value="Tier 1">Tier 1</option>
                <option value="Tier 1 & Tier 2">Tier 1 & Tier 2</option>
                <option value="Old rates">Old rates</option>
                <option value="None">None</option>
            </select>
   
            
            <motion.button whileTap={{scale: .8}} type='button'
              onClick={calculate}
              className="bg-teal w-28 py-1 my-4 rounded-3xl border border-black" >
              Calculate
            </motion.button>
        </form>
        {display &&
        <div className="flex flex-col justify-center items-center z-50 w-64" 
          id="my_payslip" >
          <div className=" w-36 h-10 my-4 text-2xl bg-teal rounded-lg text-center">
              My Payslip
          </div> 
            <div id='payslip_child'>
               SALARY: <span className='text-sm' id="salary">Ksh. {basic_pay}</span>
            </div>
            <div id='payslip_child'>
               NSSF: <span className='text-sm' id="nssf">Ksh. {nssf}</span>
            </div>
            <div id='payslip_child'>
               TAXABLE INCOME: <span className='text-sm' id="taxable">Ksh. {taxable} </span>
            </div>

            <div id='payslip_child'>
                RELIEF: <span className='text-sm' id="relief">Ksh. 2400 </span>
            </div>

            <div id='payslip_child'>
                P.A.Y.E: <span className='text-sm' id="paye">Ksh. {paye} </span>
            </div>

            <div id='payslip_child'>
                HOUSING LEVY: <span className='text-sm' id="levy">Ksh. {levy} </span>
            </div>

            <div id='payslip_child'>
                NETPAY: <span className='text-sm' id="net_amount">Ksh. {net_amount} </span>
            </div>
            
        </div>
        }
    </div>
  )
}

export default Kenya