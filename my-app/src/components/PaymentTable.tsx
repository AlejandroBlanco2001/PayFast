import React, {useState} from 'react';
import RowTransaction from './RowTransaction'

export default function PaymentTable(props: {transactions: any}) {
    
    const [transactions, setTransactions] = useState(props.transactions);

    const transactionsList = () => {
        if(transactions.length > 0){
            return transactions.map((data: any, index) => {
                return <RowTransaction key={index} id={data['id']} estado={data['estado']} fecha={data['fecha']} franquicia={data['franquicia']} 
                monto={data['monto']} nroCoutas={data['nroCoutas']} sede={data['sede']} userId={data['userId']} metodoId={data['metodoId']}></RowTransaction>
            })
        }
        return <div>You dont have transactions</div>
    }

    return(
        <div>
            <h1>Transactions</h1>
            <div className="table">
                {transactionsList()}
            </div>
        </div>
    )
}