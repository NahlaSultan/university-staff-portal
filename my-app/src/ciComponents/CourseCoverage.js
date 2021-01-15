import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import { Link, useHistory } from 'react-router-dom'
export default function CourseCoverage() {
  const [coverage, setCoverage] = useState([])
  let history = useHistory()
  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem('token')) {
        console.log("TOKENS")
        await axios
          .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token') })
          .then(res => {
            if (!res.data.includes('courseInstructors')) {
              history.push('/error')
            }
          });
      }
      else {
        console.log("NOT TOKENS")
        history.push('/')

      }

    }
    checkToken()
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
    axios
      .get('http://localhost:8000/ci/viewCoverage', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setCoverage(res.data)

      });
  });

  return (


    <div>
      <h2>Course/s Coverage:</h2>
      <ul>
        {coverage.map((item, i) => {
          return <li key={i}>{item}</li>
        })}
      </ul>
    </div>




  )

}