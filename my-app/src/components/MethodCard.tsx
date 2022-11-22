import React from 'react';
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import {queries_api} from "../utils/axios-apis";

export default function MethodCard(props: {number: string, id: string, tipo: string}){
    const navigate = useNavigate();

    let master_card_logo = "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-mastercard-logo-png-vector-download-19.png";
    let visa_logo = "https://www.freepnglogos.com/uploads/visa-blue-png-2.png";
    let american_express_logo = "https://logodownload.org/wp-content/uploads/2014/04/amex-american-express-logo-0.png";
    
    const {number, id, tipo} = props;

    const getLogo = () => {
        const id = props.number.substring(0,1);
        if(tipo === "PSE") return "https://seeklogo.com/images/P/pse-logo-4AE3A79534-seeklogo.com.png";
        switch(id){
            case '2':
                case '5':
                    return master_card_logo;
            case '4':
                return visa_logo;
            default:
                return american_express_logo;
        }
    }    
    
    const getNumberCardWithAsterisk = () => {
        const numberCard = number.substring(0, number.length - 4);
        const asterisk = numberCard.replace(/\d/g, "*");
        return asterisk + number.substring(number.length - 4, number.length);
    };

    const checkCreditAvailable = async () => {
        await queries_api.get(`/api/metodos/${id}`).then((res) => {
            const balance = res.data.balance || 0; 
            Swal.fire({
                title: 'Credit available',
                text: `Your credit available is: ${balance}`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }).catch((err) => {
            if(err.response.data.message === "Servicio de consulta no disponible"){
                Swal.fire({
                    title: 'Oops...',
                    text: 'Service not available',
                    icon: 'error',
                    confirmButtonText: ':('
                })
            }
        })
    }

    const payWithThis = async () => {
        await Swal.fire({
            title: 'Enter the anmount to pay',
            input: 'number',
            showCancelButton: true,
            confirmButtonText: 'Pay',
            showLoaderOnConfirm: true,
            }).then((result) => {
                if(result.isConfirmed){
                    localStorage.setItem('amount', result.value);
                    navigate('/facturation',{ state: { paymentMethod:{cardNumber: number , id: id, tipo: tipo} } });
                }
            })
    }

    return (
        <div className="method-card">
            <div className="method-card__info">
                <img src={getLogo()} alt="logo"></img>
                <h3>{getNumberCardWithAsterisk()}</h3>
            </div>
            <div className="method-card_actions">
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={async () => checkCreditAvailable()}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faCartShopping} onClick={async () => payWithThis()}></FontAwesomeIcon>
            </div>
        </div>
    )
}
