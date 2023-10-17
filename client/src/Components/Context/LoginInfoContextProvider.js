import LoginInfoContext from "./LoginInfoContext";
import { useState } from "react";
const LoginInfoContextProvider = ({ children }) => {
  const [UserInfo, setUserInfo] = useState({
    name: "",
    email: "",
    _id: "",
  });

  return (
    <LoginInfoContext.Provider value={[UserInfo, setUserInfo]}>
      {children}
    </LoginInfoContext.Provider>
  );
};

export default LoginInfoContextProvider;
