import React from 'react';
import { useLocation } from 'react-router-dom';

import Spacer from './Spacer.jsx';
import { Currency } from './Currency';

function Payslip(props) {
    const location=useLocation();

    let house_levy=0;
    let nhif=0;
    let lst=0;

    if(location.pathname==='/'){
        house_levy=props.myObject.levy;
        nhif=props.myObject.nhif;

    }else if(location.pathname==='/Uganda') lst=props.myObject.lst;

  return (
    <div id='my_payslip'>
        <div className=" w-36 h-10 my-4 text-2xl bg-teal rounded-lg text-center">
                My Payslip

            </div> 

            <div id='payslip_child'>
               SALARY: <span className='flex text-sm' id="salary">{Currency()} <Spacer value={props.myObject.income} /></span>
            </div>

            <div id='payslip_child'>
               NSSF: <span className='flex text-sm' id="nssf">{Currency()} <Spacer value={props.myObject.nssf} /></span>
            </div>

            <div  className={`flex-col justify-center my-1 items-center text-lg ${lst===0? 'hidden':'flex' }`}>
               LST: <span className='flex text-sm' id="nssf">{Currency()} <Spacer value={lst} /></span>
            </div>

            <div id='payslip_child'>
               TAXABLE INCOME: <span className='flex text-sm' id="taxable">{Currency()} <Spacer value={props.myObject.taxable} /> </span>
            </div>

            <div className={`flex-col justify-center my-1 items-center text-lg ${house_levy===0? 'hidden':'flex' }`}>
                RELIEF: <span className='flex text-sm' id="relief">{Currency()} <Spacer value={2400} /> </span>
            </div>

            <div id='payslip_child'>
                P.A.Y.E: <span className='flex text-sm' id="paye">{Currency()} <Spacer value={props.myObject.paye} /></span>
            </div>

            <div className={`flex-col justify-center my-1 items-center text-lg ${house_levy===0? 'hidden':'flex' }`}>
                HOUSING LEVY: <span className='flex text-sm'  id="levy">{Currency()} <Spacer value={house_levy} /> </span>
            </div>
            <div className={`flex-col justify-center my-1 items-center text-lg ${nhif===0? 'hidden':'flex' }`}>
                NHIF: <span className='flex text-sm'  id="levy">{Currency()} <Spacer value={nhif} /> </span>
            </div>

            <div id='payslip_child'>
                NETPAY: <span className='flex text-sm' id="net_amount">{Currency()} <Spacer value={props.myObject.total} /> </span>
            </div>
    </div>
  )
}

export default Payslip