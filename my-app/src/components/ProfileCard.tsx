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
            <div>{name}</div>
            <div>{username}</div>
            <div>{email}</div>
            <div>{number}</div>
        </div>
    )
}