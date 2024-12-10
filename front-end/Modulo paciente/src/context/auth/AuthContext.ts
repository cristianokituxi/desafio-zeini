
import { createContext, useContext } from 'react';


export interface AuthContextType {
  user: any | null;
  loading: boolean;
  children?: React.ReactNode
  handleLogout: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<Response | undefined>; 

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
