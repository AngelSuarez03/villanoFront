import {Button, TextField, Box} from "@mui/material";
import axios from 'axios'
import { useState } from 'react';
import './Perfil.css'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";


function MiPerfil() {
    //!FUNCIÓN DE PROCESAR FORMULARIO
    const [datosFormulario, setDatosFormulario]=useState({
        correo:window.localStorage.getItem("Usuario"),
        pais:'',
        contrasena:'',
    });

    const[habilitaInput, setHabilitaInput]=useState(true);
    const correoUsuario=localStorage.getItem("Usuario");
    const navigate = useNavigate();


    //!METODO PARA OBTENER LOS DATOS DEL USUARIO
    const datosUsuario=async()=>{
        try {
            const respuesta=await axios.get("http://localhost:4567/datosUsuario",{params:{correo: correoUsuario}});
            return respuesta.data;
        } catch (error) {
        console.log(error);
        }
    }
    //!MÉTODO PARA HACER LA PETICIÓN PARA ELIMINAR AL USUARIO
    const peticionEliminar=async()=>{
        try {
            const respuesta= await axios.get("http://localhost:4567/eliminarPerfil",{params:{correo:correoUsuario}});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    //!FUNCIÓN PARA OBTENER DATOS DEL USUARIO EN USANDO LA FUNCIÓN ANTERIOR
    const UsuarioData=async()=>{
            try {
                const respuesta=await datosUsuario();
                const nombreUsuarioSesion=respuesta.nombre;
                const apellidosUsuarioSesion=respuesta.apellidos;
                window.localStorage.setItem("Nombre",nombreUsuarioSesion);
                window.localStorage.setItem("Apellidos",apellidosUsuarioSesion);
                window.localStorage.setItem("Pais",respuesta.pais);
            } catch (error) {
                console.log(error);
            }
    }
    UsuarioData();
    const atrasBtn=()=>{
        // window.open("../Legendary.html","_self");
        navigate('/Index');
    }

    
//!METODO PARA REALIZAR LA ELIMINACIÓN DEL USUARIO
    const procesarEliminacion=async()=>{
        try {
            const respuesta=await peticionEliminar();
            Swal.fire({
                title: "Eliminación Exitosa",
                text: "El perfil se eliminó exitósamente",
                background:"#560916",
                color:"white",
                imageUrl: "https://static.wikia.nocookie.net/esgta/images/f/f2/Legendary_Motorsport_Actual.png/revision/latest?cb=20221231194359",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Legendary MotorSport"
              });
            console.log("RESPUESTA DE ELIMINACIÓN", respuesta.data);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    //!VARIABLES PARA OBTENER DATOS DEL USUARIO DEL LOCALSTORAGE MOSTRADOS EN PANTALLA
    const nombreUsuarioSesion=window.localStorage.getItem("Nombre");
    const apellidoUsuarioSesion=window.localStorage.getItem("Apellidos");

    //!FUNCIÓN PARA HABILITAR LOS INPUTS USANDO UN HOOK
    const editarFormulario=()=>{
        setHabilitaInput(false);
    }

    
    const cambiosFormulario=(evento)=>{
        // console.log(evento.target);
        const {name,value} =evento.target;
        setDatosFormulario({
            ...datosFormulario, //! SE GUARDA LA COPIA DEL VALOR DE LA VARIABLE 
            [name]: value //! Y SE HACE LA ACTUALIZACIÓN DE LOS DATOS
            //? name y value son propiedades de los textfields abajo
        })
    }

    const actualizarDatos=async(evento)=>{
    evento.preventDefault();
    console.log("datos recuperados del formulario: ",datosFormulario);
        try{
            const respuesta=await axios.get("http://localhost:4567/actualizarPerfil",{params:datosFormulario});
            console.log("Respuesta filas",respuesta.data.filas);
            if(respuesta.data.filas){
                Swal.fire({
                    title: "Actualización Exitosa",
                    text: "Deberás iniciar sesión para ver cambios",
                    background:"#560916",
                    color:"white",
                    imageUrl: "https://static.wikia.nocookie.net/esgta/images/f/f2/Legendary_Motorsport_Actual.png/revision/latest?cb=20221231194359",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Legendary MotorSport"
                  });
            navigate('/');
            }
        }catch(error){
            console.log("Error actualizacion peticion ",error);
        }
    }

    return(
        <>
        <button className='back_button' onClick={atrasBtn}>Atrás</button>
        {/* <div className='container'> */}
        {/* <button className='back_button'>Atrás</button> */}
        <img src="../Imagenes/Legendary.WEBP" alt="" className='container_logo'/>
            <div className='user_container'>
                <h1 className='user_container_title'>Datos del Usuario</h1>
                <div className='user_container_form'>
                    <form action="" className='user_form' onSubmit={actualizarDatos}>
                        <input type="text" name="correo" id="correo" value={correoUsuario}  onChange={cambiosFormulario} className="input" disabled />

                        <select name="pais" id="pais" className='paises' onChange={cambiosFormulario} disabled={habilitaInput}>
                        <option value="none" className='pais'>Pais anteior: {window.localStorage.getItem("Pais")}</option>
                        <option value="Mexico" className='pais' name='pais'>Mexico</option>
                        <option value="EU" className='pais' name='pais'>Estados Unidos</option>
                        </select>

                        <input type="password" name="contrasena" id="contrasena" required className='input' placeholder='Contraseña' onChange={cambiosFormulario} disabled={habilitaInput}/>
                        <input type="submit" value="Enviar" className='user_modifybtn' disabled={habilitaInput}/>

                    </form> 

                    <button className='user_modifybtn' onClick={editarFormulario}>Modificar Perfil</button>
                    <button className='user_container_deletebtn' onClick={procesarEliminacion}>Eliminar mi perfil</button>
                </div>

                <div className='user_container_avatar'>
                    <img src="https://imgur.com/VttZs23" alt="imgusuario" className='user_avatar'/>
                    <h3 className='user_container_name'>{nombreUsuarioSesion+" "+apellidoUsuarioSesion}</h3>
                </div>
            </div>
        {/* </div> */}
        </>
    )
}
export default MiPerfil;