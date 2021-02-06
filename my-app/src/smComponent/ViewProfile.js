import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/profile.css';

import { useHistory } from 'react-router-dom';
export default function ViewProfile() {
  const [staff, setStaff] = useState([{
    name:"",role:"",salary:"",monthSalary:"", courses:"",faculty:"",department:"",memberID:"",email:""
  }])

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

      const getStaffMember = async () => {
        axios
        .get('http://localhost:8000/viewProfile', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => {
          setStaff(res.data)
  
        });
  
      }
      getStaffMember()
    }, [staff]);
 

  
  
  return (
<>
      <div class="wrapper">
        <div class="left">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
            alt="user" width="100"/>
            <h3>{staff[0].name}</h3>
            <h4>{staff[0].role}</h4>
        </div>

          <div class="right">
            <div class="info">
              <h3>Information</h3>
              <div class="info_data">
                <div class="data">
                  <h4>Email</h4>
                  <p>{staff[0].email}</p>
                </div>
                <div class="data">
                  <h4>ID</h4>
                  <p>{staff[0].memberID}</p>
                </div>
              </div>
            </div>

            <div class="projects">
              <h3>Academic Info</h3>
              <div class="projects_data">
                <div class="data">
                  <h4>Courses</h4>
                  <p>{staff[0].courses}</p>
                </div>
                <div class="data">
                  <h4>Faculty</h4>
                  <p>{staff[0].faculty}</p>
                  <p>{staff[0].department}</p>

                </div>
                <div class="data">
                  <h4>Department</h4>
                  <p>{staff[0].department}</p>

                </div>
              </div>
            </div>

            <div class="projects">
              <h3>Financial Info</h3>
              <div class="projects_data">
                <div class="data">
                  <h4>Salary</h4>
                  <p>{staff[0].salary}</p>
                </div>
                <div class="data">
                  <h4>Salary after deduction</h4>
                  <p>{staff[0].monthSalary}</p>

                </div>
              </div>
            </div>


          </div>
        </div>

  </>


  )
}


