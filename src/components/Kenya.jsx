import React, { useEffect } from 'react'
import { useState } from 'react';
import {motion} from "framer-motion";

import History from './History.jsx'
import Spacer from './Spacer.jsx';
import Compare from './Compare.jsx';

function Kenya() {
    const [basic_pay,setBasic_pay] = useState(0);
    const [nssf,setNssf] = useState(1080);
    const [paye,setPaye] = useState(0);
    
    const [display_analysis,setDisplay_analysis]= useState(false);
    const [display,setDisplay]= useState(false);
    const [invalid,setInvalid] =useState(false);

    const [first,setFirst]=useState(0);
    const [second,setSecond]=useState(0);
    const [third,setThird]=useState(0);

    const taxable=basic_pay-nssf;
    const levy = (0.015*basic_pay);
    const net_amount= taxable-(paye+levy);

    function checkValidity(){
        if(basic_pay<=nssf || basic_pay>10000000 || isNaN(basic_pay)){
            setInvalid(true);
            return false;

        }else{
            setInvalid(false);
            return true;

        }
    }

    function setter_nssf(event){
        const tier=event.target.value;

        if(tier==='Tier 1'){
            setNssf(360);

        }else if(tier==='Tier 1 & Tier 2'){
            setNssf(1080);
            
        }else if(tier==='Old rates'){
            setNssf(200);

        }else{
            setNssf(0);

        }
    }

    useEffect (() => {
        setDisplay(false);
        setDisplay_analysis(false);
        setInvalid(false);

        let gross_tax=0;
        let tax=taxable;
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

        if(gross_tax>2400){
            setPaye(gross_tax-2400);
        }else{
            setPaye(10);

        }
        
    }, [basic_pay,taxable]);

    const calculate = () => {
        setDisplay_analysis(false);

        if(checkValidity()) {
            setDisplay(true);

        }else{
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
    <div className='mt-32'>
        <div className=''>
           <History one={first} two={second} three={third}/>
        </div>
        <div className='m-2 flex flex-wrap justify-center items-center'>
        <form action="" id='formk'
            className='m-4 py-4 min-h-min w-72 flex flex-col justify-center items-center'>
            <input className='mt-2 w-64 px-4 h-8 rounded-2xl border border-black' 
                type='text'
                placeholder='Enter basic salary'
                required={basic_pay}
                onChange={(e)=>setBasic_pay(e.target.value)}
                
            />

            <label className={` text-red-600 bg-red-200 text-center w-52 px-4 h-6 rounded-xl border border-red-600
                            ${invalid ? 'block':'hidden'}`} >
                Please enter a valid amount!
                
            </label>

            <select onChange={setter_nssf}
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
            </div>}

        {display && <div id="my_payslip" >
            <div className=" w-36 h-10 my-4 text-2xl bg-teal rounded-lg text-center">
                My Payslip

            </div> 

            <div id='payslip_child'>
               SALARY: <span className='flex text-sm' id="salary">Ksh. <Spacer value={basic_pay} /></span>

            </div>

            <div id='payslip_child'>
               NSSF: <span className='flex text-sm' id="nssf">Ksh. <Spacer value={nssf} /></span>

            </div>

            <div id='payslip_child'>
               TAXABLE INCOME: <span className='flex text-sm' id="taxable">Ksh. <Spacer value={taxable} /> </span>
            </div>

            <div id='payslip_child'>
                RELIEF: <span className='flex text-sm' id="relief">Ksh. <Spacer value={2400} /> </span>
            </div>

            <div id='payslip_child'>
                P.A.Y.E: <span className='flex text-sm' id="paye">Ksh. <Spacer value={paye} /></span>
            </div>

            <div id='payslip_child'>
                HOUSING LEVY: <span className='flex text-sm' id="levy">Ksh. <Spacer value={levy} /> </span>

            </div>

            <div id='payslip_child'>
                NETPAY: <span className='flex text-sm' id="net_amount">Ksh. <Spacer value={net_amount} /> </span>

            </div>
        </div>}
        </div>
    </div>

  );
}

export default Kenya