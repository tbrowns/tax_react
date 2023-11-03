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
    const [nssf,setNssf]=useState(1080);
    const [nhif,setNHIF]=useState(false);
    const [lst,setLst]=useState(false);
    const [result,setResult]=useState(0);

    const [first_message,setFirst_message]=useState(false);
    const [second_message,setSecond_message]=useState(false);

    const [invalid,setInvalid] =useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [isLoading2,setIsLoading2]=useState(false);
    
    const [display_payslip,setDisplay]= useState(false);
    const [display_analysis,setDisplay_analysis]= useState(false);

    const [first,setFirst]=useState(0);
    const [second,setSecond]=useState(0);
    const [third,setThird]=useState(0);

    const location=useLocation();

    function setter_nssf(event){
        if(event.target.value==='Tier 1') setNssf(360);
            
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

        if(location.pathname==='/tax_react'){
            temp=Kenya(basic_pay,nssf,nhif);
            setResult(temp);

        }else if(location.pathname==='/Uganda'){
            temp=Uganda(basic_pay,lst);
            setResult(temp);

        }else {
            temp=Tanzania(basic_pay);
            setResult(temp);
        }

    },[basic_pay,lst,nssf,location,nhif])

    const calculate = () => {
        setIsLoading(true);
        setDisplay_analysis(false);

        setTimeout(() => {
            setIsLoading(false);

            if(checkValidity()) setDisplay(true);

            else return;
    
            if(first!==result.total){
                setFirst(result.total);
                setSecond(first);
                setThird(second);
    
            }

            
        }, 3000);
        
    }

    const analysis = () => {
        setIsLoading2(true);
        
        setTimeout(() => {
            setDisplay(false);
            setDisplay_analysis(true);
            setIsLoading2(false);
        }, 4000);
       
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

            {(location.pathname==='/tax_react') &&
             <div className='flex flex-col items-center'>
                <div className='flex  mr-4'>
                <motion.button whileTap={{scale: .8}} type="button"
                        onClick={()=>setFirst_message(!first_message)}>
                            {first_message &&
                                <div className='p-2 bg-lavendar w-52 absolute z-50 rounded-xl'>
                                    NSSF is a mandatory deduction divided into the following categories:<br></br>
                                    *Tier I ~Ksh 360<br></br>
                                    *Tier II ~Ksh 720<br></br>
                                    Organizations may opt out of Tier II if they have an alternative pension scheme
                                </div>
                            }
                            
                            <div className='flex items-center justify-center mx-2 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                           
                    </motion.button>
                    <select onChange={setter_nssf}
                    className='mx-2 my-3 px-4 w-44 h-7 rounded-2xl border border-black'>
                    <option value="NSSF rates">NSSF rates</option>
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 1 & Tier 2">Tier 1 & Tier 2</option>
                </select>
                </div>
                
                <div className='flex my-3'>
                    <motion.button whileTap={{scale: .8}} type="button"
                        onClick={()=>setSecond_message(!second_message)}>
                            {second_message &&
                                <div className='p-2 bg-lavendar w-52 absolute z-50 rounded-xl'>
                                    National Hostpital Insurance Fund is a state cooperation with
                                    madate to provide health care to Kenyans over the age of 18 years.
                                    15% of the NHIF contribution is insurance relief, therefore, only 85%
                                    of NHIF is deducted
                                </div>
                                
                            }
                            
                            <div className='flex items-center justify-center mx-2 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                           
                    </motion.button>
                
                <div className='flex justify-between items-center w-52'>
                    <label htmlFor="lst">NHIF:</label>
                    <input type='checkbox' id='lst'
                        className='accent-teal'
                        onClick={() => setNHIF(!nhif)}
                    />
              
                </div>
                </div>
             </div>
            }

            {location.pathname==='/Tanzania'&&

                <div className='flex justify-center items-center m-3  w-28 h-8  border border-black rounded-2xl'>
                    <motion.button whileTap={{scale: .8}} type="button"
                        className='pr-2 flex justify-center items-center  rounded-2xl h-6 w-28 '
                        onClick={()=>setFirst_message(!first_message)}>
                            {first_message &&
                               <div className='p-2 bg-lavendar w-52 absolute z-50 rounded-xl'>
                                    Every employer in the private sector must contribute to the NSSF.theeployer's 
                                    contibution is 20% of the employe's cash renumeration, however the employee
                                    is entitled to recover upto half of this from the employee.Therefeore, the calculation
                                    use 10% as the rate of NSSF.
                               </div>
                            }
                            
                            <div className='flex items-center justify-center mx-2 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                            <div className=''>NSSF</div>
                    </motion.button>
                </div>

            }

            {location.pathname==='/Uganda' &&
             <div className='flex justify-center items-center flex-col'>
                <div className='flex justify-center items-center m-3  w-28 h-8  border border-black rounded-2xl'>
                    <motion.button whileTap={{scale: .8}} type="button"
                        className=' flex items-center  rounded-2xl h-6 w-20 '
                        onClick={()=>setFirst_message(!first_message)}>
                            {first_message &&
                                <div className='p-2 bg-lavendar w-52 absolute z-50 rounded-xl'>
                                    Every employee MUST pay a monthly constribution of
                                    5% of their gross pay, while the employer's contribution is 10% of
                                    gross pay.
                                </div>
                            }
                            
                            <div className='flex items-center justify-center mx-2 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                            <div className=''>NSSF</div>
                    </motion.button>
                </div>
                <div className='flex my-3'>
                    <motion.button whileTap={{scale: .8}} type="button"
                        onClick={()=>setSecond_message(!second_message)}>
                            {second_message &&
                                <div className='p-2 bg-lavendar w-52 absolute z-50 rounded-xl'>
                                    Local Service Tax(LST) is deducted from the employee's 
                                    gross salary when calculating the amount subjected to PAYE. LST is payable
                                    in the first 4 months of the Goverments's finacial year (i.e July - October)
                                    It is based on the gross salary earning of employees
                                </div>
                            }
                            
                            <div className='flex items-center justify-center mx-2 w-4 h-4 text-xs border border-black rounded-full'>!</div>
                           
                    </motion.button>
                
                
                <div className='flex justify-between items-center w-52'>
                    <label htmlFor="lst">Apply LST:</label>
                    <input type='checkbox' id='lst'
                        className='accent-teal'
                        onClick={() => setLst(!lst)}
                    />
              
                </div>
                </div>

                
              </div>
            }
            
            <motion.button whileTap={{scale: .8}} type='button'
              onClick={calculate}
              id="btn" 
              className='bg-teal'>
                {!isLoading &&
                    <span>Calculate</span>
                }

                {isLoading &&
                    <div id="ring" />
                }

            </motion.button>

            {display_payslip &&
                <motion.button whileTap={{scale: .8}} type='button'
                    onClick={analysis}
                    id="btn" 
                    className='bg-teal'>

                    {!isLoading2 &&
                        <span>Comparison</span>
                    }

                    {isLoading2 &&
                        <div id="ring" />
                    }

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