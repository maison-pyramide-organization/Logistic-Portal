import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "@/database/models/usersModel";
import { signIn, logout as signout } from "@/services/firebase/auth";

interface AuthContextType {
  user: any;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  login: any;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  logout: () => {},
  login: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [fb_user, setFbUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    signout();
    setUser(null);
    setFbUser(null);
  };

  const initUser = async (email: string) => {
    const user = await getUser(email);
    setUser(user);
    return user;
  };

  const login = async (email: string, password: string) => {
    const { user: authUser } = await signIn(email, password);
    if (!authUser) return null;
    const user = await initUser(authUser?.email!);
    return user;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (!user) {
        setLoading(false);
        return;
      }

      await initUser(user.email!);
      setFbUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!fb_user,
    loading,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
