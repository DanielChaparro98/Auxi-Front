import { TextField } from "@mui/material";
import React,{ useEffect, useState }  from "react";
import { useJwt } from "react-jwt";
import { Calendar } from 'primereact/calendar';

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

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setOffer((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return(
        <form>
            <div className="offer-container">
                <h2>Creación Oferta</h2>
                <TextField id="standard-basic" label="Nombre" variant="standard" value={offer.name} onChange={handleChange}/>
                <TextField id="standard-multiline-static" label="Descripción" multiline rows={4} variant="standard" value={offer.description} onChange={handleChange}/>
                <Calendar id="buttondisplay" value={handleChange} maxDate={time} showIcon/>
                <Calendar id="timeBegin" onChange={handleChange} timeOnly/>
                <Calendar id="timeFinal" onChange={handleChange} timeOnly />
            </div>
        </form>

    )
}