import { Calculator } from './Calculator.jsx';

export function Kenya(basic_pay,nssf) {
    const taxable=basic_pay-nssf;
    const house_levy = basic_pay*0.015;
    
    let percentages=[10,25,30,32.5,35]
    let upper_limit=[24000,8333,467667,300000,800000]

    let gross_tax=Calculator(taxable,percentages,upper_limit);
    let paye=0;

    if(gross_tax>2400) paye=gross_tax-2400;

    const net_amount= taxable-(paye+house_levy);
        
    const result ={
        income: basic_pay,
        taxable: taxable,
        nssf: nssf,
        paye: paye,
        levy: house_levy,
        total: net_amount,

    }
    
  return result
}
