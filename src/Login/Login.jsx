// import {Button, TextField, Box} from "@mui/material";
import axios from 'axios'
import './Login.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    
    const [cargando, setCargando]=useState(false);
    const [datosFormulario, setDatosFormulario]=useState({
        correo:'',
        contrasena:''
    })
    //?SE LIMPIA EL ALMACENAMIENTO LOCAL DEL NAVEGADOR QUE ALOJA EL USUARIO DE LA SESION
    window.localStorage.clear();
    //!METODO DE PETICIÓN PARA VERIFICAR REGISTRO DE USUARIO (LOGIN)
const peticionLogin=async()=>{
        try{
            const respuesta=await axios.post("http://localhost:4567/validacion",datosFormulario);
            console.log("Respuesta de peticion: "+respuesta);
            return respuesta;
        }catch(error){
            throw error;
        }
    }

const procesarFormulario=async(evento)=>{
    evento.preventDefault();
    console.log("datos recuperados del formulario: ",datosFormulario);
    try{
        const respuesta=await peticionLogin();
        // console.log("Respuesta de LOGIN: ",respuesta.data);
        if(respuesta.data==='Usuario correcto'){
            // window.open("../Legendary.html","_self");
            navigate('/Index');
            window.localStorage.setItem('Usuario',datosFormulario.correo);
        }else{
            alert("Usuario o contraseña incorrecto");
        }
    }catch(error){
        setCargando(false);
    }
}


//!METODO PARA DETECTAR LOS CAMBIOS EN EL FORMULARIO
    const cambiosFormulario=(evento)=>{
        const {name,value}=evento.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]:value
        })
    }

    return(
    <>
    <div className="container">
        <div className="Login_container">
        <img src="../Imagenes/Legendary.WEBP" alt="" className="img_Legendary"/>
             <h1 className="title">Inicio de Sesión</h1>
            <form action="" onSubmit={procesarFormulario}>
                <input type="text" className="textFieldDatos" placeholder="Usuario" onChange={cambiosFormulario} name='correo'/>
                <input type="password" className="textFieldDatos" placeholder="Contraseña" onChange={cambiosFormulario} name='contrasena'/>
                <input type="submit" value="Iniciar Sesión" className="botonSesion" disabled={cargando}/>
             </form>
             <Link to="/SignUp" className="link_SingUp">Registrarme</Link>
            {/* <a href="./SingUp.html" className="link_SingUp">Registrarme</a> */}
        </div>

        <div className="image_login_container">
        </div>

    </div>


    </>
    );
}
export default Login;