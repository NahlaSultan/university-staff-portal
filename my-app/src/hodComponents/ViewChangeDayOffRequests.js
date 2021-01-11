import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';
// import { request } from 'express';

export default function ViewChangeDayOffRequests() {
  const [requests, setrequest] = useState([])
  const[type,setType] =useState("")
  const [StaffIDRef,setID]=useState()
  const CommentRef=useRef()
  const [resp, setRes] = useState() 

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hod/viewChangeDayOffRequests',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
        setrequest(res.data)

      });  
    // console.log(requests)
  });

      function HandleRejectReq(){
        const body={staffId:StaffIDRef, comment:CommentRef.current.value}
    
    
       axios   
       .post('http://localhost:8000/hod/rejectChangeDayOffRequest', body, {headers:{'token': localStorage.getItem('token')}})
       
       .then(res=>{
         setRes(res.data)
         setType("")
        });
    }
      function HandleAccept(e){
        const body = { staffId: e.target.value }
        axios   
        .post('http://localhost:8000/hod/acceptChangeDayOffRequest', body, {headers:{'token': localStorage.getItem('token')}})
        
        .then(res=>{
          setRes(res.data)
         });
      }
      
      function HandleReject(e){
        setID(e.target.value)
        setType("Reject")
      }

if(type==""){
  return (

        <div>
          <h2><br></br> Change Day Off Requests: <br></br> <br></br> </h2>
          <ul className='viewStaff' >
             {requests.map((item,i) =>{
               return <li key={i}><h2>Change Day off</h2>
                <h4 className="elemntsInside">Staff ID: {item.senderId}</h4>
               <h4 className="elemntsInside">Pending: {item.pending + ""}</h4>
               <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
               <h4 className="elemntsInside">Day: {item.day}</h4>
               <h4 className="elemntsInside">Reasons: {item.commentWhyNeeded}</h4>
               <h4 className="elemntsInside">Comment: {item.comment}</h4>
               
               <div className="divider">
                            <button value={item.senderId} className="btn" onClick={HandleAccept} >
                                Accept Request
                            </button>
                            <button value={item.senderId} className="btn" onClick={HandleReject} >
                                Reject Request
                            </button>
                        </div>
                        <ul className='viewStaff'> {resp} </ul>
           
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
                Reject Change Day off Request
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
        <ul className='viewStaff'> {resp} </ul>
        <br></br><br></br>
    </div>

</>

      
    

  )
    }
}