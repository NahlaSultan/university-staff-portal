import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useHistory,Redirect } from "react-router-dom";
import { render } from 'react-dom'
import HRprofile from '../hrComponents/HRprofile'
import '../styling/main.css';
// const jwt =require("jsonwebtoken")

export default function Login() {

let history = useHistory()
  const [logIn, setlogIn] = useState("")
  const [role, setRole] = useState([])

  const EmailRef = useRef()
  const PassRef = useRef()
  var headerText = ""
  function HandleEmail() {
    const body = { email: EmailRef.current.value, password: PassRef.current.value }

    axios
      .post('http://localhost:8000/login', body)
      .then(res => {
        setlogIn(res.data)
        console.log("here")
        console.log(res.headers)

        // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // setToken(verified)
        // console.log(verified.role)
        console.log(res.data)
      });



    // callAPI()
  }

  async function HandleRole(){
    await axios
      .post('http://localhost:8000/getRoleFromToken', { token: logIn})
      .then(res => {
      setRole(res.data)   
      console.log(res.data)    
      });

      console.log(role)

      if(role.includes('HR members')){
        history.push('hr/home') 
      }
      else{
        history.push('/staffProfile') 
      }

  }

  if (logIn == "Invalid password" || logIn == "Invalid email" || logIn=="") {
    if (logIn == "Invalid password") {
      headerText = "Invalid password"
    }
    else if (logIn == "Invalid email") {
      headerText = "Invalid email"
    }
    return (
      <div>
        <div className="limiter">

          <div className="container-login100">

            <div className="wrap-login100">

              <div className="login100-pic js-tilt" data-tilt>
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
                </img>
              </div>



              <span className="login100-form-title">
                GUC Staff Login
              </span>

              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input ref={EmailRef} className="input100" type="text" name="email" placeholder="Email" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <h3>  {headerText} </h3>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input ref={PassRef} className="input100" type="password" name="pass" placeholder="Password" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button onClick={HandleEmail} className="login100-form-btn">
                  Login
                </button>
              </div>






            </div>

          </div>

        </div>

      </div>
    )
  }
  else {

    localStorage.setItem('token', logIn)
    console.log(localStorage.getItem('token'))
    
    HandleRole()

    return (
      //see which role from header and redirect to a certain homepage
      // <Redirect to="/homeHR" />
      // <Redirect to="/resetPassword" />
      // <Redirect to="/home" />
  //    <Redirect to="/staffProfile" />

      
       //<Redirect to="/homeHR" />
      // <Redirect to="/resetPassword" />
     // <Redirect to="/home" />
  //  <Redirect to="/instructorProfile" />

  <>
  </>

    )
  }
}

