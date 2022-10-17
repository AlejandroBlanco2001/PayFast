import React, { useState, useEffect} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'


export default function Bill(){

    const [number, setNumber] = useState('4901 4901 4901 4901');
    const [name, setName] = useState('John Doe');
    const [expiry, setExpiry] = useState('12/18');
    const [cvc, setCVC] = useState('321');
    const [company, setCompany] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [product, setProduct] = useState('');
    const [iva, setIVA] = useState('');

    return(
        <div className="bill">
            <Cards
                cvc={cvc}
                expiry={expiry}
                name={name}
                number={number}
            />
            <div className="bill-info">
                <div className="bill-info-text">
                    <h4>Compañia</h4>
                    <h4>Compañia</h4>
                    <h4>Numero de orden</h4>
                    <h4>Numero de orden</h4>
                    <h4>Producto</h4>
                    <h4>Producto</h4>
                    <h4>IVA</h4>
                    <h4>IVA</h4>
                </div>
            </div>
        </div>
    )
}