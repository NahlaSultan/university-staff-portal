import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import { Link, useHistory } from 'react-router-dom'
export default function ViewSlots() {
  const [slots, setSlots] = useState([])
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
      .get('http://localhost:8000/ci/viewSlots', { headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setSlots(res.data)
        // console.log("here")
        // console.log(res.data)
      });
  });

  return (


    <div>
      <h2>My Slots:</h2>
      <ul>
        {slots.map((item, index) => (
          <ul>
            {item.map((slot, index) => {
              return <li key={slot}>
                <ul> Type: {slot.type} </ul>
                <ul> Time: {slot.time} </ul>
                <ul> Day: {slot.day} </ul>
                <ul> Location: {slot.location} </ul>
                <ul> Course: {slot.courseTaught} </ul>
                <br />
              </li>
            })}
          </ul>
        ))}
      </ul>
    </div>




  )

}
