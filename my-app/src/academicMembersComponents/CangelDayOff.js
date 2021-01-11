import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
export default function CangelDayOff() {
    const [dayOffHeader, setDayOffHeader] = useState("")
    const [DayOffRequest, setDayOff] = useState([])
    const [headerText, setHeaderText] = useState("")
    axios
        .get('http://localhost:8000/academicMembers/viewStatusDayOff', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => {
            setDayOff(res.data)
            if (res.data != "not staff" && res.data.length != 0) {
                setDayOffHeader("Day Off Request")
            }
            if (res.data.length == 0) {
                setDayOffHeader("No Requests")
            }
        });
    function HandleDayOff(e) {
        const body = {}
        // console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/cancelDayoffRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setHeaderText(res.data)

            })
    }
    return (
        <div>
            <h1>{headerText}</h1>
            <h1>{dayOffHeader}</h1>
            <ul>
                {DayOffRequest.map((item, i) => {
                    return <li key={i}>
                        <h3 className="elemntsInside">Pending: {item.pending + ""}</h3>
                        <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
                        <h4 className="elemntsInside">new Day: {item.day}</h4>
                        <h4 className="elemntsInside">Reasons: {item.comment}</h4>
                        <div className="divider">
                            <button value={item.slotID} className="btn" onClick={HandleDayOff}>
                                Cancel Request
                            </button>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}
