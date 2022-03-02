import { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface AuthContextInterface {
  getUserId: () => string;
  saveUserId: (s: string) => void;
}

const authContextDefaults: AuthContextInterface = {
  getUserId: () => "",
  saveUserId: () => null,
};

export const AuthContext = createContext<AuthContextInterface>(authContextDefaults);
export const useAuthContext = () => useContext(AuthContext);

function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    let id = localStorage.getItem("id");
    id && setUserId(id);
  });

  const getUserId = () => {
    return userId;
  };

  const saveUserId = (id: string) => {
    localStorage.setItem("id", id);
    setUserId(id);
  };

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