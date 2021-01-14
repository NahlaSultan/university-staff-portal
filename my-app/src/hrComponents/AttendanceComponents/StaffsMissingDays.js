import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import {Link} from 'react-router-dom'


export default function StaffsMissingDays() {
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await
      axios
      .get('http://localhost:8000/hr/viewMissingDays', { headers: { 'token': localStorage.getItem('token') } })
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
    <th>Missing Days this Month</th>
 
    </tr>


    {staffs.map((item, i) => {
          return <tr key={i}>
            <td> {item.staffMemberID} </td>
            <td> {item.missingDays} </td>

            <br />
          </tr>
        })}

</table>

</>





  )

}


