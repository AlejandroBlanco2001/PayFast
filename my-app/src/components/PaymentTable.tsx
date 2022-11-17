import React, {useState} from 'react';
import RowTransaction from './RowTransaction'

export default function PaymentTable(){
    
    const [payments, setPayments] = useState([
        {'id': '1', 'fecha': '2021-05-01', 'monto': '100', 'sede': 'Lima', 'franquicia': 'Visa', 'nroCoutas': '1', 'userId': '1', 'metodoId': '1', 'estado': 'Aprobado'},
    ]);

    return(
        <div>
            <div className="table">
                <div>
                    {payments.map((data,index) => {
                        return <RowTransaction key={index} id={data['id']} estado={data['estado']} fecha={data['fecha']} franquicia={data['franquicia']
                        } monto={data['monto']} nroCoutas={data['nroCoutas']} sede={data['sede']} userId={data['userId']} metodoId={data['metodoId']}></RowTransaction>
                    })}
                </div>
            </div>
        </div>
    )
}