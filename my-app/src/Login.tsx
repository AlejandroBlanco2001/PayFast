import React, {useState} from 'react';
import axios from 'axios';

export default function Login(){

    const [data, setData] = useState({});

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const sendForm = (event) => {
        event.preventDefault();
        console.log("Sending data ..." + data['fuser'] + " " + data['fpass']);
        axios
        .post("http://localhost:9000/api/auth/login",{
            username: data['fuser'],
            password: data['fpass']
        }).then((res) => {
            console.log("LOGUEADO");
        });
    }
    return(
        <div className="login-form">
            <form onSubmit={sendForm} method='post' id="loginForm">
                <div className="login-title">Iniciar Sesión</div>
                <div className="login-input">
                    <input onChange={handleInputChange} name="fuser" type="text" placeholder="Correo Electronico"></input>
                </div>
                <div className="login-input">
                    <input onChange={handleInputChange} name="fpass" type="password" placeholder="Contraseña"></input>
                </div>
                <div className="login-button">
                    <button type="submit" form="loginForm" value="Submit">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    )
}