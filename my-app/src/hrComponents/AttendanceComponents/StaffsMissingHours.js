import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import {Link,useHistory} from 'react-router-dom'


export default function StaffsMissingHours() {
  const [staffs, setStaffs] = useState([])
  let history = useHistory()

  useEffect(() => {


    const checkToken = async()=>{
      if(localStorage.getItem('token')){
        console.log("TOKENS")
        await axios
        .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
        .then(res => {
        if(!res.data.includes('HR members')) {
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

    const fetchData = async () => {
      await
      axios
      .get('http://localhost:8000/hr/viewMissingHours', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setStaffs(res.data)
        console.log("here")
        console.log(res.data)
      });
    };
    fetchData();    
  }, []);




  return (

<>
<Link to='/hr/manageAttendance' className="linkPrev">&laquo;</ Link> <br /> <br /> <br />

    <table className="table">
    <tr className="th">
    <th>Member ID</th>
    <th>Missing Hours this Month</th>
 
    </tr>


    {staffs.map((item, i) => {
          return <tr key={i}>
            <td> {item.staffMemberID} </td>
            <td> {item.missingHours} </td>

            <br />
          </tr>
        })}

</table>

</>



  )

}


