import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import LoginScreen from "./pages/Login/"

import { useAuthContext } from "./context/auth/AuthContext.ts"

import Spinner from "./components/Spinner/"
import PrivateRoutes from "./routes/private.tsx"
import Datails from "./pages/Doctor-datails/index.tsx"
import RegisterScreen from "./pages/Register/index.tsx"


export function AppRoutes() {
  const { loading, user } = useAuthContext()
  return (
    <BrowserRouter>
      {!loading && (
        <Routes>
           <Route path="/register" element={!user ? <RegisterScreen /> : <Navigate to="/home" />} />
          <Route path="/" element={!user ? <LoginScreen /> : <Navigate to="/home" />} />
          <Route path="/home" element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          } />
          <Route path="/doctor-details/:id" element={
            <PrivateRoutes>
              <Datails />
            </PrivateRoutes>
          } />
        </Routes>
      )}
      {loading && <Spinner />}
    </BrowserRouter>
  )
}
