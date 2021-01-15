import React, { useRef, useState, useEffect } from 'react'
import '../styling/main.css';
import '../styling/dropDown.css';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
export default function AssignCourse() {
    const memberIDRef = useRef()
    const courseRef = useRef()
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState("")
    const [message, setMessage] = useState("")

    let history = useHistory()
    useEffect(() => {
        const checkToken = async()=>{
            if(localStorage.getItem('token')){
              console.log("TOKENS")
              await axios
              .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
              .then(res => {
              if(!res.data.includes('courseInstructors')) {
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
    },[]);

    async function HandleCourses(e) {
        await setCourse(e.target.value)
        console.log(Location)
    }
    function HandleAssCourse() {
        const body = { memberID: memberIDRef.current.value, courseName: course }

        axios
            .post('http://localhost:8000/ci/updateAssignedCourse', body, { headers: { 'token': localStorage.getItem('token') } })

            .then(res => setMessage(res.data));

    }
    axios
        .get('http://localhost:8000/ci/loadCourses', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => {
            setCourses(res.data)
            //console.log(res.data)

        });
    return (
        <>
            <div >
                <div className="assignCourse">


                    <span className="login100-form-title">
                        Assign Course
    </span>


                    <div>
                        <input required={true} ref={memberIDRef} className="input100" name="memberID" placeholder="Member ID" />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        </span>
                        <br />
                    </div>
                    <br></br>
                    <br></br>
                    <div className='whole'>
                        <label className='textDown'>Choose a Course: </label>
                        <select className='dropbtn' name="types" id="type" onChange={HandleCourses}>
                            <option value="">Choose a Course</option>
                            {courses.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <br></br>
                <br></br>
                <r1> {message}</r1>
                <br></br>
                <br></br>
                <br></br>
                <div className="buttons">
                    <button onClick={HandleAssCourse} className="buttons">
                        Assign Course
      </button>
                </div>

            </div>

        </>
    )

}

