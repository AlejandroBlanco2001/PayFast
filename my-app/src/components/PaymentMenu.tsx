import PaymentMethod from '../components/PaymentMethod';
import MenuTab from '../components/MenuTab';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Input, InputGroup } from '@chakra-ui/react'

const api = axios.create({
    withCredentials: true,
})

export default function PaymentMenu(){
    
    let master_card_logo = "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-mastercard-logo-png-vector-download-19.png";
    let visa_logo = "https://www.freepnglogos.com/uploads/visa-card-logo-9.png";
    let american_express_logo = "https://logodownload.org/wp-content/uploads/2014/04/amex-american-express-logo-0.png";

    const [paymentMethods, setPaymentMethods] = useState([
      {'image': master_card_logo, 'status': true, 'name': 'visa'},{'image': visa_logo, 'status': true, 'name': 'visa'},
        {'image': american_express_logo, 'status': true, 'name': 'american'}, {'image': master_card_logo, 'status': true, 'name': 'visa'},
        {'image': master_card_logo, 'status': true, 'name': 'visa'}, {'image': master_card_logo, 'status': true, 'name': 'visa'}]);

    useEffect(() => {
        api.get('http://localhost:8080/api/metodos/user')
        .then(res => {
            console.log(res.data);
            setPaymentMethods(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    return(
        <div className="PaymentMenu">
          <MenuTab></MenuTab>
          <div className="PaymentBoxContainer">
            <div className='PaymentBoxGrid'>
              {paymentMethods.map((method,index) => {
                return <PaymentMethod key={index} image={method.image} status={method.status} name={method.name}></PaymentMethod>
              })}
            </div>
            <div className='PaymentCupon'>
              <div className="PaymentCuponText">
                  <div className='PaymentCuponTitle'>Bonificación</div>
                  <span>Ingrese algun codigo de descuento</span>
              </div>
                <InputGroup>
                  <Input placeholder='ELPRECIOESCORRECTO' />
                </InputGroup>
            </div>
          </div>
        </div>
    );
}