import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';

export default function ViewAllStaff() {
  const [staff, setStaff] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    axios   
    .get('http://localhost:8000/hod/viewAllStaff',{headers:{'token': localStorage.getItem('token')}})
    .then(res => {
      setStaff(res.data)

      });  });

   var s=[]
  //  staff.forEach(st=>{
  //    s+=st+"\n"
  //  }) 
   for(let i=0;i<staff.length;i++){
    s.push(staff[i])
    }  

  return (

        <div>
          <h2>Staff:</h2>
          <ul className='viewStaff' >
             {staff.map((s,i) =>{
               return <li key={i}>{s} <br></br> <br></br></li>               
             })}
          </ul>
          
        </div>
    

  )

}