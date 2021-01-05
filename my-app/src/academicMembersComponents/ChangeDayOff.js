import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';

export default function ChangeDayOff() {
    const [dayOff, setDayOff] = useState("")
    const [Day, setDay] = useState("")
    const [headerText, setHeaderText] = useState("")
    const ReasonRef = useRef()
    useEffect(() => {
        axios
            .get('http://localhost:8000/academicMembers/dayOff', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setDayOff(res.data)
            })
    });
    function HandleDay(e) {
        setDay(e.target.value)
    }
    function HandleSubmitRequest() {
        const body = { day: Day, reason: ReasonRef.current.value }
        axios
            .post('http://localhost:8000/academicMembers/sendChangeDayOff', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setHeaderText(res.data)
                console.log(res.data)
            })
    }

    return (
        <div>
            <h1>{headerText}</h1>
            <h1>Current DayOff : {dayOff}</h1>
            <br></br>
            <br></br>
            <br></br>
            <label className='textDown'> New Day Off: </label>

            <select className='dropbtn' name="types" id="type" onChange={HandleDay}>
                <option value="">Choose day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
            </select>
            <br></br>
            <br></br> <br></br>
            <h1>Reason: <input ref={ReasonRef} className="input100" type="text" name="pass" placeholder="Reason" /></h1>
            <br></br>
            <br></br>
            <div className="buttons">
                <button onClick={HandleSubmitRequest} className="buttons">
                    Submit Request
						</button>
            </div>
            <br></br>
            <br></br>
        </div>
    )
}
