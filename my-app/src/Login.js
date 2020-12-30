import React, { useState, useRef } from 'react'
import axios from 'axios'
import HRprofile from './HRprofile'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { render } from 'react-dom'

export default function Login() {
  const [logIn, setlogIn] = useState("")
  const EmailRef = useRef()
  const PassRef = useRef()

  function HandleEmail() {
    const body = { email: EmailRef.current.value, password: PassRef.current.value }
    //  console.log(body)

    axios
      .post('http://localhost:8000/login', body)
      .then(res => {
        setlogIn(res.data)
        console.log(logIn)
      });



    // callAPI()
  }

  if (logIn == "reset your password" || logIn == "Success") {
    return (
      <Redirect to="/home" />
    )
  }
  else {
    if (logIn == "Invalid password")
      return (
        <div>
          <h2>Invalid password</h2>
          Email:
          <input ref={EmailRef} type="text" />
          <br></br>
          Password:
          <input ref={PassRef} type="text" />
          <br></br>
          <button onClick={HandleEmail}> login </button>


        </div>
      )
    else
      if (logIn == "Invalid email") {
        return (
          <div>
            <h2>Invalid email</h2>
          Email:
            <input ref={EmailRef} type="text" />
            <br></br>
          Password:
            <input ref={PassRef} type="text" />
            <br></br>
            <button onClick={HandleEmail}> login </button>


          </div>
        )
      }
      else {
        return (
          <div>
            Email:
            <input ref={EmailRef} type="text" />
            <br></br>
            Password:
            <input ref={PassRef} type="text" />
            <br></br>
            <button onClick={HandleEmail}> login </button>

          </div>
        )
      }
  }
}