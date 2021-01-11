import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
export default function Requests() {
    const [changeDay, setChangeDay] = useState(false)
    const [cancelDay, setCancelDay] = useState(false)
    const [slotLinking, setSlotLinking] = useState(false)
    const [cancelSlot, setCancelSlot] = useState(false)
    const [replacement, setReplacement] = useState(false)
    const [manageReplacement, setManageReplacement] = useState(false)
    const [sendLeave, setSubmitLeave] = useState(false)
    const [cancelleave, setCancelLeave] = useState(false)
    const [viewStatus, setViewStatus] = useState(false)
    const [viewAccepted, setAccepted] = useState(false)
    const [viewRejected, setRejected] = useState(false)
    const [viewPending, setPending] = useState(false)
    function HandleDayOff(e) {
        setChangeDay(true)
    }
    function ManageDayOff() {
        setCancelDay(true)
        // <Redirect to="/staffProfile" />
        // Redirect to cancel request whe I do it
    }
    function SendSlotLinkingRequests() {
        setSlotLinking(true)

    }
    function ManageSlotLinking() {
        setCancelSlot(true)

    }
    function SendReplacementRequest() {
        setReplacement(true)
    }
    function ManageReplacementRequest() {
        setManageReplacement(true)
    }
    function submitLeave() {
        setSubmitLeave(true)
    }
    function manageLeave() {
        setCancelLeave(true)
    }
    function status() {
        setViewStatus(true)
    }
    function penidng() {
        setPending(true)
    }
    function rejected() {
        setRejected(true)
    }
    function accepted() {
        setAccepted(true)
    }

    if (changeDay == true) {
        return (
            <Redirect to="/academic/changeDayOff" />
        )
    }
    if (cancelDay == true) {
        return (
            <Redirect to="/academic/Requests/CancelDayOff" />
        )
    }
    if (slotLinking == true) {
        return (
            <Redirect to="/academic/SendSlotLinkingRequest" />
        )
    }
    if (cancelSlot) {
        return (
            <Redirect to="/academic/Requests/CancelSlotLinking" />
        )
    }
    if (replacement) {
        return (
            <Redirect to="/academic/manageReplacement" />
        )
    }
    if (manageReplacement) {
        return (
            <Redirect to="/academic/ViewReplacementRequest" />

        )
    }
    if (sendLeave) {
        return (
            <Redirect to="/academic/SubmitLeaveRequest" />
        )
    }
    if (cancelleave) {
        return (
            <Redirect to="/academic/Requests/CancelLeaveRequest" />
        )
    }
    if (viewStatus) {
        return (
            <Redirect to="/academic/Requests/ViewStatus" />
        )
    }
    if (viewAccepted) {
        return (
            <Redirect to="/academic/Requests/ViewAccepted" />
        )

    }
    if (viewRejected) {
        return (
            <Redirect to="/academic/Requests/ViewRejected" />
        )

    }
    if (viewPending) {
        return (
            <Redirect to="/academic/Requests/ViewPending" />
        )

    }

    else {
        return (
            <>
                <div className="whole">
                    <br></br>
                    <button value="View Status" className="dropbtn" onClick={status} >View Status Of Requests</button>
                    <button value="View Accepted" className="dropbtn" onClick={accepted} >View Accepted Requests</button>
                    <button value="View Status" className="dropbtn" onClick={rejected} >View Rejected Requests</button>
                    <button value="View Status" className="dropbtn" onClick={penidng} >View Pending Requests</button>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                <div>
                    <h1>Day Off Requests:</h1>
                    <button value="DayOff" className="btn" onClick={HandleDayOff}>Send Day Off Request </button>
                    <br></br>
                    <br></br>
                    < button value="DayOff" className="btn" onClick={ManageDayOff} > Cancel Day Off Request </button >
                </div >
                <br></br>
                <div>
                    <h1>Slot Linking Requests:</h1>
                    <button value="DayOff" className="btn" onClick={SendSlotLinkingRequests}>Send Slot Linking Request </button>
                    <br></br>
                    <br></br>
                    <button value="DayOff" className="btn" onClick={ManageSlotLinking}>Cancel Slot Linking Request </button>
                </div>
                <div>
                    <h1>Replacement Requests:</h1>
                    <button value="DayOff" className="btn" onClick={SendReplacementRequest}>Send Replacement Request </button>
                    <br></br>
                    <br></br>
                    <button value="DayOff" className="btn" onClick={ManageReplacementRequest}>Manage Replacement Request </button>
                </div>
                <div>
                    <h1>Leave Requests:</h1>
                    <button value="DayOff" className="btn" onClick={submitLeave}>Submit Leave Request </button>
                    <br></br>
                    <br></br>
                    <button value="DayOff" className="btn" onClick={manageLeave}>Manage Leave Request </button>
                </div>

            </>
        )
    }
}
