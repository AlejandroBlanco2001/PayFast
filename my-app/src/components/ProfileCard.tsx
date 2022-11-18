import React from 'react';
import Svg from 'react-inlinesvg';

export default function ProfileCard(props : {
    image: string,
    name: string,
    username: string,
    email: string,
    number: number,
}){

    const {image, name, username, email, number} = props;

    return(
        <div className="profileCard">
            <Svg src={image}></Svg> 
            <div>Full name</div>
            <div>{name}</div>
            <div>Username</div>
            <div>{username}</div>
            <div>Email</div>
            <div>{email}</div>
            <div>Number of payment methods</div>
            <div>{number.toString()}<div>
        </div>
    )
}