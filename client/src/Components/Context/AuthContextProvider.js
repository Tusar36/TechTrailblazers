import Authcontext from "./AuthContext";
import { useState } from "react";
const AuthContextProvider = ({ children }) => {
  const [Logined, setLogined] = useState(false);
  return (
    <Authcontext.Provider value={[Logined, setLogined]}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthContextProvider;
