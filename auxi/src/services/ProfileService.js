import axios from 'axios';

const token = localStorage.getItem('token')

export class ProfileService{

    save(profile){
        axios.post("http://localhost:8080/"+"save",profile,{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.data)
    }

    list(){
        axios.get("http://localhost:8080/"+"list",{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.data)
    }
}