import React, { useState } from "react";
import "./password.css";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  setDoc,
  doc,
  where,
  query,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../../config";
import { useEffect } from "react";

function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event) => {
    if (password === "" || confirmPassword === "") {
      alert("Password cannot be empty");
      return;
    } else if (password !== confirmPassword) {
      alert("Confirm password is not same as password");
      return;
    }
    let id = uuidv4();
    const plansRef = collection(db, "owners");
    let pr = user.email.split("@");
    let data = { email: pr[0] + "_user@" + pr[1], password };
    let q = query(collection(db, "owners"), where("email", "==", data.email));
    let qs = await getDocs(q);
    if (qs.size) {
      qs.forEach((doc) => {
        console.log(doc.data());
        id = doc.id;
      });
    }
    //await deleteDoc(doc(plansRef, id));
    await setDoc(doc(plansRef, id), data);
    event.preventDefault();
  };

  return (
    <div className="form">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />

      <button onClick={handleSubmit} className="pass">
        Submit
      </button>
    </div>
  );
}

export default Password;
