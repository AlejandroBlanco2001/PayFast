import React from 'react';
import PaymentMenu from "../components/PaymentMenu";
import Bill from "../components/Bill";

export default function Payment() {
    return(
        <div className='payment-section'>
            <PaymentMenu></PaymentMenu>
            <Bill></Bill>
        </div>
    )
}