import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from './ViewSlots'
import Replacements from './ViewReplacement'
export default function CancelLeaveRequest() {
    let history = useHistory()
    const [ReplacementToView, setTheReplacement] = useState([])
    const [LeaveRequests, setLeaveRequests] = useState([])
    const [toggleReplacement, setToggleReplacement] = useState(true)
    const [headerText, setHeaderText] = useState("")
    const [leaveRequestHeader, setLeaveRequestHeader] = useState("")
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
    useEffect(() => {


        axios
            .get('http://localhost:8000/academicMembers/viewLeave', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setLeaveRequests(res.data)
                if (res.data != "not staff" && res.data.length != 0) {
                    setLeaveRequestHeader("Leave Requests Received")
                }
            });
    }, [])

  

    function HandleCancel(e) {
        const body = { requestId: e.target.value }
        // console.log(body)
        axios
            .post('http://localhost:8000/academicMembers/cancelLeaveRequest', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setHeaderText(res.data)

            })
    }

    return (
        <div>
            <Link to='/academic/Requests' className="linkPrev">&laquo;</ Link> <br />
            <h1>{headerText}</h1>
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

                        <div className="divider">
                            <button value={item.replacementRequest} className="btn" onClick={HandleViewReplacement}>
                                View Replacement Details
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
            <ul> <Replacements ReplacementToView={ReplacementToView} /> </ul>
            <hr></hr>
        </div>
    )
}
