import axios from 'axios';



const api = axios.create ({
    baseUrl: 'https://ativacao.youcast.tv.br/api/v1/internal',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
    }
})


export default api;