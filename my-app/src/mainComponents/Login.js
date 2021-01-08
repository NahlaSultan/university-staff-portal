import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { render } from 'react-dom'
import HRprofile from '../hrComponents/HRprofile'
import '../styling/main.css';
// const jwt =require("jsonwebtoken")

export default function Login() {

  //   const EmailRef=useRef()
  //   const PassRef=useRef()
  //   const [Login, LoginMessage]=useState("")
  //   function HandleEmail(){
  //     const body={email:EmailRef.current.value, password:PassRef.current.value  }


  //    axios   
  //    .post('http://localhost:8000/login', body)

  //    .then(res=>console.log(res.data));

  // }
  // if (LoginMessage=="Invalid email"){
  //   return (
  //     <div>
  //      Email:
  //     <input ref={EmailRef} type="text"/>
  //     <br></br>
  //     Password:
  //     <input ref={PassRef} type="text"/>
  //     <br></br>
  //     <button onClick={HandleEmail}> login </button>
  //     <br></br>
  //       Invalid email
  //     </div>
  //   )}
  //   else if (LoginMessage=="Invalid password"){
  //     return (
  //       <div>
  //        Email:
  //       <input ref={EmailRef} type="text"/>
  //       <br></br>
  //       Password:
  //       <input ref={PassRef} type="text"/>
  //       <br></br>
  //       <button onClick={HandleEmail}> login </button>
  //       <br></br>
  //       Invalid Password
  //       </div>
  //     )}
  //     else if (LoginMessage=="reset your password"){
  //       return <Redirect to="/"/>
  //     }

  // }

  const [logIn, setlogIn] = useState("")
  //const [token, setToken] = useState("")

  const EmailRef = useRef()
  const PassRef = useRef()
  var headerText = ""
  function HandleEmail() {
    const body = { email: EmailRef.current.value, password: PassRef.current.value }
    //  console.log(body)

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
    return (
      //see which role from header and redirect to a certain homepage
      
      // <Redirect to="/homeHR" />
      // <Redirect to="/resetPassword" />
      <Redirect to="/home" />
  //    <Redirect to="/staffProfile" />


    )
  }
}

