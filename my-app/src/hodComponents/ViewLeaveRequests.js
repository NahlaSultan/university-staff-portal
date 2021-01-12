import React,{useRef, useState, useEffect} from 'react'
import {Redirect } from "react-router-dom";
import axios from 'axios'
import '../styling/main.css';

export default function ViewLeaveRequests() {
  const [requests, setrequest] = useState([])
  const [resp, setRes] = useState() 
  const[type,setType] =useState("")
  const [RequestIDRef,setReq]=useState()
  const CommentRef=useRef()

  // const [resp, setRes] = useState()

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hod/viewLeaveRequests',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
        setrequest(res.data)

      });  });

      function HandleRejectReq(){
        const body={requestId:RequestIDRef, comment:CommentRef.current.value}
    
    
       axios   
       .post('http://localhost:8000/hod/rejectLeaveRequest', body, {headers:{'token': localStorage.getItem('token')}})
       
       .then(res=>{
         setRes(res.data)
         setType("")
        });
    }
    
function HandleAccept(e){
  const body = { requestId: e.target.value }
  axios   
  .post('http://localhost:8000/hod/acceptLeaveRequest', body, {headers:{'token': localStorage.getItem('token')}})
  
  .then(res=>{
    setRes(res.data)
   });
}

function HandleReject(e){
  setReq(e.target.value)
  setType("Reject")
}

if(type==""){
  return (

        <div>
          <h2><br></br> Leave Requests: <br></br> <br></br> </h2>
          <ul className='viewStaff' >
          <h3 className='viewStaff'> {resp} <br></br> <br></br></h3>
             {requests.map((item,i) =>{
               return <li key={i}><h2>Leave</h2>
               <h3 className="elemntsInside">Type: {item.type}</h3>
               <h4 className="elemntsInside">Staff ID: {item.staffID}</h4>
               <h4 className="elemntsInside">Request ID: {item._id}</h4>
               <h4 className="elemntsInside">Pending: {item.pending + ""}</h4>
               <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
               <h4 className="elemntsInside">Start Date: {item.start}</h4>
               <h4 className="elemntsInside">End Date: {item.end}</h4>
               <h4 className="elemntsInside">Submission Date: {item.submission}</h4>
               <h4 className="elemntsInside">Document Links: {item.documentLinks}</h4>
               <h4 className="elemntsInside">Reasons: {item.commentWhySent}</h4>
               <h4 className="elemntsInside">Comment: {item.comment}</h4>
               
               <div className="divider">
                            <button value={item._id} className="btn" onClick={HandleAccept} >
                                Accept Request
                            </button>
                            <button value={item._id} className="btn" onClick={HandleReject} >
                                Reject Request
                            </button>
                        </div>
          
               <br></br><br></br>
               </li>               
             })}
          </ul>
          
        </div>
    

  )

}
else{
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
            <button onClick={HandleRejectReq} className="buttons">
                Reject Request
    </button>
    <br></br>
    <br></br>
        </div>
        <br></br><br></br>
    </div>

</>

      
    

  )
}
}