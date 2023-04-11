import React, { useState } from 'react'
import "./passpage.css"
import { collection, setDoc, doc } from "firebase/firestore";
import { auth, db } from '../../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {  getDocs, onSnapshot, query, where }  from "firebase/firestore";


export default function PassPage() {

    const[email, setEmail]= useState("")
    const[password, setPassword]= useState("")


    const emailHandler=((e)=>{
setEmail(e.target.value)
    })
    const passwordHandler=((e)=>{
        setPassword(e.target.value)
    })

    const navigate = useNavigate()
    const submitHandler =(()=>{
        console.log("loooooog")
  signInWithEmailAndPassword(auth, email, password).then((user)=>{
    (async function x(){
        const querySnapshot = await getDocs(
            query(collection(db, "prices")
          ));
          let data = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
          });
          console.log(data, user)
          navigate("/user",{state : {"data" : data, "email" : user.user.email}})
    })()
   
  }).catch((err)=>{
alert("wrong credentials")
  })
    })
  return (
    <div>
        <div class="login-container">
  <h2>Login</h2>
  
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Enter your email" onChange={emailHandler}/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" onChange={passwordHandler}/>
    </div>
    <button className='button' onClick={submitHandler}>Login</button>
 
</div>  
    </div>
  )
}
