import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import StaffMember from './StaffMember';

import { Link, useHistory } from 'react-router-dom'


export default function Staffs() {
  const [hr, setHr] = useState([])
  //const [ac,setAC] = useState([])
  const [ci, setCIs] = useState([])
  const [cc, setCCs] = useState([])
  const [hod, setHODs] = useState([])
  const [ta, setTAs] = useState([])
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

    const fetchHR = async () => {
      await
        axios.get('http://localhost:8000/hr/viewHR', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setHr(res.data)
          });
    };
    fetchHR();

    const fetchCI = async () => {
      await
        axios
          .get('http://localhost:8000/hr/viewCIs', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setCIs(res.data)
          });

    };
    fetchCI();

    const fetchTA = async () => {

      await axios
        .get('http://localhost:8000/hr/viewTAs', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => {
          setTAs(res.data)
        });

    };
    fetchTA();

    const fetchHOD = async () => {
      await
        axios
          .get('http://localhost:8000/hr/viewHODs', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setHODs(res.data)
          });
    };
    fetchHOD();

    const fetchCC = async () => {
      await
        axios
          .get('http://localhost:8000/hr/viewCCs', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setCCs(res.data)
          });
    };
    fetchCC();





  }, [])


  return (


    <div >
      <br />
      <button className='btn'  style={{height: "50px"}}>
        <Link to='/hr/addStaff'>
         <li> Add Academic Member </li> 
            </Link>  </button> &nbsp;

      <button className='btn'  style={{height: "50px"}} >
        <Link to='/hr/addHR'>
        <li>  
          Add HR Members </li> 
        </Link>  </button>

      <br />      <hr />
<br />

      <h2>Heads of Departments</h2>
      <ul >
        {hod.map((st, i) => {
          return <li key={st._id}>
            <StaffMember st={st} />
          </li>
        })}
      </ul> <br />

      <h2>Course Instructors</h2>
      <ul >
        {ci.map((st, i) => {
          return <li key={st._id}>
            <StaffMember st={st} />
          </li>
        })}
      </ul> <br />

      <h2>Teaching Assistants</h2>
      <ul >
        {ta.map((st, i) => {
          return <li key={st._id}>
            <StaffMember st={st} />
          </li>
        })}
      </ul><br />


      <h2>Course Coordinators</h2>
      <ul >
        {cc.map((st, i) => {
          return <li key={st._id}>
            <StaffMember st={st} />
          </li>
        })}
      </ul><br /><br />

      <h2>HR members</h2>
      <ul >
        {hr.map((st, i) => {
          return <li key={st._id}>
            <StaffMember st={st} />
          </li>
        })}
      </ul>
    </div>




  )

}


