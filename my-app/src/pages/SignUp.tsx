import React, {useState} from 'react';
import axios from 'axios';
import InputC from '../components/InputC';
import {Button, ButtonGroup} from '@chakra-ui/react';

const KeyImage = require('../assets/keyImage.png');

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
        console.log("Sending data ..." + data['femail'] + " " + data['fpass'] + " " + data['fname'] + " " + data['fuser']);
        axios.post("http://localhost:9000/api/auth/register",{
            username: data['fuser'],
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

    return(    
        <div className="login-section">
            <div className="decorative-container">
                <img src={KeyImage} alt="Placeholder key"></img>
            </div>
            <div className="info-container">
                <div className="register-form">
                    <div>
                        <h1>Sign Up</h1>
                        <span>Welcome to PayFast, a new fast, safe and easy way to pay </span>
                    </div>
                    <form onSubmit={sendForm} method='post' id="loginForm">
                        <InputC placeholder="Name" name="fname" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Email" name="femail" type="password" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Username" name="fuser" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Password" name="fpass" type="text" onChange={handleInputChange}></InputC>
                        <Button type="submit" colorScheme='linkedin'>SIgn Up</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}