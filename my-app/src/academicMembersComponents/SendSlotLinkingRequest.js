import React, { useRef, useState, useEffect } from 'react'
import { Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';

export default function SendSlotLinkingRequest() {
    const [slot, setSlot] = useState([])
    const [chosenSlot, setChosenSlot] = useState("")
    const [headerText, setHeaderText] = useState("")
    const [buttonHeader, setButtonHeader] = useState("")
    let history = useHistory()
    useEffect(() => {
        //     console.log("I m here")
        axios
            .get('http://localhost:8000/viewUnassignedSlots', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setSlot(res.data)
            });


    }, []);
    useEffect(() => {
        const checkToken = async () => {
            if (localStorage.getItem('token')) {
                console.log("TOKENS")
                await axios
                    .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token') })
                    .then(res => {
                        if (res.data.includes('HR members')) {
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


    function HandleChoice(e) {
        setChosenSlot(e.target.value)
        setButtonHeader("You have chosen Slot: " + e.target.value)
    }

    async function HandleSubmitRequest() {
        const body = { slotId: chosenSlot }
        console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/sendSlotLinkingRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setHeaderText(res.data)

            });
    }
    return (
        <div>
            <Link to='/academic/Requests' className="linkPrev">&laquo;</ Link> <br />
            <h2>Time to send a SlotLinking Request</h2>
            <br></br>
            <h3>Kindly choose a slot you would like to teach</h3>
            <br></br>
           
            <div>
                <ul>
                    {slot.map((item, i) => {
                        return <li key={i}>
                            <h3 className="get">SLOT ID: {item.numberID}</h3>
                            <h2 style={{ color: 'red' }}>{buttonHeader}</h2>
                            <br></br>
                            <h3 className="elemntsInside">Type: {item.type}</h3>
                            <h4 className="elemntsInside">Location: {item.location}</h4>
                            <h4 className="elemntsInside">Time: {item.time}</h4>
                            <h4 className="elemntsInside">Day: {item.day}</h4>
                            <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                            <h4 className="elemntsInside">Assigned: {item.assignedFlag + ""}</h4>
                            <h4 className="elemntsInside">Taught by: {item.academicMember}</h4>
                            <br></br>
                            <div className="divider">
                                <button value={item.numberID} className="btn" onClick={HandleChoice} >
                                    Choose Slot
						</button>
                                <br></br>
                                <br></br>

                            </div>
                        </li>
                    })}
                </ul>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <r1>{headerText}</r1>
            <div className="buttons">
                <button onClick={HandleSubmitRequest} className="buttons">
                    Submit Request
						</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}
