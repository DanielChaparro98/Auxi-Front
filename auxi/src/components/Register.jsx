import React,{ useState } from 'react';
import '../styles/Register.css'
import { AuthService } from "../services/AuthService";
import { useNavigate } from 'react-router-dom';


function Register() {
    const [formulario, setFormulario] = useState({
        email: '',
        password: '',
        role: 'client', // Valor predeterminado para la lista desplegable
      });

      const authService = new AuthService();
      const navigate = useNavigate();

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormulario((prevFormulario) => ({
          ...prevFormulario,
          [name]: value,
        }));
      };

      const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await authService.register(formulario)
        console.log('Formulario enviado:', formulario);
        navigate('/');
        window.location.replace('');
      };

  return(
    <div className="form-container">
        <br />
        <br />
        <br />
        <br />
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className='form-gorup'>
          <input
            type="text"
            name="nombre"
            placeholder='Nombre'
            value={formulario.nombre}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className='form-gorup'>
          <input
            type="text"
            name="apellido"
            placeholder='Apellido'
            value={formulario.apellido}
            onChange={handleChange}
          />
        </div> */}
        <br />
        <div className='form-gorup'>
          <input
            id='email'
            type="email"
            name="email"
            placeholder='Email'
            value={formulario.email}
            onChange={handleChange}
          />
        </div>
        {/* <div className='form-gorup'>
          <input
            type="tel"
            name="telefono"
            placeholder='Telefono'
            value={formulario.telefono}
            onChange={handleChange}
          />
        </div> */}
        <br />
        <div className='form-gorup'>
          <input
            id='password'
            type="password"
            name="password"
            placeholder='Contraseña'
            value={formulario.password}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className='form-gorup'>
          <select
            id='slcTipo'
            name="role"
            value={formulario.role}
            onChange={handleChange}
          > 
            <option value="" disabled selected hidden>Selecciona un tipo de usuario</option>   
            <option value="client">Cliente</option>
            <option value="professional">Profesional</option>
          </select>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

        <button id='btnRegister' type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;