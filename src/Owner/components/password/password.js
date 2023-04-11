import React, { useState } from 'react';
import "./password.css";
import { v4 as uuidv4 } from "uuid";
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from '../../../config';
import { createUserWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { useEffect } from 'react';


function Password() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const[user, setUser] = useState("")
  
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

  const handleSubmit = async(event) => {
    let id = uuidv4();

    const plansRef = collection(db, "owners");
    let pr = user.email.split("@")
 
   
    let data = {email:pr[0] + "_user@" + pr[1], password}
    // await setDoc(doc(plansRef, id),data);
    createUserWithEmailAndPassword(auth, data.email, data.password).then((user)=>{
console.log(user)
    }).catch((err)=>{

console.log(err)

    })
    console.log(password)
    event.preventDefault();

};

  return (
    <div className='form'>
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

      <button onClick={handleSubmit} className='pass'>Submit</button>
      </div>
  );
}

export default Password;