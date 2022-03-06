import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

interface AppContextInterface {
  getUserId: () => string | null | undefined;
  saveUserId: (id: string) => void;
  getTheme: () => string | null | undefined;
  saveTheme: (id: string) => void;
}

const appContextDefaults: AppContextInterface = {
  getUserId: () => null,
  saveUserId: () => null,
  getTheme: () => null,
  saveTheme: () => null,
};

export const AppContext = createContext<AppContextInterface>(appContextDefaults);
export const useAppContext = () => useContext(AppContext);

function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      const id = localStorage.getItem("id");
      setUserId(id);
    }
    if (localStorage.getItem("theme") !== null) {
      const th = localStorage.getItem("theme");
      setTheme(th);
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

  const saveTheme = useCallback((th: string) => {
    localStorage.setItem("theme", th);
    setTheme(th);
  }, [])

  return (
    <AppContext.Provider
      value={{
        getUserId,
        saveUserId,
        getTheme,
        saveTheme
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AuthProvider;