import axios from 'axios';
import React, {useState, useEffect} from 'react'
import ProfileCard from '../components/ProfileCard';
import PaymentTable  from '../components/PaymentTable';
import { useLocation } from 'react-router-dom';



const api = axios.create({
    withCredentials: true,
})

export default function Profile(){

    const location = useLocation();
    const id = location.state.user_id;

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState("");

    useEffect(()  => {
        console.log(id);
        api.get(`http://localhost:8000/api/users/${id}`).then(async (res) => {
            setUser(res.data.user);
        });
        api.get('https://avatars.dicebear.com/api/miniavs/elpapitodelbackend.svg', {withCredentials: false}).then((res) => {
                setAvatar(res.data);
        })
    },[])

    return (
        <div>
            <ProfileCard image={avatar} email={user['email']} name={user['name']} username={user['username']} number={4}></ProfileCard>
            <PaymentTable></PaymentTable>
        </div>
    )
}