import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from './ViewSlots'
export default function CancelSlotLinking() {
    const [SlotToView, setTheSlot] = useState([])
    const [SlotLinkingRequest, setSlotLinkingRequest] = useState([])
    const [slotLinkingHeader, setSlotLinkingHeader] = useState("")
    const [toggle, setToggle] = useState(true)
    const [headerText,setHeaderText]=useState("")
    axios
        .get('http://localhost:8000/academicMembers/viewStatusSlotLinking', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => {
            setSlotLinkingRequest(res.data)
            if (res.data != "not staff" && res.data.length != 0) {
                setSlotLinkingHeader("Slot Linking Requests")
            }
            if( res.data.length == 0){
                setSlotLinkingHeader("No requests")
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
    function HandleCancel(e){
        const body = {requestId:e.target.value}
        // console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/cancelSlotLinkingRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setHeaderText(res.data)

            })
    }
    return (
        <div>
            <h1>{headerText}</h1>
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
                        <div className="divider">
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
            <ul> <Slot SlotToView={SlotToView} /> </ul>
            <hr></hr>
        </div>
    )
}
