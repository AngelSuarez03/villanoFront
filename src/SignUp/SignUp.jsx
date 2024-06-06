import { useState } from 'react';
import './SignUp.css';
import { Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom'

import UsuarioAgregado from '../Popups/usuarioAgregado';
import ErrorAgregaUsuario from '../Popups/ErrorAgregaUsuario';

function SignUp() {

    //!HOOKS PARA EL BOTÓN DE CARGANDO Y PARA LOS DATOS DEL FORMULARIO
    const [cargando, setCargando] = useState(false);


    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        pais: '',
        contrasena: ''
    });

    //!MÉTODO PARA HACER LA PETICIÓN AL SERVIDOR PARA INGRESAR DATOS 
    const hacerPeticion = async () => {
        try {
            const respuesta = await axios.post("http://localhost:4567/registro", datosFormulario);
            console.log(respuesta.data);
            return respuesta.data;
        } catch (error) {
            throw error;
        }
    }

    const [mostrarPopup, setMostrarPopup] = useState(false);
    const abrirPopup = () => {
        setMostrarPopup(true);
    }

    const [mostrarErrorPopup, setMostrarErrorPopup] = useState(false);
    const abrirPopUpError = () => {
        setMostrarErrorPopup(true);
    }

    const procesarFormulario = async (evento) => {
        evento.preventDefault();
        console.log("Datos recuperados del formulario: ", datosFormulario);
        setCargando(true);
        try {
            const respuesta = await hacerPeticion();
            setCargando(false);
            // return respuesta;
            if (respuesta === 'usuario agregado') {
                // console.log("Usuario agregado
                abrirPopup();
            } else {
                console.log("Error al agregar el usuario");
                abrirPopUpError();
            }
        } catch (error) {
            setCargando(false);
        }
    }

    const cambiosFormulario = (evento) => {
        // console.log(evento.target);
        const { name, value } = evento.target;
        setDatosFormulario({
            ...datosFormulario, //! SE GUARDA LA COPIA DEL VALOR DE LA VARIABLE 
            [name]: value //! Y SE HACE LA ACTUALIZACIÓN DE LOS DATOS
            //? name y value son propiedades de los textfields abajo
        })
    }

    return (
        <>
            <div className="container">
                <div className="image_container">

                </div>
                <div className="Signup_container">
                    <img src="../Imagenes/Legendary.WEBP" alt="" className="img_Legendary" />
                    <h1 className="title">Registrate</h1>

                    <form action="" onSubmit={procesarFormulario}>

                        <input type="text" placeholder="Nombre" required className='textFieldDatos' name='nombre' onChange={cambiosFormulario} />
                        <input type="text" placeholder="Apellidos" required className='textFieldDatos' name='apellidos' onChange={cambiosFormulario} />
                        <input type="email" placeholder="Correo Electrónico" required className='textFieldDatos' name='correo' onChange={cambiosFormulario} />
                        <select name="pais" id="pais" required className='paises' onChange={cambiosFormulario}>
                            <option value="" disabled selected hidden className='pais'>Selecciona tu pais</option>
                            <option value="Mexico" className='pais' name='pais'>México</option>
                            <option value="EU" className='pais' name='pais'>Estados Unidos</option>
                        </select>
                        <input type="password" name="contrasena" id="contrasena" required placeholder="Contraseña" className='textFieldDatos' onChange={cambiosFormulario} />
                        <input type="submit" value="Registrarme" className='botonSesion' disabled={cargando} />
                    </form>
                    <Link to="/" className="link_SingUp">Iniciar Sesión</Link>

                    <Box m={5}>
                        {mostrarPopup && <UsuarioAgregado onClose={() => setMostrarPopup(false)} />}
                    </Box>

                    <Box m={5}>
                        {mostrarErrorPopup && <ErrorAgregaUsuario onClose={() => setMostrarPopup(false)} />}
                    </Box>
                </div>

            </div>


        </>

    )
}

export default SignUp;
