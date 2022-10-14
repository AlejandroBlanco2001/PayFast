import React, { useState, useEffect } from "react";
import PaymentMethod from "./PaymentMethod";
import { Input } from '@chakra-ui/react'

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
        <div className="payment-menu">
            <div className="payment-wrapper">
                <div className="flex-payment-methods">
                    {paymentMethods.map((method,index) => {
                        return <PaymentMethod key={index} image={method['image']} status={method['status']}></PaymentMethod>
                    })}
                </div>
                <div className="discount-box">
                    <div className="discount-box-title"> Cupon </div>
                    <Input 
                        placeholder='Ingrese un codigo de descuento' 
                        size='lg'
                        borderRadius="10px"/>
                </div>
            </div>
        </div>
    );
}