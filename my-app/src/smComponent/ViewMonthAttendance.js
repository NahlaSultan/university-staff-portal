import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import MonthAttendance from './MonthAttendance'
import {useHistory} from 'react-router-dom'

export default function ViewMonthAttendance() {
    const [attendance, setAttendance] = useState([])
    const monthRef = useRef()
    let history = useHistory()
    useEffect(() => {

        if (localStorage.getItem('token')) {
            console.log("TOKENS")
        }
        else {
            console.log("NOT TOKENS")
            history.push('/')

        }

    }, []);



    function HandleViewMonthAttendance() {
        const body = { month: monthRef.current.value }


        axios
            .post('http://localhost:8000/viewMonthAttendance', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setAttendance(res.data)
                console.log("here")
                console.log(res.data)
            });

    }
    return (
        <>
            <div >
                <div className="viewMonthAttendance">


                    <span className="login100-form-title">
                        View Month Attendance
        </span>
                    <br></br>
                    <br></br>


                    <div>
                        <input required={true} ref={monthRef} className="input100" name="Month" placeholder="specify a month" />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                        </span>
                        <br />
                    </div>


                </div>

                <br></br>
                <br></br>
                <div >
                    <button className="btn" onClick={HandleViewMonthAttendance} style={{ height: "50px" }} > View Attendance </button>


                    <br></br>
                    <br></br>
                    <br></br>
                    <ul> <MonthAttendance attendance={attendance} /> </ul>
                </div>

            </div>

        </>
    )



}