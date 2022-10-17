import React, { useState, useEffect } from "react";
import Bill from "./Bill";
import PaymentMethod from "./PaymentMethod";
import { Input } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCardAlt, faPiggyBank, faEllipsis } from '@fortawesome/free-solid-svg-icons'


export default function PaymentMenu() {
    let master_card_logo = "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-mastercard-logo-png-vector-download-19.png";
    
    const [paymentMethods, setPaymentMethods] = useState([
        {'image': master_card_logo, 'status': true},{'image': master_card_logo, 'status': true},{'image': master_card_logo, 'status': true},
        {'image': master_card_logo, 'status': true},{'image': master_card_logo, 'status': true},{'image': master_card_logo, 'status': true}]);

    // Query to get the images of the methods and their current status 
    /*
        useEffect(() => {
            fetch("https://localhost:44348/api/paymentmethods")
                .then(response => response.json())
                .then(data => setPaymentMethods(data));
        });
    */

    return (
        <div className = "main-wrapper"> 
            <div className="payment-menu">
                <div className="payment-menu-options">
                    <div className="tab-option hvr-bob">
                        <FontAwesomeIcon icon={faCreditCardAlt}/>                    
                        <h5> Credit Card </h5>
                    </div>
                    <div className="tab-option hvr-bob">
                        <FontAwesomeIcon icon={faPiggyBank}/>                    
                        <h5>  Debit Card </h5>
                    </div>
                    <div className="tab-option hvr-bob">
                        <FontAwesomeIcon icon={faEllipsis}/>                    
                        <h5> Other </h5>
                    </div>
                </div>
                <div className="payment-wrapper">
                    <div className="flex-payment-methods">
                        {paymentMethods.map((method,index) => {
                            return <PaymentMethod key={index} image={method['image']} status={method['status']}></PaymentMethod>
                        })}
                    </div>
                    <div className="discount-box">
                        <div className="discount-box-text">
                            <h4>Cupon</h4>
                            <span>Ingrese algun codigo de descuento</span>
                        </div>
                        <Input 
                            placeholder='Ingrese un codigo de descuento' 
                            size='lg'
                            borderRadius="10px"/>
                    </div>
                </div>
            </div>
            <Bill></Bill>
        </div>
    );
}