import React, { useState, useRef } from 'react'
import axios from 'axios'
import HRprofile from './HRprofile'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { render } from 'react-dom'

export default function Login() {
  let loggedIn = false
  // const [logIn, setlogIn] = useState(0)
  const EmailRef = useRef()
  const PassRef = useRef()
  function check(res) {
    if (res.data == "reset your password") {
      console.log("I entered")
      loggedIn = true
    }
    else {

    }

  }
  function HandleEmail() {
    const body = { email: EmailRef.current.value, password: PassRef.current.value }
    //  console.log(body)

    axios
      .post('http://localhost:8000/login', body)

      .then(res => check(res));


    // callAPI()
  }

  return (
    <div>
      Email:
      <input ref={EmailRef} type="text" />
      <br></br>
    Password:
      <input ref={PassRef} type="text" />
      <br></br>
      <Link to="/home"> <button onClick={HandleEmail}> login </button> </Link>
      {/* <Route component={HRprofile} exact path="/home"/> */}
      {/* <button onClick={HandleEmail}> login </button> */}
      {/* <Route exact path="/">
        {loggedIn? <Redirect to="/home" /> : <HRprofile />}
      </Route> */}

    </div>
  )

}


