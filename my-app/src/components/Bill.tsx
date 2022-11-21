import React, { useState, useEffect} from 'react';
import Cards from 'react-credit-cards';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import 'react-credit-cards/lib/styles.scss'


export default function Bill(props: {company: string, orderNumber: string, product: string, total: number, info: any}) {
    const {company, orderNumber, product, total, info} = props;

    const integerPart = total.toString().substring(0,6);
    const decimalPart = total.toString().substring(6,8);

    const number= info.cardNumber || '5145876364470839'
    const [name, setName] = useState('John Doe');
    const expire= info.expire || '12/18'
    const cvc= info.cvc || '321'

    const iva = total * 0.19;

    return(
        <div className="bill-container">
            <div className="CardSection">
                <Cards
                    number={number}
                    name={name}
                    expiry={expire}
                    cvc={cvc}
                ></Cards>
            </div>
            <div className="bill-info-container">
                <div className="bill-info">
                    <div className="category">Compañia</div>
                    <div className="value">{company}</div>
                    <div className="category">Numero de Orden</div>
                    <div className="value">{orderNumber}</div>
                    <div className="category">Producto</div>
                    <div className="value">{product}</div>
                    <div className="category">IVA (19%)</div>
                    <div className="value">{iva}</div>
                </div>
            </div>
            <hr className="divider"></hr>
            <div className="bill-cost-container">
                <div className="bill-cost">
                    <div>El total a pagar es</div>
                    <div className="bill-price">
                        <div className="integer">{integerPart}</div>
                        <div className="decimal">.{decimalPart}</div>
                    </div>
                </div>
                <div className="bill-cost-icon">
                    <FontAwesomeIcon icon={faMoneyBill1Wave}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}