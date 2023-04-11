import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config';

export default function MainPage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);
   const pagetoPage=(()=>{
    user?  navigate("/owner"): navigate("/signin")
   })
   const pagetoUser=(()=>{
    navigate('/pass')
   })
  return (
    
    <div style={{display:"flex", justifyContent:"center", alignContent:"center", cursor:"pointer", flexDirection:"column"}} >
        <Button onClick={pagetoPage}>Owner</Button> 
        <Button onClick={pagetoUser}>User</Button> 
    </div>
  )
}
