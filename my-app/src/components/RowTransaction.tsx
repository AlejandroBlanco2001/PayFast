import React, {useState} from 'react';

export default function RowTransaction(props: {
    id: string,
    fecha: string,
    monto: string,
    sede: string,
    franquicia: string,
    nroCoutas: string,
    userId: string,
    metodoId: string,
    estado: string,
    isHeader : boolean,
}){

    const {id, fecha, monto, sede, franquicia, nroCoutas, userId, metodoId, estado, isHeader} = props;

    const isaHeader = () => {
        if(isHeader === true){
            return(
                <div className="row row-header">
                    <div className="table-header"> Date </div>
                    <div className="table-header"> State </div>
                    <div className="table-header"> Amount </div>
                    <div className="table-header"> Fee </div>
                    <div className="table-header"> Payment Method </div>
                </div>
            )
        }
        return (            
            <div className="row">
                <div>{fecha}</div>
                <div>{estado}</div>
                <div>{monto}</div>
                <div>{nroCoutas}</div>  
                <div>{metodoId}</div>
            </div>
        );
        
    }


    return(
        <div>
            {isaHeader()}        
        </div>
    )
}