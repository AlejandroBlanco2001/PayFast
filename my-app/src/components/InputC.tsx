import React from 'react';

export default function InputC(props: {placeholder: string, name: string, onChange: any}) {

    const onFocus = (event) => {
        event.target.style = {
            "background-color": "red"
        }
    }

    const {placeholder, name, onChange} = props;
    return (
        <div className="input-custom">
            <div className="text-input">
                <h4>{placeholder}</h4>
                <input type="text" placeholder={placeholder} name={name} onChange={onChange} onFocus={onFocus} ></input>
            </div>
            <hr></hr>
        </div>
    )    
}