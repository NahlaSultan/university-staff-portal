import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import CourseStaff from './CourseStaff'
import { Link, useHistory } from 'react-router-dom'
export default function ViewCourseStaff() {
    const [staff, setStaff] = useState([])
    const courseNameRef = useRef()


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
    function HandleViewCourseStaff() {
        const body = { courseName: courseNameRef.current.value }

        axios
            .post('http://localhost:8000/ci/viewCourseStaff', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setStaff(res.data)
                console.log("here")
                console.log(res.data)
            });

    }
    return (
        <>
            <div >
                <div className="viewCourseStaff">


                    <span className="login100-form-title">
                        View Course Staff
        </span>
                    <br></br>
                    <br></br>


                    <div>
                        <input required={true} ref={courseNameRef} className="input100" name="memberID" placeholder="Course Name" />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        </span>
                        <br />
                    </div>


                </div>

                <br></br>
                <br></br>
                <div className="buttons">
                    <button onClick={HandleViewCourseStaff} className="buttons">
                        View Staff
          </button>
                    <br></br>
                    <ul> <CourseStaff staff={staff} /> </ul>
                </div>

            </div>

        </>
    )



}