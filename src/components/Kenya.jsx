import { Calculator } from './Calculator.jsx';

export function Kenya(basic_pay,nssf,nhif) {
    const taxable=basic_pay-nssf;
    const house_levy = basic_pay*0.015;
    let nhif_amount=0;

    if(nhif){
      if(basic_pay>=100000) nhif_amount=1700;
      else if(basic_pay>=90000) nhif_amount=1600;
      else if(basic_pay>=80000) nhif_amount=1500;
      else if(basic_pay>=70000) nhif_amount=1400;
      else if(basic_pay>=60000) nhif_amount=1300;
      else if(basic_pay>=50000) nhif_amount=1200;
      else if(basic_pay>=45000) nhif_amount=1100;
      else if(basic_pay>=40000) nhif_amount=1000;
      else if(basic_pay>=35000) nhif_amount=950;
      else if(basic_pay>=30000) nhif_amount=900;
      else if(basic_pay>=25000) nhif_amount=850;
      else if(basic_pay>=20000) nhif_amount=750;
      else if(basic_pay>=15000) nhif_amount=600;
      else if(basic_pay>=12000) nhif_amount=500;
      else if(basic_pay>=8000)  nhif_amount=400;
      else if(basic_pay>=6000)  nhif_amount=300;
      else nhif_amount=150

    }
    
    let percentages=[10,25,30,32.5,35]
    let upper_limit=[24000,8333,467667,300000,800000]

    let gross_tax=Calculator(taxable,percentages,upper_limit);
    let paye=0;

    if(gross_tax>2400) paye=gross_tax-2400;

    const net_amount= taxable-(paye+house_levy+(0.85*nhif_amount));
        
    const result ={
        income: basic_pay,
        taxable: taxable,
        nssf: nssf,
        paye: paye,
        nhif:nhif_amount,
        levy: house_levy,
        total: net_amount,

    }
    
  return result
}
