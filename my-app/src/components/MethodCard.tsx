import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import axios from 'axios';

const api = axios.create({
    withCredentials: true,
})
export default function MethodCard(props: {number: string, id: string}){

    let master_card_logo = "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-mastercard-logo-png-vector-download-19.png";
    let visa_logo = "https://www.freepnglogos.com/uploads/visa-card-logo-9.png";
    let american_express_logo = "https://logodownload.org/wp-content/uploads/2014/04/amex-american-express-logo-0.png";
    
    const {number, id} = props;

    const getLogo = () => {
        const id = props.number.substring(0,1);
        switch(id){
            case '2':
                case '5':
                    return master_card_logo;
            case '3':
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
        await api.get(`http://localhost:8080/api/metodos/${id}`).then((res) => {
            Swal.fire({
                title: 'Credit available',
                text: `Your credit available is: ${res.data.balance}`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        }).catch((err) => {
            if(err.message === "Servicio de consulta no disponible"){
                Swal.fire({
                    title: 'Oops...',
                    text: 'Service not available',
                    icon: 'error',
                    confirmButtonText: ':( ok'
                })
            }
        })
    }

    return (
        <div className="method-card">
            <div className="method-card__info">
                <img src={getLogo()} alt="logo"></img>
                <h3>{getNumberCardWithAsterisk()}</h3>
            </div>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={async () => {checkCreditAvailable()}}></FontAwesomeIcon>
        </div>
    )
}
