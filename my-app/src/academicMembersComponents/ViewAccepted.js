import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from './ViewSlots'
import Replacements from './ViewReplacement'
export default function ViewStatus() {
    const [dayOffHeader, setDayOffHeader] = useState("")
    const [slotLinkingHeader, setSlotLinkingHeader] = useState("")
    const [leaveRequestHeader, setLeaveRequestHeader] = useState("")
    const [replacementSentHeader, setReplacementHeaderSent] = useState("")
    const [replacementReceivedHeader, setReplacementHeaderReceived] = useState("")
    const [counter, setCounter] = useState(0)
    const [toggle, setToggle] = useState(true)
    const [SlotToView, setTheSlot] = useState([])
    const [SlotToView1, setTheSlot1] = useState([])
    const [ReplacementToView, setTheReplacement] = useState([])
    const [replacementSent, setReplacementSent] = useState([])
    const [replacementReceived, setReplacementReceived] = useState([])
    const [DayOffRequest, setDayOff] = useState([])
    const [SlotLinkingRequest, setSlotLinkingRequest] = useState([])
    const [LeaveRequests, setLeaveRequests] = useState([])
    const [toggleReplacement, setToggleReplacement] = useState(true)
    useEffect(() => {
        if (counter <= 3) {
            setCounter(counter + 1)
            axios
                .get('http://localhost:8000/academicMembers/viewAcceptedReplacementRequestSent', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setReplacementSent(res.data)
                    if (res.data != "Invalid staff member" && res.data.length != 0) {

                        setReplacementHeaderSent("Replacement Requests Sent")
                    }
                });
            axios
                .get('http://localhost:8000/academicMembers/viewAcceptedReplacementRequestReceived', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setReplacementReceived(res.data)
                    if (res.data != "Invalid staff member" && res.data.length != 0) {
                        console.log("I here")
                        setReplacementHeaderReceived("Replacement Requests Received")
                    }
                });
            axios
                .get('http://localhost:8000/academicMembers/viewAcceptedDayOff', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setDayOff(res.data)
                    if (res.data != "not staff" && res.data.length != 0) {
                        setDayOffHeader("Day Off Request")
                    }
                });
            axios
                .get('http://localhost:8000/academicMembers/viewAcceptedSlotLinking', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setSlotLinkingRequest(res.data)
                    if (res.data != "not staff" && res.data.length != 0) {
                        setSlotLinkingHeader("Slot Linking Requests")
                    }
                });
            axios
                .get('http://localhost:8000/academicMembers/viewAcceptedLeave', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setLeaveRequests(res.data)
                    if (res.data != "not staff" && res.data.length != 0) {
                        setLeaveRequestHeader("Leave Requests Received")
                    }
                });
        }
    });
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
        <div>
            <Link to='/academic/Requests'className="linkPrev">&laquo;</ Link> <br />
            <h1>{dayOffHeader}</h1>
            <ul>
                {DayOffRequest.map((item, i) => {
                    return <li key={i}>
                        <h3 className="elemntsInside">Pending: {item.pending + ""}</h3>
                        <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
                        <h4 className="elemntsInside">new Day: {item.day}</h4>
                        <h4 className="elemntsInside">Reasons: {item.comment}</h4>
                        <br></br>
                    </li>
                })}
            </ul>
            <hr></hr>
            <h1>{slotLinkingHeader}</h1>
            <ul>
                {SlotLinkingRequest.map((item, i) => {
                    return <li key={i}>
                        <h2>Slot Request</h2>
                        <h3 className="elemntsInside">Pending: {item.pending + ""}</h3>
                        <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
                        <h4 className="elemntsInside">Slot: {item.slotID}</h4>
                        <div className="divider">
                            <button value={item.slotID} className="btn" onClick={HandleViewAttendance}>
                                View Slot Details
                            </button>
                        </div>

                        <br></br>
                    </li>
                })}
            </ul>
            <hr></hr>
            <ul> <Slot SlotToView={SlotToView} /> </ul>
            <hr></hr>
            <h1>{leaveRequestHeader}</h1>
            <br></br>
            <ul>
                {LeaveRequests.map((item, i) => {
                    return <li key={i}>
                        <h2>Leave</h2>
                        <h3 className="elemntsInside">Type: {item.type}</h3>
                        <h4 className="elemntsInside">ID: {item._id}</h4>
                        <h4 className="elemntsInside">Pending: {item.pending + ""}</h4>
                        <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
                        <h4 className="elemntsInside">Start Date: {item.start}</h4>
                        <h4 className="elemntsInside">End Date: {item.end}</h4>
                        <h4 className="elemntsInside">Submission Date: {item.submission}</h4>
                        <h4 className="elemntsInside">Document Links: {item.documentLinks}</h4>
                        <h4 className="elemntsInside">Reasons: {item.commentWhySent}</h4>
                        <br></br>
                        <div className="divider">
                            <button value={item.replacementRequest} className="btn" onClick={HandleViewReplacement}>
                                View Replacement Details
                            </button>
                        </div>
                        <hr></hr>

                    </li>
                })}
            </ul>
            <ul> <Replacements ReplacementToView={ReplacementToView} /> </ul>
            <hr></hr>
            <h1>{replacementSentHeader}</h1>
            <ul>
                {replacementSent.map((item, i) => {
                    return <li key={i}>
                        <h1>Request: </h1>
                        <h3 className="elemntsInside">Pending: {item.pending + ""}</h3>
                        <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
                        <h4 className="elemntsInside">ReceiverID: {item.receiverId}</h4>
                        <h4 className="elemntsInside">Date: {item.date}</h4>
                        <br></br>
                        <div className="divider">
                            <button value={item.slot} className="btn" onClick={HandleViewAttendance}>
                                View Slot Details
                           </button>
                        </div>
                        <br></br>
                        <br></br>
                        <hr></hr>
                    </li>
                })}

            </ul>
            <ul>
                <Slot SlotToView={SlotToView} /> </ul>
            <hr></hr>
            <h1>{replacementReceivedHeader}</h1>
            <ul>
                {replacementReceived.map((item, i) => {
                    return <li key={i}>
                        <h1>Request: </h1>
                        <h3 className="elemntsInside">Pending: {item.pending + ""}</h3>
                        <h4 className="elemntsInside">Accepted: {item.accepted + ""}</h4>
                        <h4 className="elemntsInside">ReceiverID: {item.receiverId}</h4>
                        <h4 className="elemntsInside">Date: {item.date}</h4>
                        <br></br>
                        <div className="divider">
                            <button value={item.slot} className="btn" onClick={HandleViewAttendance1}>
                                View Slot Details
                            </button>

                        </div>
                        <hr></hr>
                    </li>
                })}

                <ul> <Slot SlotToView={SlotToView1} /> </ul>
                <hr></hr>

            </ul>
        </div>

    )
}
