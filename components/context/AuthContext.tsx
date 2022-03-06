import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

interface AuthContextInterface {
  getUserId: () => string | null | undefined;
  saveUserId: (id: string) => void;
  getTheme: () => string | null | undefined;
  saveTheme: (id: string) => void;
}

const authContextDefaults: AuthContextInterface = {
  getUserId: () => null,
  saveUserId: () => null,
  getTheme: () => null,
  saveTheme: () => null,
};

export const AuthContext = createContext<AuthContextInterface>(authContextDefaults);
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      const id = localStorage.getItem("id");
      setUserId(id);
    }
    if (localStorage.getItem("theme") !== null) {
      const theme = localStorage.getItem("theme");
      setTheme(theme);
    }
  }, []);

  const getUserId = () => {
    return userId;
  };

  const saveUserId = useCallback((id: string) => {
    localStorage.setItem("id", id);
    setUserId(id);
  }, [])

  const getTheme = () => {
    return theme;
  };

  const saveTheme = useCallback((theme: string) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }, [])

  return (
    <AuthContext.Provider
      value={{
        getUserId,
        saveUserId,
        getTheme,
        saveTheme
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;