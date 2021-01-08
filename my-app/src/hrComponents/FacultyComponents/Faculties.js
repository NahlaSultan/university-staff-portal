import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styling/main.css';

import Faculty from './Faculty'



export default function Faculties() {
  const [faculties, setFaculties] = useState([])

  useEffect(() => {
    // Update the document title using the browser API

    const fetchData = async () => {
      await
        axios
          .get('http://localhost:8000/hr/viewFaculties', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setFaculties(res.data)
          });
    };
    fetchData();

  }, []);




  return (


    <div>

      <Link to='/AddFaculty'>
        <li > Add Faculty  </li>
      </Link>

      <hr />
      <br />
      <h1>Faculties</h1>
      <table className="table">
        <tr className="th">
          <th>Faculty Name</th>
          <th>Manage Faculty </th>
          <th>Add Department</th>
          <th>View Departments</th>
        </tr>


        {faculties.map((fac, i) => {
          return <tr key={fac._id}>
            <Faculty fac={fac} />
          </tr>
        })}


      </table>


    </div>




  )

}
