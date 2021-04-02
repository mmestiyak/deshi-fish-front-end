import React, { createContext, useContext, useState, useEffect } from "react";
import { firebaseConfig } from "../firebaseConfig";
import firebase from "firebase";
import { useHistory, useLocation } from "react-router-dom";

import "firebase/auth";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      history.replace(from);
    });
  }, []);
  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };
  const logout = () => {
    return firebase.auth().signOut();
  };

  const value = {
    currentUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
