export function Calculator(taxable,percentages,upper_limit) {
    let i=0;
    let gross_tax=0;

    while(i<5){
        if(taxable<upper_limit[i]||i===4){
            gross_tax+=(percentages[i]/100)*taxable;
            break;

        }else{
            gross_tax+=(percentages[i]/100)*upper_limit[i];
            taxable-=upper_limit[i]
            i++;

        }
    }

  return gross_tax;
}
