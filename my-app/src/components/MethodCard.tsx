import React from 'react';

export default function MethodCard(props: {number: number}){
    return (
        <div className="method-card">
            <div className="method-card__number">
                <h1>{props.number}</h1>
            </div>
            <div className="method-card__logo">
                <img alt="logo"></img>
            </div>
        </div>
    )
}
