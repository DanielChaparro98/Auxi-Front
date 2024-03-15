import axios from 'axios'

const token = sessionStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

export class AuthService{
    login(user){
        return axios.post("http://localhost:8080/auth/"+"login",user).then(res =>res.data)
    }

    register(user){
        return axios.post("http://localhost:8080/auth/"+"register",user).then(res => res.data)
    }

}