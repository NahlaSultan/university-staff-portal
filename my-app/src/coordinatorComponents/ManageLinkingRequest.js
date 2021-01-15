import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from '../academicMembersComponents/ViewSlots'
import { Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
export default function ManageLinkingRequest() {
    const [SlotToView, setTheSlot] = useState([])
    const [SlotLinkingRequest, setSlotLinkingRequest] = useState([])
    const [slotLinkingHeader, setSlotLinkingHeader] = useState("")
    const [toggle, setToggle] = useState(true)
    const [headerText, setHeaderText] = useState("")
    let history = useHistory()
    useEffect(() => {
        axios
            .get('http://localhost:8000/coordinator/viewSlotLinkingRequest', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setSlotLinkingRequest(res.data)
                if (res.data != "not staff" && res.data.length != 0) {
                    setSlotLinkingHeader("Slot Linking Requests")
                }
                if (res.data.length == 0) {
                    setSlotLinkingHeader("No requests")
                }
            });
    }, [])

    useEffect(() => {
        const checkToken = async () => {
            if (localStorage.getItem('token')) {
                console.log("TOKENS")
                await axios
                    .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token') })
                    .then(res => {
                        if (!res.data.includes('courseCoordinators')) {
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
    function HandleAccepted(e) {
        const body = { requestID: e.target.value }
        console.log(body)
        axios
            .post('http://localhost:8000/coordinator/acceptSlotLinkingRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setHeaderText(res.data)

            })
    }
    function HandleRejected(e) {
        const body = { requestID: e.target.value }
        console.log(body)
        axios
            .post('http://localhost:8000/coordinator/rejectSlotLinkingRequest', body, { headers: { 'token': localStorage.getItem('token') } })
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
                        <h4 className="elemntsInside">Sender ID: {item.senderId}</h4>
                        <div className="divider">
                            <button value={item.slotID} className="btn" onClick={HandleViewAttendance}>
                                View Slot Details
                            </button>
                            <button value={item._id} className="btn" onClick={HandleAccepted}>
                                Accept Request
                            </button>
                            <button value={item._id} className="btn" onClick={HandleRejected}>
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