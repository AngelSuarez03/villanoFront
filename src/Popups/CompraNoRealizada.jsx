import {Dialog, DialogActions, DialogContent, DialogContentText, Button} from "@mui/material";
import { useState } from "react";
import './UsuarioAgregado.css'

function CompraNoRealizada() {
    const [open, setOpen]=useState(true);
    const abrirAlerta=()=>{
        setOpen(true);
    }

    const cerrarAlerta=()=>{
        setOpen(false);
    }
    return (
        <>
    <div className="Popup_container">
        <Dialog open={open} onClose={abrirAlerta}>

        <DialogContent className="Popup_container">
            <img src="../Imagenes/Legendary.webp" alt="" />
            
            <DialogContentText >
                <p className="Popup_text">Se produjo un error al procesar la compra. Es posible que ya no haya existencias disponibles para este vehículo. Por favor, inténtelo de nuevo más tarde o explore otras opciones disponibles.</p>
            </DialogContentText>
        </DialogContent>

        <DialogActions className="Popup_button_container">
        <Button onClick={cerrarAlerta} className="Popup_button"><p className="Popup_text_button">Aceptar</p></Button>
        </DialogActions>

        </Dialog>

    </div>
        </>
    )
}
export default CompraNoRealizada;