import axios from 'axios'

const baseUrl = "http://localhost:8080/"

export class  AuthService{

    login(user){
        return axios.post(this.baseUrl+"login",user).then(res =>res.data)
    }

    register(user){
        return axios.post(this.baseUrl+"register",user).then(res => res.data)
    }

}