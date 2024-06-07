import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import Login from "./Login/Login.jsx"
import Perfil from "./MiPerfil/Perfil.jsx"
import SignUp from "./SignUp/SignUp.jsx"
import MisCompras from "./ventanaCompras/MisCompras.jsx"
import PantallaCoche from "./Compra_Coche/PantallaCoche.jsx"
import Legendary from "./Index/Legendary.jsx"
import ProtectedRoute from './ProtectedRoute.jsx'
import { AuthProvider } from './AuthContext.jsx';


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
    element: (
      <ProtectedRoute>
          <Legendary/>
      </ProtectedRoute>

  )
  },
  {
    path: "/Perfil",
    element:(
      <ProtectedRoute>
        <Perfil/>
      </ProtectedRoute>
    )
  },
  {
    path: "/MisCompras",
    element:(
      <ProtectedRoute>
          <MisCompras/>
      </ProtectedRoute>
    )
  },
  {
    path: "/Coche",
    element:(
      <ProtectedRoute>
        <PantallaCoche/>
      </ProtectedRoute>
  )
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider> 
  </React.StrictMode>,
)
