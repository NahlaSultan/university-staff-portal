import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import { Link, useHistory } from 'react-router-dom'
export default function ViewMissingDays() {
  const [days, setDays] = useState([])


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
      .get('http://localhost:8000/viewMissingDays', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setDays(res.data)
        console.log("here")
        console.log(res.data)
      });
  });

  return (


    <div>
      <h2>Missing Days:</h2>
      <ul>

        {days.map((item, i) => {
          return <li key={i}>{item} </li>
        })}
        <br />
      </ul>
    </div>




  )

}