import axios from "axios";
import { AUTH_TOKEN_KEY } from "../constants";

const Api = axios.create({
    // baseURL: 'https://app-estudos.herokuapp.com/api'
    baseURL: 'http://localhost:3333/api'
})

Api.interceptors.request.use((config) => {

    const token = localStorage.getItem(AUTH_TOKEN_KEY)

    if(token) {
        config.headers = {
            'Authorization': `Bearer ${token}`
        }
    }

    return config;
}, (error) => {
    return Error(error)
})

export default Api;