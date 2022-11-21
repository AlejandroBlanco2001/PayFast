import React from 'react';
import PaymentMenu from "../components/PaymentMenu";
import PaymentForm from '../components/PaymentForm';
import Bill from "../components/Bill";
import {Navigate, useNavigate, useLocation} from 'react-router-dom';

function getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

export default function Payment() {

    const [paymentMethod, setPaymentMethod] = React.useState({});
    const form = <PaymentForm onChange={setPaymentMethod}></PaymentForm>;
    
    const products = ["hola", "hola2", "hola3"];
    
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const bill = location.state.bill;

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