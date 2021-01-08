import AttendanceRecord from './AttendanceRecord';
import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styling/main.css';

export default function ViewAttendance() {
    const idRef = useRef()

    const [attendance, setAttendance] = useState([])




    function HandleViewAttendance() {

        const body = { id: idRef.current.value }

        axios
            .post('http://localhost:8000/hr/viewAttendance', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setAttendance(res.data)
                console.log(attendance)
            }
            ).catch(error => {
                console.log(error)
            })

        document.getElementById('idInput').value = ''
    }



    return (
        <div>
            <br />
            <br />

            <div>
                <input required={true} ref={idRef} className="input100" id="idInput" placeholder="Staff Member ID ac-xx hr-xx" />
                <span className="focus-input100"></span>
                <span className="symbol-input100"></span>
                <br />
            </div>

            <div className="container-login100-form-btn">
                <button onClick={HandleViewAttendance} className="login100-form-btn">
                    View Attendace
				</button>
            </div>
            <div>
                <h3>Attendace:</h3>
                <AttendanceRecord attendance={attendance} />
            </div>

        </div>
    )
}


