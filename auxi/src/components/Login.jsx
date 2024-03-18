import React, { useState } from "react";
import '../styles/Login.css'
import { AuthService } from "../services/AuthService";
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate();
    
    const authService = new AuthService();

    const handleSubmit = async(event) => {
        event.preventDefault()
        const user = {email,password,role}
        try{
            var response = await authService.login(user)
            console.log(response)
            sessionStorage.setItem('token', JSON.stringify(response));
            sessionStorage.setItem('email', JSON.stringify(email));
            console.log('correo'+email)
            console.log(response)
            navigate('/');
            window.location.replace('');
        }catch(err){
            alert("Error Iniciando Sesión")
        }
    }
    
    return(
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
    )
} 

export default Login