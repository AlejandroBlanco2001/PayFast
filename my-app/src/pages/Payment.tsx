import React from 'react';
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
    
    const checkInputs = (paymentMethod) => {
        const [month, year] = paymentMethod['expire'].split("/");
        if((paymentMethod['cardNumber'].length === 15 || paymentMethod['cardNumber'].length === 16)&& (paymentMethod['cvc'].length === 3 || paymentMethod['cvc'].length === 4) && (month <= 12 && month >= 1)){
            if(checkCard(paymentMethod['cardNumber'])){
                return "success";
            }else{
                return "error_card";
            }
        }
        return "error_data";        
    }


    const sendToProcess = () => {
        buy_api.post('/api/transaccion').then((res) => {
            let validation = checkInputs(paymentMethod);
            if(validation === "success"){
                navigate('/facturation', {state: {bill: bill, paymentMethod: paymentMethod}});
            }else if (validation === "error_card"){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid card, remeber that we only use VISA, Master Card and American express credit cards',
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Alguno de los datos de la tarjeta no es correcto',
                })
            }
        }).catch((err) => {
            if(err.response.data.message === "Servicio transferencia not available"){
                Swal.fire({
                    title: 'Oops...',
                    text: 'Service not available',
                    icon: 'error',
                    confirmButtonText: ':('
                })
            }
        });
    }

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