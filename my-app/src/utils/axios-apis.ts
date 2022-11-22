import axios, { Axios, AxiosRequestConfig } from 'axios';

// add an interceptor to handle the request and add the user to the body of the request

const addUserId = (config: AxiosRequestConfig ) => {
    const user = localStorage.getItem('user');
    if (user) {
        
        if(config.method === 'post' || config.method === 'put') {
            config.data = {...config.data, id: user};
        } else if(config.method === 'get') {
            config.params = {...config.params, id:user};
        }
    }
    return config;
};
const buy_api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000" || "https://buy-api-production.up.railway.app" ,
});
const queries_api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080" || "https://queries-api-production.up.railway.app" ,
});
const security_api = axios.create({
  withCredentials: true,
  baseURL:
    "http://localhost:8000" || "https://security-api-production.up.railway.app" ,
});

queries_api.interceptors.request.use(addUserId);
security_api.interceptors.request.use(addUserId);
buy_api.interceptors.request.use(addUserId);

export {
    buy_api,
    queries_api,
    security_api,
};