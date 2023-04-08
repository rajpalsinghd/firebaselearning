import * as React from 'react';
import { styled } from '@mui/material/styles';
import {  Button, Stack } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import {signInWithPopup} from "firebase/auth"
import { useState } from 'react';
import { auth, provider } from '../../config';


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
export default function SigninPage() {
    const [value, setValue]= useState('')
    const navigate = useNavigate()
    const pagetoPage =()=>{
     signInWithPopup(auth, provider).then((data)=>{
          setValue(data.user.email)
          navigate("/owner")
     }
     )
    }
    
  return (
    <Stack spacing={2} direction="row" style={{display:"flex", justifyContent:"center", alignContent:"center", cursor:"pointer"}}>
      <ColorButton variant="contained" onClick={pagetoPage}>Signin With Google</ColorButton>
    </Stack>
  )
}
