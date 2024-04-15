import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    userId: null,
 });

 const login = (token, userId) => {
    setAuthState({
      isAuthenticated: true,
      token,
      userId,
    });
 };

 const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      userId: null,
    });
 };

 return (
   <AuthContext.Provider value={{ authState, setAuthState }}>
     {children}
   </AuthContext.Provider>
);
};

export default AuthContext;
export const useAuth = () => useContext(AuthContext);
