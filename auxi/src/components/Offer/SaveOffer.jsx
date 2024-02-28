import React,{ useEffect, useState }  from "react";
import { useJwt } from "react-jwt";

const token = sessionStorage.getItem('token')

function Offer(){

    var time = new Date().getTime()
    const{ decodeToken, isExpired} = useJwt('token')
    console.log(decodeToken)
    
    const[offer,setOffer] = useState({
        id:'',
        name: '',
        description:'',
        state:'',
        date:'',
        timeBegin: '',
        timeFinal: ''
    })

    


    return(
        <div></div>
    )
}