import React, { useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import Bill from "../components/Bill";
import Swal from 'sweetalert2';
import {Navigate, useNavigate, useLocation} from 'react-router-dom';
import {buy_api} from "../utils/axios-apis";

function getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

export default function Payment() {

    const [paymentMethod, setPaymentMethod] = React.useState({});
    
    const navigate = useNavigate();
    const location = useLocation();
    const checkCard = (number) => number.substring(0,1) === '4' || number.substring(0,1) === "5" || number.substring(0,1) === "3" ? true : false;

    const bill = location.state.bill;
    
    const form = <PaymentForm onChange={setPaymentMethod}></PaymentForm>;

    const isLogged = () => {
        if(localStorage.getItem('isLogged') === "1"){
            return (        
                <div className='payment-section'>
                    {form}
                    <Bill {...bill} info={paymentMethod}></Bill>
                </div>
            )
        }
        return <Navigate to="/"></Navigate>
    }

    return(
        <div>       
            {isLogged()}
        </div>
    )
}