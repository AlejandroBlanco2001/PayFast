import React from 'react';

export default function MethodCard(props: {number: string}){

    let master_card_logo = "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-mastercard-logo-png-vector-download-19.png";
    let visa_logo = "https://www.freepnglogos.com/uploads/visa-card-logo-9.png";
    let american_express_logo = "https://logodownload.org/wp-content/uploads/2014/04/amex-american-express-logo-0.png";


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
    

    const {number} = props;
    return (
        <div className="method-card">
            <div className="method-card__number">
                <h1>{number.substring(number.length - 4)}</h1>
            </div>
            <div className="method-card__logo">
                <img src={getLogo()} alt="logo"></img>
            </div>
        </div>
    )
}
