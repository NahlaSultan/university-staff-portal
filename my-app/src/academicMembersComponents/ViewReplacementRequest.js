import React, { useRef, useState, useEffect } from 'react'
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
    useEffect(() => {
        if (counter <= 1) {
            setCounter(counter + 1)
            axios
                .get('http://localhost:8000/academicMembers/viewReplacementRequestSent', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setReplacementSent(res.data)
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
    return (
        <div>
            <h1>Request Sent:</h1>
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
                            <ul> <Slot SlotToView={SlotToView} /> </ul>
                        </div>
                        <br></br>
                        <br></br>
                    </li>
                })}

            </ul>
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
                        <ul> <Slot SlotToView={SlotToView} /> </ul>
                        <div className="divider">
                            <button value={item.slot} className="btn" onClick={HandleViewAttendance}>
                                View Slot Details
                            </button>

                        </div>
                        <br></br>
                        <br></br>
                    </li>
                })}

            </ul>
        </div>
    )
}
