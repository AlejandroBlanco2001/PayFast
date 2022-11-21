import axios from 'axios';
const buy_api = axios.create({
    withCredentials: true,
    baseURL: process.env.BUY_URL || 'http://localhost:5000',
});
const queries_api = axios.create({
    withCredentials: true,
    baseURL: process.env.QUERIES_URL || 'http://localhost:8080',
});
const security_api = axios.create({
    withCredentials: true,
    baseURL: process.env.SECURITY_URL || 'http://localhost:8000',
});
export {
    buy_api,
    queries_api,
    security_api,
};