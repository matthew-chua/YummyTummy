// import app from "../Firebase/firebase";
import React, { useEffect, useState } from "react";
import LoadingModal from "../Components/Modals/LoadingModal";
import { auth } from "./auth";

// source code

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
      console.log("user state changed", user);
    });
  }, []);

  if (pending) {
    return <LoadingModal isLoading = {true}/>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
