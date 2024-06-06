import { Button, Box } from "@mui/material";
import React, { useState } from 'react';
import axios from 'axios'
import "./PantallaCoche.css"
import CompraRealizada from "../Popups/CompraRealizada.jsx"
import CompraNoRealizada from "../Popups/CompraNoRealizada.jsx"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

function PantallaCoche(props) {
    const navigate = useNavigate();
    const nombre = window.localStorage.getItem("nombreCoche")
    const [cargando, setCargando] = useState(false);
    const [estadisticasCoche, setEstadisticasCoche] = useState(null);
    const [visualizacionCoche, setVisualizacionCoche] = useState(null);
    const [descripcionCoche, setDescripcionCoche] = useState(null);
    const [datosCoche, setDatosCoche] = useState({
        nombreUsuario: window.localStorage.getItem("Usuario"),
        nombreCoche: window.localStorage.getItem("nombreCoche"),
        color: null,
        precio: window.localStorage.getItem("precioCoche")
    })

    const [colorSeleccionado, setColorSeleccionado] = useState(false); // Estado para verificar si se ha seleccionado algún color
    let colorSeleccionadoo = '';

    const [mostrarPopup, setMostrarPopup] = useState(false);

    const abrirPopup = () => {
        setMostrarPopup(true);
    }

    const [mostrarErrorPopup, setMostrarErrorPopup] = useState(false);

    const abrirPopUpError = () => {
        setMostrarErrorPopup(true);
    }

    const atrasBtn = () => {
        // window.open("../Legendary.html", "_self");
        navigate('/Index');
    }

    const obtenerEstaditicasCoche = async () => {
        try {
            const response = await axios.get("http://localhost:4567/obtenerImagenEstadisticas", { params: { nombreCoche: nombre } });
            setEstadisticasCoche(response.data);
        } catch (error) {
            console.error('Error al obtener la imagen del coche:', error);
        }
    };

    const obtenerVisualizacionCoche = async () => {
        try {
            const response = await axios.get("http://localhost:4567/obtenerImagenVisualizacion", { params: { nombreCoche: nombre } });
            setVisualizacionCoche(response.data);
        } catch (error) {
            console.error('Error al obtener la imagen del coche:', error);
        }
    };

    const obtenerDescripcionCoche = async () => {
        try {
            const response = await axios.get("http://localhost:4567/obtenerDescripcionCoche", { params: { nombreCoche: nombre } });
            setDescripcionCoche(response.data);
        } catch (error) {
            console.error('Error al obtener la descripcion del coche:', error);
        }
    };

    const hacerPeticion = async () => {
        try {
            const respuesta = await axios.post("http://localhost:4567/realizarCompra", datosCoche);
            console.log(respuesta.data);
            return respuesta.data;
        } catch (error) {
            throw error;
        }
    }

    obtenerEstaditicasCoche()
    obtenerVisualizacionCoche()
    obtenerDescripcionCoche()

    const cambiosColor = (evento) => {
        const { name, className } = evento.target
        switch (className) {
            case "color1": setDatosCoche({
                ...datosCoche,
                [name]: "Rojo"
            
            })
                colorSeleccionadoo = "Rojo";
                break;
            case "color2": setDatosCoche({
                ...datosCoche,
                [name]: "Rosa"
            })
            colorSeleccionadoo = "Rosa";
                break;
            case "color3": setDatosCoche({
                ...datosCoche,
                [name]: "Amarillo"
            })
            colorSeleccionadoo = "Amarillo";
                break;
            case "color4": setDatosCoche({
                ...datosCoche,
                [name]: "Naranja"
            })
            colorSeleccionadoo = "Naranja";
                break;
            case "color5": setDatosCoche({
                ...datosCoche,
                [name]: "Verde"
            })
            colorSeleccionadoo = "Verde";
                break;
            case "color6": setDatosCoche({
                ...datosCoche,
                [name]: "Azul"
            })
            colorSeleccionadoo = "Azul";
                break;
            case "color7": setDatosCoche({
                ...datosCoche,
                [name]: "Negro"
            })
            colorSeleccionadoo = "Negro";
                break;
            case "color8": setDatosCoche({
                ...datosCoche,
                [name]: "Blanco"
            })
            colorSeleccionadoo = "Blanco";
                break;
            case "color9": setDatosCoche({
                ...datosCoche,
                [name]: "Morado"
            })
            colorSeleccionadoo = "Morado";
                break;
            case "color10": setDatosCoche({
                ...datosCoche,
                [name]: "Café"
            })
            colorSeleccionadoo = "Café";
                break;

                setColorSeleccionado(colorActualmenteSeleccionado !== '');
        }
        // console.log(datosCoche)
    }

    const procesarFormulario = async (evento) => {
        evento.preventDefault();
        console.log("Datos recuperados del formulario: ", datosCoche);
        if(datosCoche.color==null){
            Swal.fire({
                title: "Error al realizar compra!",
                text: "Debes seleccionar un color para tu vehiculo",
                background:"#560916",
                color:"white",
                imageUrl: "https://static.wikia.nocookie.net/esgta/images/f/f2/Legendary_Motorsport_Actual.png/revision/latest?cb=20221231194359",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Legendary MotorSport"
              });
        // setCargando(false);
            console.log("Error al realizar la compra");
        }
        // setCargando(true);
        try {
            const respuesta = await hacerPeticion();
            setCargando(true);
            console.log("Respuesta de la petición",respuesta);
            setCargando(true);
                if(respuesta == 'Compra realizada') {
                    Swal.fire({
                        title: "!Compra Realizada!",
                        text: "Tu nuevo vehiculo será entregado a la brevedad!!",
                        imageUrl: "https://static.wikia.nocookie.net/esgta/images/f/f2/Legendary_Motorsport_Actual.png/revision/latest?cb=20221231194359",
                        imageWidth: 400,
                        imageHeight: 200,
                        background:"#560916",
                        imageAlt: "Legendary MotorSport"
                      });
            // setCargando(false);
                } else{
                    Swal.fire({
                        title: "Error al realizar compra!",
                        text: "Intenta de nuevo",
                        background:"#560916",
                        color:"white",
                        imageUrl: "https://static.wikia.nocookie.net/esgta/images/f/f2/Legendary_Motorsport_Actual.png/revision/latest?cb=20221231194359",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Legendary MotorSport"
                      });
                }
                    // abrirPopUpError();                

        } catch (error) {
            setCargando(false);
        }
    }

    return (
        <>
            <div className="App">
                <header className="header">
                    <button className='back_button' onClick={atrasBtn}>Atrás</button>
                    <img src="../Imagenes/carreras-autos-deportivos-traves-ia-generativa-movimiento-borroso-oscuro.jpg" alt="Header Background" className="header-background" />
                </header>

                <main className="main">
                    <div className="content-box">
                        <h1>{nombre}</h1>
                        <div className="car-info">
                            <div className="left-column">
                                <p>{descripcionCoche}</p>

                                <h2>Selecciona de los colores disponibles para ordenar</h2>

                                <ul className="color-button">
                                    <button className='color1' name='color' onClick={cambiosColor}></button>
                                    <button className='color2' name='color' onClick={cambiosColor}></button>
                                    <button className='color3' name='color' onClick={cambiosColor}></button>
                                    <button className='color4' name='color' onClick={cambiosColor}></button>
                                    <button className='color5' name='color' onClick={cambiosColor}></button>
                                    <button className='color6' name='color' onClick={cambiosColor}></button>
                                    <button className='color7' name='color' onClick={cambiosColor}></button>
                                    <button className='color8' name='color' onClick={cambiosColor}></button>
                                    <button className='color9' name='color' onClick={cambiosColor}></button>
                                    <button className='color10' name='color' onClick={cambiosColor}></button>
                                </ul>
                                <img src={estadisticasCoche} alt="Estadisticas del auto" />
                                <Button className="buy-button" onClick={procesarFormulario} disabled={cargando}>Comprar</Button>
                                <Box m={5}>
                                    {mostrarPopup && <CompraRealizada onClose={() => setMostrarPopup(false)} />}
                                </Box>

                                <Box m={5}>
                                    {mostrarErrorPopup && <CompraNoRealizada onClose={() => setMostrarErrorPopup(false)} />}
                                </Box>
                            </div>
                            <div className="right-column">
                                <img src={visualizacionCoche} alt="Imagen Automovil" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default PantallaCoche;