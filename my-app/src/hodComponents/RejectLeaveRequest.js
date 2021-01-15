import React,{useEffect, useRef, useState} from 'react'
import {useHistory } from 'react-router-dom'

import axios from 'axios'
export default function RejectLeaveRequest() {
  const RequestIDRef=useRef()
  const CommentRef=useRef()
  let history = useHistory()

  const [resp, setRes] = useState()


useEffect(()=>{
    const checkToken = async()=>{
        if(localStorage.getItem('token')){
          console.log("TOKENS")
          await axios
          .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
          .then(res => {
          if(!res.data.includes('headOfdepartments')) {
            history.push('/error')
          } 
          });
        }
        else{
          console.log("NOT TOKENS")
          history.push('/')
    
        }
  
    }
  
    checkToken()
  
},[])

  function HandleReject(){
    const body={requestId:RequestIDRef.current.value, comment:CommentRef.current.value}


   axios   
   .post('http://localhost:8000/hod/rejectLeaveRequest', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>{
     setRes(res.data)
    });
}

   return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                Reject Leave Request
  </span>


             <div>
                <input required={false} ref={CommentRef} className="input100" name="comment" placeholder="Comment" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                </span>
                <br />
            </div>

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleReject} className="buttons">
                Reject Request
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> {resp} </ul>
        <br></br><br></br>
    </div>

</>

      
    

  )
}

