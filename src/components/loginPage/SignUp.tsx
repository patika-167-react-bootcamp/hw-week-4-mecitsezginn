import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios"

import "./style.css"

function SignUp() {
  const [emailRequired, setEmailRequired] = useState<boolean>(false)

  const [passwordRequired, setPasswordRequired] = useState<boolean>(false)

  const [passwordConfirmationRequired, setPasswordConfirmationRequired] = useState<string>("")

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const mail = e.target.elements.email.value;
    const pass = e.target.elements.password.value
    const passCon = e.target.elements.passwordConfirmation.value

    if (mail === "") {
      setEmailRequired(true)
    }
    if (pass === "") {
      setPasswordRequired(true)
    }
    if (pass !== passCon) {
      setPasswordConfirmationRequired("notEqual")
    }
    if (passCon === "") {
      setPasswordConfirmationRequired("empty")
    }

    if (mail !== "" && pass !== "" && passCon == pass) {
      axios.post("http://localhost:80/auth/register", { "username":mail, "password":pass, "passwordConfirm":passCon})
      .then((response) =>{
        document.cookie = `token=${response.data.token}`
        window.location.reload();
      })
      .catch(()=>{
        console.log("hata");
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
          <br></br>

          <TextField
            error={passwordConfirmationRequired === "empty" || passwordConfirmationRequired === "notEqual" ? true : false}
            id="passwordConfirmation"
            label="Password Confirmation"
            type={"password"}
          />
          {passwordConfirmationRequired === "empty" ? <p className='message'>Parolanızı giriniz</p> :
            (passwordConfirmationRequired === "notEqual" ? <p className='message'>Parolanız eşleşmedi</p> : null)}
          <br></br>

        </div>
        <Button type='submit' variant="contained">Sign In</Button>
      </Box>

    </div>

  )
}

export default SignUp