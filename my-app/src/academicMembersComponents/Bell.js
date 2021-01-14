import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from './ViewSlots'
import Replacements from './ViewReplacement'
export default function Bsell() {
    const [staff, setStaff] = useState("")
    const [dayOffHeader, setDayOffHeader] = useState("")
    const [dayOff, setDayOff] = useState([])
    const [replacementHeader, setReplacementHeader] = useState("")
    const [replacement, setReplacement] = useState([])
    const [slotLinkingHeader, setSlotLinkingHeader] = useState("")
    const [slotLinking, setSlotLinking] = useState([])
    const [leaveHeader, setLeaverHeader] = useState("")
    const [leave, setLeave] = useState([])
    ////////////////////////////
    const [toggle, setToggle] = useState(true)
    const [SlotToView, setTheSlot] = useState([])
    const [SlotToView1, setTheSlot1] = useState([])
    const [ReplacementToView, setTheReplacement] = useState([])
    const [toggleReplacement, setToggleReplacement] = useState(true)
    useEffect(() => {
        axios
            .get('http://localhost:8000/academicMembers/viewNotificaitons', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setStaff(res.data[0])
                setDayOff(res.data[0])

                if (res.data[0].length > 0) {
                    setDayOffHeader("Accepted/Rejected Day Off Request: ")
                }
                setReplacement(res.data[1])
                if (res.data[1].length > 0) {
                    setReplacementHeader("Accepted/Rejected Replacement Requests:")
                }
                setSlotLinking(res.data[2])
                if (res.data[2].length > 0) {
                    setSlotLinkingHeader("Accepted/Rejected SlotLinking Requests:")
                }
                setLeave(res.data[3])
                console.log(res.data[3])
                if (res.data[3].length > 0) {
                    setLeaverHeader("Accepted/Rejected Leave Requests:")
                }

            });
    }, [])
    function HandleViewAttendance(e) {
        if (toggle) {
            console.log("Entered")
            const body = { numberID: e.target.value }
            axios
                .post('http://localhost:8000/viewCertainSlot', body)
                .then(res => {
                    setTheSlot(res.data)
                    console.log(SlotToView)
                }
                ).catch(error => {
                    console.log(error)
                })
        }
        else {
            console.log(SlotToView)
            setTheSlot([])

        }
        setToggle(!toggle);
        //  console.log(toggle)
    }
    function HandleViewAttendance1(e) {
        if (toggle) {
            console.log("Entered")
            const body = { numberID: e.target.value }
            axios
                .post('http://localhost:8000/viewCertainSlot', body)
                .then(res => {
                    setTheSlot1(res.data)
                    console.log(SlotToView)
                }
                ).catch(error => {
                    console.log(error)
                })
        }
        else {
            console.log(SlotToView)
            setTheSlot1([])

        }
        setToggle(!toggle);
        //  console.log(toggle)
    }
    function HandleViewReplacement(e) {
        if (toggleReplacement) {
            console.log("Entered")
            //  console.log(e.target.value)
            const body = { replacementID: e.target.value }
            // console.log(body)
            axios
                .post('http://localhost:8000/academicMembers/viewCertainReplacement', body, { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    console.log(res.data)
                    setTheReplacement([res.data])
                    console.log(ReplacementToView)
                }
                    // ).catch(error => {
                    //     console.log(error)
                    //}
                )
        }
        else {
            console.log(ReplacementToView)
            setTheReplacement([])

        }
        setToggleReplacement(!toggleReplacement);
        //  console.log(toggle)
    }
    return (
        < div >
            <h1>{dayOffHeader}</h1>

            <ul>
                {dayOff.map((item, i) => {
                    return <li key={i}>
                        <h2>Accepted: {item.accepted + ""}</h2>
                        <h4 className="elemntsInside">new Day: {item.day}</h4>
                        <h4 className="elemntsInside">Reasons: {item.comment}</h4>
                    </li>
                })}
            </ul>
            <hr></hr>
            <h1>{slotLinkingHeader}</h1>
            <ul>
                {slotLinking.map((item, i) => {
                    return <li key={i}>
                        <h2>Accepted: {item.accepted + ""}</h2>
                        <h4 className="elemntsInside">Slot: {item.slotID}</h4>
                        <div className="divider">
                            <button value={item.slotID} className="btn" onClick={HandleViewAttendance}>
                                View Slot Details
                            </button>
                        </div>
                        <br></br>
                        <br></br>

                    </li>
                })}
            </ul>
            <hr></hr>
            <ul> <Slot SlotToView={SlotToView} /> </ul>
            <hr></hr>
            <h1>{leaveHeader}</h1>
            <br></br>
            <ul>
                {leave.map((item, i) => {
                    return <li key={i}>
                        <h2>Accepted: {item.accepted + ""}</h2>
                        <h3 className="elemntsInside">Type: {item.type}</h3>
                        <h4 className="elemntsInside">ID: {item._id}</h4>
                        <h4 className="elemntsInside">Start Date: {item.start}</h4>
                        <h4 className="elemntsInside">End Date: {item.end}</h4>
                        <h4 className="elemntsInside">Submission Date: {item.submission}</h4>
                        <h4 className="elemntsInside">Document Links: {item.documentLinks}</h4>
                        <h4 className="elemntsInside">Reasons: {item.commentWhySent}</h4>

                        <div className="divider">
                            <button value={item.replacementRequest} className="btn" onClick={HandleViewReplacement}>
                                View Replacement Details
                            </button>
                        </div>
                        <br></br>
                        <br></br>
                    </li>
                })}
            </ul>
            <hr></hr>
            <ul> <Replacements ReplacementToView={ReplacementToView} /> </ul>
            <hr></hr>
            <h1>{replacementHeader}</h1>
            <ul>
                {replacement.map((item, i) => {
                    return <li key={i}>
                        <h2>Accepted: {item.accepted + ""} </h2>
                        <h4 className="elemntsInside">ReceiverID: {item.receiverId}</h4>
                        <h4 className="elemntsInside">Date: {item.date}</h4>
                        <br></br>
                        <div className="divider">
                            <button value={item.slot} className="btn" onClick={HandleViewAttendance1}>
                                View Slot Details
                           </button>
                        </div>
                    </li>
                })}

            </ul>
            <hr></hr>
            <ul>
                <Slot SlotToView={SlotToView1} /> </ul>
            <hr></hr>

        </div >
    )
}
