import React, {useState} from 'react';
import {security_api} from '../utils/axios-apis';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import InputC from '../components/InputC';
import {Button} from '@chakra-ui/react';

const KeyImage = require('../assets/keyImage.png');

export default function SignUp(){

    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setData({
        ...data,
        [event.target.name]: event.target.value,
        });
    };

    const sendForm = (event) => {
        event.preventDefault();
        console.log("Sending data ..." + data['femail'] + " " + data['fpass'] + " " + data['fname'] + " " + data['fuser'] + " " + data['fdir'] + " " + data['fphone']);
        security_api.post("/api/auth/register",{
            username: data['fuser'],
            password: data['fpass'],
            name: data['fname'],
            email: data['femail'],
            direccion: data['fdir'],
            nrotelefono: data['fphone']
        })
        .then((res) => {
            console.log("Taking you to login page");
            navigate('../', {replace:true});
        }).catch(e => {Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please check your that your username and email are not already in use, the password have at least 6 characters and the email is valid',
        })});
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
                        <InputC placeholder="Direction" name="fdir" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Phone" name="fphone" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Email" name="femail" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Username" name="fuser" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Password" name="fpass" type="password" onChange={handleInputChange}></InputC>
                        <a href="/">Go back to login</a>
                        <Button type="submit" colorScheme='linkedin'>SIgn Up</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}