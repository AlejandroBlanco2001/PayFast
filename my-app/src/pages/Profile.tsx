import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation, useNavigation } from 'react-router-dom';

import ProfileCard from '../components/ProfileCard';
import PaymentTable  from '../components/PaymentTable';
import MethodsTable from '../components/MethodsTable';
import { Button } from '@chakra-ui/react';



const api = axios.create({
    withCredentials: true,
})

export default function Profile(){

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.user_id;

    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [methods, setMethods] = useState([]);
    const [avatar, setAvatar] = useState("");

    useEffect(()  => {
        // Get the user data
        api.get(`http://localhost:8000/api/users/${id}`).then(async (res) => {
            localStorage.setItem('user', id);
            setUser(res.data.user);
        });
        // Get random image of the username
        api.get('https://avatars.dicebear.com/api/miniavs/elpapitodelbackend.svg', {withCredentials: false}).then((res) => setAvatar(res.data))
        // Get payment methods of the user 
        api.get('http://localhost:8080/api/metodos/user', { params: {
            "id" : id
        }}).then((res) => setTransactions(res.data));
        // Get transactions of the user
        api.get(`http://localhost:5000/api/transaccion/user/${id}`, { params: {
            "id": id    
        }}).then((res) => {setMethods(res.data)});
    },[])

    return (
        <div className="profile">
            <div className="profile-section">
                <ProfileCard image={avatar} email={user['email']} name={user['name']} username={user['username']}></ProfileCard>
                <PaymentTable transactions={transactions} ></PaymentTable>
                <MethodsTable methods={methods}></MethodsTable>
            </div>
            <Button colorScheme='linkedin' onClick={() => navigate('/payment') }>Pay Fast</Button>
        </div>
    )
}