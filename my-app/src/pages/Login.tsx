import React, {useState} from 'react';
import {security_api} from "../utils/axios-apis";
import { useNavigate } from "react-router-dom";
import InputC from '../components/InputC';
import Swal from 'sweetalert2';
import { Button } from '@chakra-ui/react'


const KeyImage = require('../assets/keyImage.png');

export default function Login(){

    const [data, setData] = useState({});
    const navigate = useNavigate();
    localStorage.setItem('isLogged', "0");


    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };
    
    const sendForm = (event) =>{
        event.preventDefault();
        console.log("Sending data ..." + data['fuser'] + " " + data['fpass']);
        security_api.post("/api/auth/login",{
            username: data['fuser'],
            password: data['fpass']
        }).then((res) =>  {
            console.log(res)
            const id = res.data["id"];
            localStorage.setItem('isLogged', "1");
            navigate('/profile', {state: {"user_id": id}, replace:true});
        }).catch(e => {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please check your username and your password',
        })});
    }

    return(
        <div className="login-section">
            <div className="decorative-container">
                <img src={KeyImage} alt="Placeholder key"></img>
            </div>
            <div className="info-container">
                <div className="login-form">
                    <h1>Login</h1>
                    <span>Welcome to PayFast, a new fast, safe and easy way to pay </span>
                    <form onSubmit={sendForm} method='post' id="loginForm">
                        <InputC placeholder="Username" name="fuser" type="text" onChange={handleInputChange}></InputC>
                        <InputC placeholder="Password" name="fpass" type="password" onChange={handleInputChange}></InputC>
                        <a href="/register">Create an account</a>
                        <Button type="submit" colorScheme='linkedin'>Login</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}