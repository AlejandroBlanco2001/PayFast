import React from 'react';

export default function RowTransaction(props: {
    id: string,
    fecha: string,
    monto: string,
    sede: string,
    franquicia: string,
    nroCuotas: string,
    userId: string,
    metodoId: string,
    estado: string,
    isHeader : boolean,
}){

    const {id, fecha, monto, sede, franquicia, nroCuotas, userId, metodoId, estado, isHeader} = props;

    const isaHeader = () => {
        if(isHeader === true){
            return(
                <div className="row row-header">
                    <div className="table-header"> ID </div>
                    <div className="table-header"> Date </div>
                    <div className="table-header"> Amount </div>
                    <div className="table-header"> Site </div>
                    <div className="table-header"> Franchise </div>
                    <div className="table-header"> # Fee </div>
                    <div className="table-header"> User ID </div>
                    <div className="table-header"> Method ID </div>
                    <div className="table-header"> Status </div>
                </div>
            )
        }
        return (            
            <div className="row">
                <div>{id}</div>
                <div>{fecha.substring(0,10)}</div>
                <div>{monto}</div>
                <div>{sede}</div>
                <div>{franquicia}</div>
                <div>{nroCuotas}</div> 
                <div>{userId}</div>
                <div>{metodoId}</div>
                <div>{estado}</div>
            </div>
        );
        
    }


    return(
        <div>
            {isaHeader()}        
        </div>
    )
}