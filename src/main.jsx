import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import Login from "./Login/Login.jsx"
import Perfil from "./MiPerfil/Perfil.jsx"
import SignUp from "./SignUp/SignUp.jsx"
import MisCompras from "./ventanaCompras/MisCompras.jsx"
import PantallaCoche from "./Compra_Coche/PantallaCoche.jsx"
import Legendary from "./Index/Legendary.jsx"



const router = createHashRouter([
  {
    path: "/",
    element:<Login/>
  },
  {
    path: "/SignUp",
    element: <SignUp/>
  },
  {
    path: "/Index",
    element: <Legendary/>
  },
  {
    path: "/Perfil",
    element:<Perfil/>
  },
  {
    path: "/MisCompras",
    element:<MisCompras/>
  },
  {
    path: "/Coche",
    element:<PantallaCoche/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>  
  </React.StrictMode>,
)
