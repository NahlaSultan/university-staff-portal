import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from './ViewSlots'
export default function ViewReplacement({ ReplacementToView }) {
    const [toggle, setToggle] = useState(true)
    const [SlotToView, setTheSlot] = useState([])
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
            <ul>

                {ReplacementToView.map((item, i) => {
                    <h2>Replacement Details:</h2>
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
