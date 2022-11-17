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
    estado: string
}){

    const {id, fecha, monto, sede, franquicia, nroCoutas, userId, metodoId, estado} = props;

    return(
        <div className="row">
            <div>{fecha}</div>
            <div>{monto}</div>
            <div>{nroCoutas}</div>
            <div>{estado}</div>
            <div>{metodoId}</div>
        </div>
    )
}