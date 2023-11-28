import axios from 'axios';

const token = localStorage.getItem('token');

export class StudiesService{

    save(studies){
        return axios.post("http://localhost:8080/"+"save",studies, {
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.data)
    }

    list(){
        return axios.get("http://localhost:8080/"+"list",{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.data)
    }

    listFilter(email){
        return axios.get("http://localhost:8080/"+"listFilter",email,{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.data)
    }

}