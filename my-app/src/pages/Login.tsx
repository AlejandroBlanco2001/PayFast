import React, {useState} from 'react';
import axios from 'axios';
import InputC from '../components/InputC';
import { Button, ButtonGroup } from '@chakra-ui/react'


const KeyImage = require('../assets/keyImage.png');

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
        <div className="login-section">
            <div className="decorative-container">
                <img src={KeyImage} alt="Placeholder key"></img>
            </div>
            <div className="info-container">
                <div className="login-form">
                    <h1>Login</h1>
                    <span>Welcome to PayFast, pay fast, safe and easy </span>
                    <form onSubmit={sendForm} method='post' id="loginForm">
                        <InputC placeholder="Username" name="fuser" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Password" name="fpass" type="password" onChange={handleInputChange}></InputC>
                        <Button type="submit" colorScheme='linkedin'>Login</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}