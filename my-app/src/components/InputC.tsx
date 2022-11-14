import React from 'react';

export default function InputC(props: {placeholder: string, name: string, onChange: any, type: string}) {

    const {placeholder, name, onChange, type} = props;
    return (
        <div className="input-custom">
            <div className="text-input">
                <h4>{placeholder.toUpperCase()}</h4>
                <input type={type} placeholder={'Your ' + placeholder} name={name} onChange={onChange} ></input>
            </div>
            <hr></hr>
        </div>
    )    
}