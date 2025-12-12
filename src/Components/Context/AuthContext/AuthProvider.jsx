import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo = {
    name: "muslim",
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
