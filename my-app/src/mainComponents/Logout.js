import '../styling/App.css'
import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function Logout() {
  let history = useHistory()
  localStorage.removeItem("token");

  useEffect(() => {

    const fetchData = async () => {
      await
        axios
          .get('http://localhost:8000/logOut', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            console.log(res.data)
          });
    };
    fetchData();

    
    history.push('/')
  }, []);
  return (
    <div className='App'>
      <h1> Log out here</h1>

    </div>

  )

}

