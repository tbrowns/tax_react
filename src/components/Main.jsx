import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { motion } from "framer-motion";

import History from './History.jsx';
import Compare from './Compare.jsx';
import Payslip from './Payslip.jsx';
import {Kenya} from './Kenya.jsx'
import {Uganda} from './Uganda.jsx'
import {Tanzania} from './Tanzania.jsx'

function Main() {
    const [basic_pay,setBasic_pay]=useState(0);
    const [nssf,setNssf]=useState(1080)
    const [lst,setLst]=useState(false);
    const [result,setResult]=useState(0);

    const [invalid,setInvalid] =useState(false);
    const [display_payslip,setDisplay]= useState(false);
    const [display_analysis,setDisplay_analysis]= useState(false);

    const [first,setFirst]=useState(0);
    const [second,setSecond]=useState(0);
    const [third,setThird]=useState(0);

    const location=useLocation();

    function setter_nssf(event){
        const tier=event.target.value;

        if(tier==='Tier 1') setNssf(360);

        else if(tier==='Tier 1 & Tier 2') setNssf(1080);
            
        else if(tier==='Old rates') setNssf(200);
            
        else setNssf(0);
            
    }

    function checkValidity(){
        if(basic_pay<=nssf || isNaN(basic_pay)){
            setInvalid(true);
            return false;

        }else{
            setInvalid(false);
            return true;

        }
    }

    useEffect(()=>{
        let temp;

        setDisplay(false);
        setDisplay_analysis(false);
        setInvalid(false);

        if(location.pathname==='/'){
            temp=Kenya(basic_pay,nssf);
            setResult(temp);

        }else if(location.pathname==='/Uganda'){
            temp=Uganda(basic_pay,lst);
            setResult(temp);

        }else {
            temp=Tanzania(basic_pay);
            setResult(temp);
        }

    },[basic_pay,lst,nssf,location])

    const calculate = () => {
        setDisplay_analysis(false);
        
        if(checkValidity()) setDisplay(true);

        else return;
    
        if(first!==result.total){
          setFirst(result.total);
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

            {location.pathname==='/' &&
             <div>
                <select onChange={setter_nssf}
                    className='my-3 px-4 w-44 h-7 rounded-2xl border border-black'>
                    <option value="NSSF rates">NSSF rates</option>
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 1 & Tier 2">Tier 1 & Tier 2</option>
                    <option value="Old rates">Old rates</option>
                    <option value="None">None</option>
                </select>
             </div>
            }

            {location.pathname==='/Tanzania'&&
             <div>
                <div className='flex text-center items-center m-3  w-20 h-8  border border-black rounded-2xl'>
                    <motion.button whileTap={{scale: .8}} type="button"
                        className='ml-2 flex items-center  rounded-2xl h-6 w-20 '>
                        <div className=''>NSSF</div>
                        <div className='flex items-center justify-center ml-1 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                    </motion.button>
                </div>
             </div>
            }

            {location.pathname==='/Uganda' &&
             <div className='flex justify-center items-center flex-col'>
                <div className='flex justify-between items-center  mt-4 w-60'>
                    <label htmlFor="lst">Apply LST:</label>
                    <input type='checkbox' id='lst'
                        className='accent-teal'
                        onClick={() => setLst(!lst)}
                    />
              
                </div>

                <div className='flex text-center items-center m-3  w-20 h-8  border border-black rounded-2xl'>
                    <motion.button whileTap={{scale: .8}} type="button"
                        className='ml-2 flex items-center  rounded-2xl h-6 w-20 '>
                        <div className=''>NSSF</div>
                        <div className='flex items-center justify-center ml-1 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                    </motion.button>
                </div>
              </div>
            }
            
            <motion.button whileTap={{scale: .8}} type='button'
              onClick={calculate}
              className="btn" >
              Calculate

            </motion.button>

            {display_payslip &&
                <motion.button whileTap={{scale: .8}} type='button'
                    onClick={analysis}
                    className="btn" >
                    Comparison

                </motion.button>
            }
        </form>

        {display_analysis && 
            <div>
                <Compare amount={basic_pay}/>
            </div>
        }

        {display_payslip && 
            <div>
                <Payslip myObject={result}/>
            </div>
        }

        </div>
    </div>
  )
}

export default Main