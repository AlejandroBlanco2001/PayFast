import React from 'react';
import { faCreditCard, faPiggyBank, faEllipsis, faBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MenuTab(props: any = {opt: Number}){
    return(
            <div className="Tabs_menu">
                <div className="Tabs_menu_item hvr-bob">
                    <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon>
                        Credit Card
                    </div>
                <div className="Tabs_menu_item hvr-bob">
                    <FontAwesomeIcon icon={faPiggyBank}></FontAwesomeIcon>
                        Debit Card
                    </div>
                <div className="Tabs_menu_item hvr-bob">
                    <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
                    Other
                </div>
            </div>
    )
}