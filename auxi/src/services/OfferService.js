import axios from "axios";

const sessionToken = sessionStorage.getItem('token');
var parseToken = '';
var token = ''
if (sessionToken) {
    parseToken = JSON.parse(sessionToken);
    token = parseToken.token;
    console.log(token)
}

export class OfferService{

    saveOffer(offer){
        return axios.post("http://localhost:8080/offers/save",offer,{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.data)
    }
}