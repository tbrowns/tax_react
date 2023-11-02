import { useLocation } from 'react-router-dom';

export function Currency(){
    const location=useLocation();

    let currency='Ksh';

    if(location.pathname==="/Uganda")  currency="Ugx";
        
    else if(location.pathname==="/Tanzania") currency="Tsh";

    return currency;
}