import { ReactNode, useEffect, useState } from "react";
import AuthContext, { AuthContextType } from "./AuthContext";
import api from "../../Url/api";
import { usuario } from "../../pages/Usuario/types/usuario";
import { kart } from "../../pages/Karts/types/kart";


interface Props {
  children?: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [usuarios, setUsuarios] = useState<usuario | undefined>(undefined);
  const [karts, setkarts] = useState<kart | undefined>(undefined);

  // Função de login
  async function handleLogin(email: string, senha: string): Promise<void> {
    if (!email || !senha) {
      console.error("Email ou senha inválidos.");
      handleLogout();
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, senha });
      console.log(email, senha);

      if (response.data?.token) {
        const { token, user } = response.data;
        console.log(user);
        localStorage.setItem("token", token);
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        console.log("Login bem-sucedido.");

      } else {
        console.error("Token não encontrado na resposta do login.");
        handleLogout();
      }
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

  async function fetchDataUsuario(): Promise<void> {
    try {
      const response = await api.get("/usuario/");
      const usuariosOrdenados = response?.data.map((usuario: usuario) => ({
        id: usuario._id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        usuario_tipo: usuario.userType,
        email: usuario.email || "",
        passeword: usuario.passeword || "",
      }));

      setUsuarios(usuariosOrdenados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function fetchDataKarts(): Promise<void> {
    try {
      const response = await api.get("/kart");
      const usuariosOrdenados = response?.data.map((kart: kart) => ({
        id: kart._id,
        nome: kart.nome,
        velocidade: kart.velocidade,
        tipo: kart.tipo,
        disponivel: kart.disponivel
      }));

      setkarts(usuariosOrdenados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
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
    usuarios,
    karts,
    fetchDataUsuario,
    handleLogout,
    handleLogin,
    fetchDataKarts
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
