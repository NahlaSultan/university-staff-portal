import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/App.css'
import '../styling/dropDown.css'
import Slot from './ViewSlots'
import { Link } from 'react-router-dom'
export default function SubmitLeaveRequest() {
    const [type, setType] = useState("")
    const [headerText, setHeaderText] = useState("")
    const DateRef = useRef()
    const EndRef = useRef()
    const Documents = useRef()
    const Comments = useRef
    const [replacementID, setReplacementID] = useState("")
    const [replacementSent, setReplacementSent] = useState([])
    const [replacementReceived, setReplacementReceived] = useState([])
    const [counter, setCounter] = useState(0)
    const [toggle, setToggle] = useState(true)
    const [SlotToView, setTheSlot] = useState([])
    function HandleChoice(e) {
        setType(e.target.value)
        console.log(type)
    }
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
                    console.log(res.data)
                    setReplacementReceived(res.data)

                });
        }
    });
    //set type"" once you submit the leave request
    function submitAnnualLeave() {
        const body = { type: "Annual", start: DateRef.current.value, replacementRequestID: "5fe6476ba4f2e5bb7c04fe25" }
        console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/submitLeave', body, { headers: { 'token': localStorage.getItem('token') } })

            .then(res => {
                console.log(res.data)
                if (res.data == "Successfully submitted") {
                    setType("")
                }
                else {
                    setHeaderText(res.data)
                }


            });
    }
    function submitSickLeave() {

    }
    function HandleReplacementID(e) {
        setReplacementID(e.target.value)
    }
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
    if (type == "") {
        return (
            <div>
                <button value="Compensation" className="btn" onClick={HandleChoice} >Compensation Leaves</button>
                <button value="Maternity" className="btn" onClick={HandleChoice} >Maternity Leaves</button>
                <button value="Sick" className="btn" onClick={HandleChoice} >Sick Leaves</button>
                <button value="Accidental" className="btn" onClick={HandleChoice} >Accidental Leaves</button>
                <button value="Annual" className="btn" onClick={HandleChoice} >Annual Leaves</button>
            </div>
        )
    }
    else if (type == "Compensation") {

    }
    else if (type == "Maternity") {

    }
    else if (type == "Sick") {
        return (
            <div>
                {/* <div> */}
                <h2>Start Date : </h2>
                <input required ref={DateRef} className="input100" type="date" name="email" placeholder="Date Of Leave" />
                <h2>End Date : <input required ref={EndRef} className="input100" type="date" name="email" placeholder="Date Of Leave" /></h2>
                <h2>Enter Links of your doctor report : <input required ref={Documents} className="input100" type="text" name="link" placeholder="Link" /></h2>
                {/* // <div>
                // </div>
                // <div>
               
                // </div>
                // <div>
                //     <h2>Comments: <input ref={Comments} className="input100" type="text" name="Comments" placeholder="Comments" /></h2>
                // </div>
                // <div>
                //     <button value="Annual" className="buttons" onClick={submitSickLeave} >Submit Sick Request</button>
                // </div> */}
            </div >
        )


    }
    else if (type == "Accidental") {


    }
    else if (type == "Annual") {
        return (
            <div>
                <h1>{headerText}</h1>
                <h1>Choose a replacement request if you want: </h1>
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
                                    <hr></hr>
                                    <ul> <Slot SlotToView={SlotToView} /> </ul>
                                    <hr></hr>
                                    <br></br>
                                    <div className="divider">
                                        <button value={item._id} className="btn" onClick={HandleReplacementID}>
                                            Choose Request
                            </button>
                                    </div>

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
                                <div className="divider">
                                    <button value={item.slot} className="btn" onClick={HandleViewAttendance}>
                                        View Slot Details
                            </button>
                                    <div className="divider">
                                        <button value={item._id} className="btn" onClick={HandleViewAttendance}>
                                            Choose Request
                            </button>
                                    </div>
                                </div>
                                <ul> <Slot SlotToView={SlotToView} /> </ul>
                                <br></br>
                                <br></br>
                            </li>
                        })}

                    </ul>
                </div>
                <div>
                    <input ref={DateRef} className="input100" type="date" name="email" placeholder="Date Of Leave" />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                    </span>
                    <br />
                </div>
                <button value="Annual" className="buttons" onClick={submitAnnualLeave} >Submit Annual Request</button>

            </div>
        )


    }
}
