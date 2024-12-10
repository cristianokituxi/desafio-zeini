import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import LoginScreen from "./pages/Login/index.tsx"
import { useAuthContext } from "./context/auth/AuthContext.ts"

import UsuarioCreate from "./pages/Usuario/Create.tsx";

import UsuarioEdit from "./pages/Usuario/Edit.tsx";
import UsuarioList from "./pages/Usuario/List.tsx";

import Spinner from "./components/Spinner/index.tsx"
import PrivateRoutes from "./routes/private.tsx"



export function AppRoutes() {
  const { loading, user } = useAuthContext()
  return (
    <BrowserRouter>
      {!loading && (
        <Routes>
          <Route path="/" element={!user ? <LoginScreen /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
          <Route path="/usuario">
            <Route path="/usuario"
              element=
              {
                <PrivateRoutes>
                  <UsuarioList />
                </PrivateRoutes>
              }
            />
            <Route path="/usuario/new" element=
              {
                <PrivateRoutes>
                  <UsuarioCreate />
                </PrivateRoutes>


              }
            />
            <Route path="/usuario/:id" element=
              {
                <PrivateRoutes>
                  <UsuarioEdit />
                </PrivateRoutes>
              }
            />
            
          </Route>
        </Routes>
      )}
      {loading && <Spinner />}
    </BrowserRouter>
  )
}
