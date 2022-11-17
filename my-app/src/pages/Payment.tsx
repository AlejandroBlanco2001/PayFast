import React from 'react';
import PaymentMenu from "../components/PaymentMenu";
import Bill from "../components/Bill";
import { Navigate } from 'react-router-dom';


export default function Payment() {


    const isLogged = () => {
        if(localStorage.getItem('isLogged') === "1"){
            return (        
                <div className='payment-section'>
                    <PaymentMenu></PaymentMenu>
                    <Bill></Bill>
                </div>
            )
        }
        return <Navigate to="/"></Navigate>
    }

    return(
        <div>       
            {isLogged()}
        </div>
    )
}