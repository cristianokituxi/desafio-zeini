// AuthContext.tsx
import { createContext, useContext } from 'react';
import { usuario } from '../../pages/Usuario/types/usuario';
import { kart } from '../../pages/Karts/types/kart';

export interface AuthContextType {
  user: any | null;
  usuarios: usuario | undefined;
  karts: kart | undefined;
  loading: boolean;
  children?: React.ReactNode
  fetchDataUsuario: () => Promise<void>
  fetchDataKarts: () => Promise<void>
  handleLogout: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>; 

}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
