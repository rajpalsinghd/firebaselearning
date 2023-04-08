import React, { useState } from 'react';
import "./password.css";
import { v4 as uuidv4 } from "uuid";
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from '../../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Password() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    let id = uuidv4();

    const plansRef = collection(db, "owners");
    let data = {email:"vikas2015041088_user@gmail.com", password}
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
    <form onSubmit={handleSubmit}>
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

      <button type="submit" className='pass'>Submit</button>
    </form>
  );
}

export default Password;