import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
export default function RemoveAssignedCourse() {
    const memberIDRef = useRef()
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState("")
    const [message, setMessage] = useState("")

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

    async function HandleCourses(e) {
        await setCourse(e.target.value)
        console.log(Location)
    }
    function HandleRemoveCourse() {
        const body = { memberID: memberIDRef.current.value, courseName: course }
        //  console.log(body)

        axios
            .post('http://localhost:8000/ci/removeAssignedCourse', body, { headers: { 'token': localStorage.getItem('token') } })

            .then(res => {
                console.log(res.data)
                setMessage(res.data)});
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
                <div className="RemoveAssignedCourse">


                    <span className="login100-form-title">
                        Remove Assigned Course
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
                    <label className='textDown'>Choose a course: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleCourses}>
                        <option value="">Choose a Course</option>
                        {courses.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>


                </div>
                <br></br>
                <br></br>
                <r1> {message}</r1>
                <br></br>
                <br></br>
                <br></br>
                <div className="buttons">
                    <button onClick={HandleRemoveCourse} className="buttons">
                        Remove Course
      </button>
                </div>

            </div>

        </>
    )
}

