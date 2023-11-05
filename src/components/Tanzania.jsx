import { Calculator } from './Calculator.jsx';

export function Tanzania(basic_pay) {
  const nssf= basic_pay*0.1;
  const taxable = basic_pay-nssf;
  
  let percentages=[0,8,20,25,30]
  let upper_limit=[270000,250000,240000,240000,10000000]

  let paye=Calculator(taxable,percentages,upper_limit);

  const net_amount = taxable-paye;

  const result ={
    income: basic_pay,
    taxable: taxable,
    nssf: nssf,
    paye: paye,
    total: net_amount,

  }

  return result
   
}