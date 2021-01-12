import React, { useRef, useState, useEffect } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from './ViewSlots'
export default function ViewReplacementRequest() {
    const [replacementSent, setReplacementSent] = useState([])
    const [replacementReceived, setReplacementReceived] = useState([])
    const [counter, setCounter] = useState(0)
    const [toggle, setToggle] = useState(true)
    const [SlotToView, setTheSlot] = useState([])
    const [SlotToView1, setTheSlot1] = useState([])
    const [headerText, setHeaderText] = useState("")
    useEffect(() => {
        if (counter <= 20) {
            setCounter(counter + 1)
            axios
                .get('http://localhost:8000/academicMembers/viewReplacementRequestSent', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setReplacementSent(res.data)
                    console.log(res.data)
                });
            axios
                .get('http://localhost:8000/academicMembers/viewReplacementRequestReceived', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setReplacementReceived(res.data)
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
    function HandleCancel(e) {
        const body = { requestID: e.target.value }
        // console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/cancelReplacementRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log("I am here")
                console.log(res.data)
                setHeaderText(res.data)

            })

    }
    function HandleAccept(e) {
        const body = { slotID: e.target.value }
        // console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/acceptReplacementRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log("I am here")
                console.log(res.data)
                setHeaderText(res.data)

            })
    }
    function HandleReject(e) {
        const body = { slotID: e.target.value }
        // console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/rejectReplacementRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log("I am here")
                console.log(res.data)
                setHeaderText(res.data)

            })

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
    return (
        <div>
            <Link to='/academic/Requests' className="linkPrev">&laquo;</ Link> <br />
            <h1>Request Sent:</h1>
            <h2>{headerText}</h2>
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
                            <button value={item.slot} className="btn" onClick={HandleViewAttendance1}>
                                View Slot Details
                           </button>
                            <button value={item._id} className="btn" onClick={HandleCancel}>
                                Cancel Request
                           </button>
                        </div>
                        <br></br>
                        <br></br>
                    </li>
                })}

            </ul>
            <hr></hr>
            <ul> <Slot SlotToView={SlotToView1} /> </ul>
            <hr></hr>
            <h1>Requests Received:</h1>
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
                            <button value={item.slot} className="btn" onClick={HandleViewAttendance}>
                                View Slot Details
                            </button>
                        </div>
                        <div className="divider">
                            <button value={item._id} className="btn" onClick={HandleAccept}>
                                Accept Request
                            </button>
                            <button value={item._id} className="btn" onClick={HandleReject}>
                                Reject Request
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
        </div>
    )
}
