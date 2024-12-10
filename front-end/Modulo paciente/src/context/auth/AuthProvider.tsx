import { ReactNode, useEffect, useState } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import api from "../../Url/api";


interface Props {
  children?: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

 
  async function handleLogin(email: string, senha: string): Promise<any> {
    if (!email || !senha) {
      console.error("Email ou senha inválidos.");
      handleLogout();
      return;
    }
  
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, senha });
  
      if (response.data?.token) {
        const { token, user } = response.data;
        console.log(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log("Login bem-sucedido.");
      } else {
        console.error("Token não encontrado na resposta do login.");
        handleLogout();
        
      }
  
      return  response  
    } catch (error) {
      console.error("Falha ao fazer login:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  }
  

  async function handleLogout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.defaults.headers.Authorization = null;
    setUser(null);
    setLoading(false);
  }

  
  useEffect(() => {
    setLoading(true)
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(parsedUser);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);


  const contextValue: AuthContextType = {
    user,
    loading,
    handleLogout,
    handleLogin,
   
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
