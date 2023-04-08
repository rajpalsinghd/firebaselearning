import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MainPage() {
    const navigate = useNavigate()
   const pagetoPage=(()=>{
    navigate('/signin')
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
