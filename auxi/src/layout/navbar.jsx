import {React}from "react";
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
    const token = localStorage.getItem('token');
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.replace('');
      };
    
    console.log(token)
    return (
        <div className="nav">
            <Link className="image" >
                <img src="./Logo_Auxi.jpeg" width='200' />
            </Link>
            <nav className="nav-bar">
                <ul className="list">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/">Ofertas</Link>
                    </li>
                    <li>
                        <Link to="/">Quienes Somos</Link>
                    </li>
                    <li>
                        <Link to="/">Contacto</Link>
                    </li>
                    {token ? (
                        // El token está presente, no mostrar el botón de inicio de sesión ni el enlace de registro
                        <>
                        <li>
                            <Link to="/profile">Perfiles</Link>
                        </li>
                        <li>
                            <Link to="/login">
                                <button onClick={handleLogout} className="buttonLogin">Cerrar Sesión</button>
                            </Link>
                        </li>
                        
                        </>

                    ) : (
                        // El token no está presente, mostrar el botón de inicio de sesión y el enlace de registro

                        <>
                            <li>
                                <Link to="/login">
                                    <button className="buttonLogin">Inicio Sesión</button>
                                </Link>
                            </li>

                            <li>
                                <Link to="/register">Registrarse</Link>
                            </li>

                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar