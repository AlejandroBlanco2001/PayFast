import React from 'react';
import Svg from 'react-inlinesvg';

export default function ProfileCard(props : {
    image: string,
    name: string,
    username: string,
    email: string,
}){

    const {image, name, username, email} = props;

    return(
        <div className="profileCard">
            <div className="profile-pic-frame">
                <Svg src={image}></Svg> 
            </div>
            <div className="profile-tittle">Full name</div>
            <div className="profile-value">{name}</div>
            <div className="profile-tittle">Username</div>
            <div className="profile-value">{username}</div>
            <div className="profile-tittle">Email</div>
            <div className="profile-value">{email}</div>
        </div>
    )
}