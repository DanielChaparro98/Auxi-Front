import React, { useState } from "react";
import { useJwt } from "react-jwt";
import '../../styles/Support.css';


function SaveSupport(){

    const token = sessionStorage.getItem('token')
    const{ decodeToken, isExpired} = useJwt('token')
    console.log(decodeToken)

    const [support, setSupport] = useState({
        id:'',
        title:'',
        date:'',
        description:'',
        status:''
    })

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setSupport((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return(
        <form>
            <div className="support-container">

            </div>
        </form>
    )
}

export default SaveSupport