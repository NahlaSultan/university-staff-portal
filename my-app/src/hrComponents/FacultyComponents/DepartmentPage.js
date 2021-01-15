import React, { useState ,useEffect} from 'react'
import '../../styling/main.css';
import '../../styling/tables.css';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import { useLocation } from "react-router-dom";
import Department from './Department'

function DepartmentPage() {
    let locationReact=useLocation()
    const facultyName = locationReact.state.facultyName
    const [departmentArray,setDepartmentArray] = useState([])
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
              .post('http://localhost:8000/hr/viewDepartments',{fac: facultyName}, { headers: { 'token': localStorage.getItem('token') } })
              .then(res => {
                setDepartmentArray(res.data)
              });
        };
        fetchData();
    
      }, [departmentArray]);

    return (

        <>
        <br/>
        <Link to='/hr/faculties' className="linkPrev">&laquo;</ Link> <br/>

        <h1>{facultyName}    </h1>
        <table className="table">
            <tr className="th">
            <th>Department Name</th>
            <th>Head Of Departments</th>
            <th>Courses</th>
            <th>Manage Department</th>
            <th>Manage Courses</th>

            </tr>

     
                {departmentArray.map((dep, i) => {
                    return <tr className="th" key={dep._id}>  
                    <Department facultyName={facultyName} dep={dep} />  
                        </tr>
                        })}
      
   
        </table>
        </>
    )
}

export default DepartmentPage

