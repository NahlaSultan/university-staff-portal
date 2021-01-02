import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
export default function ResetPassword() {
    const passRef=useRef()
    const conpassRef=useRef()
    const [message, setMessage] = useState("")

  function HandleResetPassword(){
      console.log("heyy")
      if(passRef.current.value==conpassRef.current.value){
        console.log("in if")
        setMessage("")

    const body={password:passRef.current.value}
  //  console.log(body)

   axios   
   .post('http://localhost:8000/resetPassword', body)
   
   .then(res=>console.log(res.data));}
   else{
    console.log("in else")
    setMessage("passwords don't match")
   // callAPI()
}
}
    return (
        
        <>
        <div >
            <div className="resetPassword">


                <span className="login100-form-title">
                    Reset Password
      </span>


                <div>
                    <input required={true} ref={passRef} className="input100" name="password" placeholder="New Password" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>
                <br></br>
            <br></br>
            <br></br>
                <div>
                    <input required={true} ref={conpassRef} className="input100" name="password" placeholder="confirm Password" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>
                <h3> {message}</h3>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="buttons">
                <button onClick={HandleResetPassword} className="buttons">
                    Confirm
        </button>
            </div>

        </div>

    </>
    )
}
