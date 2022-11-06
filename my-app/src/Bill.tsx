import React, { useState, useEffect} from 'react';
import Cards from 'react-credit-cards';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import 'react-credit-cards/es/styles-compiled.css'


export default function Bill(){

    const [number, setNumber] = useState('5145876364470839');
    const [name, setName] = useState('John Doe');
    const [expiry, setExpiry] = useState('12/18');
    const [cvc, setCVC] = useState('321');
    const [company, setCompany] = useState('Pagame');
    const [orderNumber, setOrderNumber] = useState('420');
    const [product, setProduct] = useState('Mountain Drew');
    const [total, setTotal] = useState(500);
    const [iva, setIVA] = useState(total*0.19);

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
                    <h4>{company}</h4>
                    <h4>Numero de orden</h4>
                    <h4>{orderNumber}</h4>
                    <h4>Producto</h4>
                    <h4>{product}</h4>
                    <h4>IVA</h4>
                    <h4>{iva}</h4>
                </div>
                <hr className="dashed-divider"></hr>
                <div className="bill-total-pay">
                    <h5>Tienes que pagar</h5>
                    <h5>{total}</h5>
                    <FontAwesomeIcon icon={faMoneyBill}/>                    
                </div>
            </div>
        </div>
    )
}