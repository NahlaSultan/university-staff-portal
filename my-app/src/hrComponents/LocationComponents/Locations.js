import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import Location from './Location'
import { Link } from 'react-router-dom'


export default function Locations() {
  const [locations, setLocations] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      await
        axios
          .get('http://localhost:8000/hr/viewLocations', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setLocations(res.data)
          });
    };
    fetchData();

  }, [locations]);

  return (


    <div>
      <br />
      <button className='btn' style={{ height: "50px" }}>
        <Link to='/hr/addLocation'>
          <li> Add New Location </li>
        </Link>  </button>
      <hr />
      <br />
      <h2>Locations</h2>
      <ul>
        {locations.map((loc, i) => {
          return <li key={loc._id}>
            <Location loc={loc} />
          </li>
        })}
      </ul>
    </div>




  )

}

