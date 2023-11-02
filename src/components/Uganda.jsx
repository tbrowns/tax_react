import { Calculator } from './Calculator.jsx';

export function Uganda(basic_pay,lst) {
  const nssf= basic_pay*0.05;
  
  let lst_value=0;

  if(lst){
    if(basic_pay>1000000 ) lst_value=100000/4
    else if(basic_pay>900000) lst_value=90000/4
    else if(basic_pay>800000) lst_value=80000/4
    else if(basic_pay>700000) lst_value=70000/4
    else if(basic_pay>600000) lst_value=60000/4
    else if(basic_pay>500000) lst_value=40000/4
    else if(basic_pay>400000) lst_value=30000/4
    else if(basic_pay>300000) lst_value=20000/4
    else if(basic_pay>200000) lst_value=10000/4
    else if(basic_pay>100000) lst_value=5000/4

  }else lst_value=0;
  
  const percentages=[0,10,20,30,40]
  const upper_limit=[235000,100000,75000,9590000,100000000]
  const paye=Calculator(basic_pay,percentages,upper_limit);
  const net_amount=basic_pay-(paye+nssf+lst_value);

  const result ={
    income: basic_pay,
    taxable: basic_pay,
    nssf: nssf,
    paye: paye,
    lst: lst_value,
    total: net_amount,

  }

  return result
}