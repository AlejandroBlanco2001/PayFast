import react, { useState } from 'react';


export default function PaymentMethod(props: { image: string, status: boolean }) {
  
  const { image, status } = props;

  return (  
  <div className="payment-form">
        <img src={image} alt="Payment method"></img>
    </div>
  );
}