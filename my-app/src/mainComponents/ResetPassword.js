import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
export default function ResetPassword() {
    const passRef=useRef()
    const conpassRef=useRef()
  function HandleResetPassword(){
      console.log("heyy")
      if(passRef==conpassRef){
    const body={password:passRef.current.value}
  //  console.log(body)

   axios   
   .post('http://localhost:8000/resetPassword', body)
   
   .then(res=>console.log(res.data));}
   else{
    console.log("heloo")
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
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Not Matching!</h2>
            <div className="buttons">
                <button onClick={HandleResetPassword} className="buttons">
                    Confirm
        </button>
            </div>

        </div>

    </>
        
    )
   }
   // callAPI()
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
