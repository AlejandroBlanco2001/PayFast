import react, { useState } from 'react'

export default function PaymentMethod(props: { image: string, status: boolean, name: string }) {
    
  const { image, status, name} = props;
  return (
    <div className="PaymentMethodBox">
      <img src={image} alt={name}></img>
    </div>
  );
}