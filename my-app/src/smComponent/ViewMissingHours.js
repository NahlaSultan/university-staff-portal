import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import { Link, useHistory } from 'react-router-dom'
export default function ViewMissingHours() {
  const [hours, setHours] = useState([])

  let history = useHistory()

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem('token')) {
        console.log("TOKENS")

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
      .get('http://localhost:8000/viewMissingHours', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setHours(res.data)
        console.log("here")
        console.log(res.data)
      });
  });

  return (


    <div>
      <h2>Missing Hours:</h2>
      <ul>
        {hours.map((item, i) => {
          return <li key={i}>{item}</li>
        })}
      </ul>
    </div>




  )

}