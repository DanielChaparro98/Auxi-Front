import React,{ useState } from 'react';
import '../styles/Register.css'

function Register() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        tipoUsuario: 'cliente', // Valor predeterminado para la lista desplegable
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormulario((prevFormulario) => ({
          ...prevFormulario,
          [name]: value,
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica de envío del formulario
        console.log('Formulario enviado:', formulario);
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
            name="tipoUsuario"
            value={formulario.tipoUsuario}
            onChange={handleChange}
          > 
            <option value="" disabled selected hidden>Selecciona un tipo de usuario</option>   
            <option value="cliente">Cliente</option>
            <option value="profesional">Profesional</option>
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