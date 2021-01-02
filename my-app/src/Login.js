import React,{useRef} from 'react'
import axios from 'axios'
export default function Login() {
  const EmailRef=useRef()
  const PassRef=useRef()
  const [Login, LoginMessage]=useState("")
  function HandleEmail(){
    const body={email:EmailRef.current.value, password:PassRef.current.value  }


   axios   
   .post('http://localhost:8000/login', body)
   
   .then(res=>console.log(res.data));
  
}
if (LoginMessage=="Invalid email"){
  return (
    <div>
     Email:
    <input ref={EmailRef} type="text"/>
    <br></br>
    Password:
    <input ref={PassRef} type="text"/>
    <br></br>
    <button onClick={HandleEmail}> login </button>
    <br></br>
      Invalid email
    </div>
  )}
  else if (LoginMessage=="Invalid password"){
    return (
      <div>
       Email:
      <input ref={EmailRef} type="text"/>
      <br></br>
      Password:
      <input ref={PassRef} type="text"/>
      <br></br>
      <button onClick={HandleEmail}> login </button>
      <br></br>
      Invalid Password
      </div>
    )}
    else if (LoginMessage=="reset your password"){
      return <Redirect to="/"/>
    }
  
}

