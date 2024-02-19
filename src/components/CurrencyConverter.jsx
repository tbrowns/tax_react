import { useState } from 'react';
import axios from 'axios';

export function CurrencyConverter(fromCurrency, toCurrency, initial_amount) {
    if(fromCurrency ==='Tanzania') fromCurrency='TZS';
    else if(fromCurrency ==='Uganda') fromCurrency='UGX';
    else if(fromCurrency === 'tax_react'||fromCurrency ==='tax_react/') fromCurrency='KES';
    else if(toCurrency ==='Tanzania') toCurrency='TZS';
    else if(toCurrency ==='Uganda') toCurrency='UGX';
    else if(toCurrency === 'tax_react'||toCurrency ==='tax_react/') toCurrency='KES';

    const [new_amount, setNew_amount] = useState(0);

    const options = {
      method: 'GET',
      url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
      params: {
        format: 'json',
        from: fromCurrency,
        to : toCurrency,
        amount: initial_amount
      },
      headers: {
        'X-RapidAPI-Key': 'ad2774c5d6msh5764aba86300cd0p14d9c4jsn6bdca470964d',
        'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
      }
    };
      
      const fetchData = async () => {
        try {
            const response = await axios.request(options);
            const children = Object.values(response.data.rates);
            const exchangeData = Number(children[0].rate_for_amount);
            setNew_amount(exchangeData);

        } catch (error) {
            setNew_amount(-1);
            console.log(error);
        }
      }
      fetchData();

  return new_amount;
}
