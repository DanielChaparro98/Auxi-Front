import React, { useEffect, useState } from "react";
import { ExperienceService } from "../services/ExperienceService";
import { useJwt } from "react-jwt";
import '../styles/Profile.css'

const token = localStorage.getItem('token');

function Profile(){

    const { decodedToken, isExpired } = useJwt(token);
    console.log(decodedToken)

    const [profile,setProfile] =useState({
        number:'',
        name:'',
        phone:'',
        study_type:'',
        shdule:'',
        zone:'',
        experiences:[''],
        studies:['']
    })

    const [experiences,setExperiences]=useState([])
    const [studies,setStudies]=useState([])

    const experienceService = new ExperienceService()

    useEffect(()=>{
        ( ()=>  LoadExperiences())()
    },[])

    async function LoadExperiences(){
        if(decodedToken != null){
            const response = experienceService.listFilter(decodedToken.sub)
            setExperiences(response.data)
            console.log(response.data)
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setProfile((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleExperienciaChange = (e) => {
        const { name, value } = e.target;
    
        setProfile((prevData) => ({
          ...prevData,
          experiences: {
            ...prevData.experiences,
            [name]: value,
          },
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validar y procesar los datos antes de agregarlos a la tabla
        if (profile.number && profile.name && profile.phone) {
          setExperiences((prevData) => [...prevData, profile]);
          // También puedes enviar los datos al servidor aquí
        }
      };


    return(
        <div>

      <form onSubmit={handleSubmit}>
        <div className='profile-container'>
        <h2>Creación de Perfil</h2>
        <div className='number'>
          <input type="text" placeholder="Número" name="number" value={profile.number} onChange={handleChange} />
        </div>
        
        <div className='name'>
          <input type="text" placeholder="Nombre" name="name" value={profile.name} onChange={handleChange} />
        </div>

        <div className='phone'>
          <input type="text" placeholder="Telefono" name="phone" value={profile.phone} onChange={handleChange} />
        </div>

        <div className='study_type'>
          <input type="text" placeholder="Tipo de Estudio" name="study_type" value={profile.study_type} onChange={handleChange} />
        </div>    

        <div className='shedule'>
          <input type="text" placeholder="Horario" name="shdule" value={profile.shdule} onChange={handleChange} />
        </div>
        
        <div className='zone'>
          <input type="text" placeholder="Zona" name="zone" value={profile.zone} onChange={handleChange} />
        </div>

        </div>
         <label>Nombre de la experiencia:
          <input
            type="text"
            name="nombre"
            value={profile.experiences.nombre}
            onChange={handleExperienciaChange}
          />
        </label>

        <button type="submit">Guardar</button>
      </form>
      {/*
      <h2>Datos en la tabla</h2>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Nombre</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((item, index) => (
            <tr key={index}>
              <td>{item.numero}</td>
              <td>{item.nombre}</td>
              <td>{item.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
    
    )
}


export default Profile