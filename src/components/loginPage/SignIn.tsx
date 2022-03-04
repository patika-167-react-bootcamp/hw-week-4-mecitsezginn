import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import "./style.css"
import axios from 'axios';

function SignIn() {
  const [emailRequired, setEmailRequired] = useState<boolean>(false)
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false)

  const [loginRequired, setLoginRequired] = useState<boolean>(false)

  const onSubmit = (e: any) => {
    e.preventDefault()
    const mail = e.target.elements.email.value;
    const pass = e.target.elements.password.value

    if (mail === "") {
      setEmailRequired(true)
    }
    if (pass === "") {
      setPasswordRequired(true)
    }

    if (mail !== "" && pass !== "") {

      axios.post("http://localhost:80/auth/login", { "username": mail, "password": pass })
        .then((response) => {
          document.cookie = `token=${response.data.token}`
          // console.log(user.data)
          window.location.reload();
        })
        .catch(() => {
          console.log("hatalı giriş");
          setLoginRequired(true)
          
        })
    }

  }
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div>
          <TextField
            error={emailRequired}
            id="email"
            label="E-mail"
          // defaultValue="E-mail"
          />
          {emailRequired === true ?
            <p className='message'>Mail bilgisini giriniz</p> : null}
          <br></br>

          <TextField
            error={passwordRequired}
            id="password"
            label="Password"
            type={"password"}
          />
          {passwordRequired === true ?
            <p className='message'>Şifrenizi giriniz</p> : null}

          {loginRequired === true ?
            <p className='message'>Hatalı giriş</p> : null}
          <br></br>

        </div>
        <Button type='submit' variant="contained">Sign In</Button>
      </Box>

    </div>

  )
}

export default SignIn
