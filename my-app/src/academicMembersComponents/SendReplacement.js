import React, { useRef, useState, useEffect } from 'react'
import { Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';

export default function SendReplacement() {
    const [slot, setSlot] = useState([])
    const [chosenSlot, setChosenSlot] = useState("")
    const [headerText, setHeaderText] = useState("")
    const [staffs, setStaffs] = useState([])
    const [receiver, setReceiver] = useState("")
    const [buttonHeader, setButtonHeader] = useState("")
    const DateRef = useRef()
    let history = useHistory()
    useEffect(() => {
        axios
            .get('http://localhost:8000/academicMembers/viewSlotsAssigned', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setSlot(res.data)
            });

        axios
            .get('http://localhost:8000/academicMembers/viewCollegues', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setStaffs(res.data)
                console.log(res.data)
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
    function HandleColleague(e) {
        setReceiver(e.target.value)
    }
    function HandleSubmitRequest() {
        const body = { slot: chosenSlot, receiverId: receiver, dateReplace: DateRef.current.value }
        console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/sendReplacementRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setHeaderText(res.data)

            });
    }
    return (
        <div>
            <Link to='/academic/Requests' className="linkPrev">&laquo;</ Link> <br />
            <h2>Time to send a replacement request to a collegue</h2>
            <br></br>
            <h3>Kindly choose a slot to be replaced first</h3>
            <br></br>
            <h2>{buttonHeader}</h2>
            <div>
                <ul>
                    {slot.map((item, i) => {
                        return <li key={i}>
                            <h3 className="get">SLOT ID: {item.numberID}</h3>
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
            <div className='whole'>
                <label className='textDown'>Choose Replacement Colleague : </label>
                <select className='dropbtn' name="types" id="type" onChange={HandleColleague}>
                    <option value="">Choose Colleague</option>
                    {staffs.map(item => (
                        <option key={item.memberID} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <br></br>
            <br></br>
            <div>
                <input ref={DateRef} className="input100" type="date" name="email" placeholder="Date" />
            </div>
            <br></br>
            <br></br>
            <div className="buttons">
                <button onClick={HandleSubmitRequest} className="buttons">
                    Submit Request
						</button>
            </div>
            <br></br>
            <r1>{headerText}</r1>
            <br></br>
            <br></br>
        </div>
    )
}
