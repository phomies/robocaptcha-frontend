import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

interface AuthContextInterface {
  getUserId: () => string | null | undefined;
  saveUserId: (id: string) => void;
}

const authContextDefaults: AuthContextInterface = {
  getUserId: () => null,
  saveUserId: () => null,
};

export const AuthContext = createContext<AuthContextInterface>(authContextDefaults);
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      const id = localStorage.getItem("id");
      setUserId(id);
    }
  }, []);

  const getUserId = () => {
    return userId;
  };

  const saveUserId = useCallback((id: string) => {
    localStorage.setItem("id", id);
    setUserId(id);
  }, [])

  return (
    <AuthContext.Provider
      value={{
        getUserId,
        saveUserId
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;