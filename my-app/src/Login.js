import React, { useState, useRef } from 'react'
import axios from 'axios'

// import './main.css';

// export default function Login() {
//   const EmailRef=useRef()
//   const PassRef=useRef()
//   function HandleEmail(){
//     const body={email:EmailRef.current.value, password:PassRef.current.value  }
//   //  console.log(body)

//    axios   
//    .post('http://localhost:8000/login', body)
   
//    .then(res=>console.log(res.data));
   
//    // callAPI()
// }

//   return (
// <>
  
//     <div class="limiter">

// 		<div class="container-login100">

// 			<div class="wrap-login100">

// 				<div class="login100-pic js-tilt" data-tilt>
// 					<img src="https://upload.wikimedia.org/wikipedia/commons/0/00/The_German_University_in_Cairo_Official_logo.jpg" alt="IMG" >
//             </img>
// 				</div>

// 				<form class="login100-form validate-form">

// 					<span class="login100-form-title">
// 						GUC Staff Login
// 					</span>

// 					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
// 						<input ref={EmailRef} class="input100" type="text" name="email" placeholder="Email" />
// 						<span class="focus-input100"></span>
// 						<span class="symbol-input100">
// 							<i class="fa fa-envelope" aria-hidden="true"></i>
// 						</span>
// 					</div>

// 					<div class="wrap-input100 validate-input" data-validate = "Password is required">
// 						<input ref={PassRef} class="input100" type="password" name="pass" placeholder="Password" />
// 						<span class="focus-input100"></span>
// 						<span class="symbol-input100">
// 							<i class="fa fa-lock" aria-hidden="true"></i>
// 						</span>
// 					</div>
					
// 					<div class="container-login100-form-btn">
// 						<button onClick={HandleEmail} class="login100-form-btn">
// 							Login
// 						</button>
// 					</div>

					


// 				</form>

// 			</div>
// 		</div>
// 	</div>
	
// </>



//   )
// }

// {/* <div>
//      Email:
//     <input ref={EmailRef} type="text"/>
//     <br></br>
//     Password:
//     <input ref={PassRef} type="text"/>
//     <br></br>
//     <button onClick={HandleEmail}> login </button>
//     </div> */}

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
