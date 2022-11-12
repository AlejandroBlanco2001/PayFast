import React, {useState} from 'react';
import axios from 'axios';

export default function SignUp(){

    const [data, setData] = useState({});

    const handleInputChange = (event) => {
        setData({
        ...data,
        [event.target.name]: event.target.value,
        });
    };

    const sendForm = (event) => {
        event.preventDefault();
        console.log("Sending data ..." + data['femail'] + " " + data['fpass'] + " " + data['fname'] + " " + data['fusername']);
        axios.post("http://localhost:9000/api/auth/register",{
            username: data['fusername'],
            password: data['fpass'],
            name: data['fname'],
            email: data['femail']
        })
        .then((res) => {
            console.log(res);
        }).then((res) => {
            console.log("SIRVIO, usuario creado");
        }).catch(e => console.log(e));
    }

    return (
        <div className="login-form">
            <form onSubmit={sendForm} method='post' id="loginForm">
                <div className="login-title">Crear usuario</div>
                <div className="login-input">
                    <input onChange={handleInputChange} name="fusername" type="text" placeholder="Username"></input>
                </div>     
                <div className="login-input">
                    <input onChange={handleInputChange} name="fname" type="text" placeholder="Name"></input>
                </div>
                <div className="login-input">
                    <input onChange={handleInputChange} name="femail" type="text" placeholder="Correo Electronico"></input>
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