import react, { useState } from 'react'

export default function PaymentMethod(props: { image: string, status: boolean, name: string, onClick: any}) {
    
  
  const { image, status, name, onClick} = props;
  return (
    <div className="PaymentMethodBox" onClick={onClick}>
      <img src={image} alt={name}></img>
    </div>
  );
}