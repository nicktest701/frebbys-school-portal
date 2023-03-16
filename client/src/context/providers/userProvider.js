import React from "react";

export const UserContext = React.createContext();
const userProvider = ({ children }) => {





  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export default userProvider;
