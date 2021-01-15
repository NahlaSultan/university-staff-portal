import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/tables.css';
import '../styling/App.css';

export default function ViewSchedule() {
    const [schedule, setSchedule] = useState([])
    const [Saturday, setSaturday] = useState([])
    const [Sunday, setSunday] = useState([])
    const [Monday, setMonday] = useState([])
    const [Tuesday, setTuesday] = useState([])
    const [Wednesday, setWednesday] = useState([])
    const [Thursday, setThursday] = useState([])
    const [ReplacedSlot, setReplaced] = useState([])
    const [ReplacedDate, setReplacedDate] = useState("")
    const [toReplace, setToReplace] = useState([])
    const [toReplaceDate, setToReplaceDate] = useState("")
    const [counter, setCounter] = useState(0)
    let history = useHistory()

    useEffect(() => {
        //console.log(counter)
        if (counter <= 1) {
            setCounter(counter + 1)

            axios
                .get('http://localhost:8000/academicMembers/viewSchedule', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    //setSchedule(res.data)
                    console.log((res.data).length)
                    setSaturday((res.data)[0])
                    setSunday((res.data)[1])
                    setMonday((res.data)[2])
                    setTuesday((res.data)[3])
                    setWednesday((res.data)[4])
                    setThursday((res.data)[5])
                    setReplaced((res.data)[7])
                    setReplacedDate((res.data)[6])
                    setToReplace((res.data)[9])
                    setToReplaceDate((res.data)[8])

                });
        }
    });
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

    return (
        <div>
            <h1>Weekly Schedule:</h1>
            <table className="table">
                <tr className="td">
                    <th className="thFirst">Days/Slots</th>
                    <th className="thFirst">First</th>
                    <th className="thFirst">Second</th>
                    <th className="thFirst">Third</th>
                    <th className="thFirst">Fourth</th>
                    <th className="thFirst">Fifth</th>
                </tr>

                <tr className="td">
                    <th className="thFirst"> -Saturday</th>
                    {Saturday.map((item, i) => {
                        return <th className="th" key={i}>
                            <h3 className="elemntsInside">Type: {item.type}</h3>
                            <h4 className="elemntsInside">Location: {item.location}</h4>
                            <h4 className="elemntsInside">Time: {item.time}</h4>
                            <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        </th>

                    })}
                </tr>
                <tr className="td">
                    <th className="thFirst"> -Sunday</th>
                    {Sunday.map((item, i) => {
                        return <th className="th" key={i}>
                            <h3 className="elemntsInside">Type: {item.type}</h3>
                            <h4 className="elemntsInside">Location: {item.location}</h4>
                            <h4 className="elemntsInside">Time: {item.time}</h4>
                            <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        </th>

                    })}
                </tr>

                <tr className="td">
                    <th className="thFirst"> -Monday</th>
                    {Monday.map((item, i) => {
                        return <th className="th" key={i}>
                            <h3 className="elemntsInside">Type: {item.type}</h3>
                            <h4 className="elemntsInside">Location: {item.location}</h4>
                            <h4 className="elemntsInside">Time: {item.time}</h4>
                            <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        </th>

                    })}
                </tr>
                <tr className="td">
                    <th className="thFirst"> -Tuesday</th>
                    {Tuesday.map((item, i) => {
                        return <th className="th" key={i}>
                            <h3 className="elemntsInside">Type: {item.type}</h3>
                            <h4 className="elemntsInside">Location: {item.location}</h4>
                            <h4 className="elemntsInside">Time: {item.time}</h4>
                            <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        </th>

                    })}
                </tr>
                <tr className="td">
                    <th className="thFirst">-Wednesday</th>
                    {Wednesday.map((item, i) => {
                        return <th className="th" key={i}>
                            <h3 className="elemntsInside">Type: {item.type}</h3>
                            <h4 className="elemntsInside">Location: {item.location}</h4>
                            <h4 className="elemntsInside">Time: {item.time}</h4>
                            <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        </th>

                    })}
                </tr>
                <tr className="td">
                    <th className="thFirst">-Thursday</th>
                    {Thursday.map((item, i) => {
                        return <th className="th" key={i}>
                            <h3 className="elemntsInside">Type: {item.type}</h3>
                            <h4 className="elemntsInside">Location: {item.location}</h4>
                            <h4 className="elemntsInside">Time: {item.time}</h4>
                            <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        </th>

                    })}
                </tr>
            </table>
            <hr></hr>
            <h2>Slots Replaced For you</h2>
            <h3>Date: {ReplacedDate}</h3>
            <ul>
                {ReplacedSlot.map((item, i) => {
                    return <li key={i}>
                        <h3 className="get">SLOT ID: {item.numberID}</h3>
                        <h3 className="elemntsInside">Type: {item.type}</h3>
                        <h4 className="elemntsInside">Location: {item.location}</h4>
                        <h4 className="elemntsInside">Time: {item.time}</h4>
                        <h4 className="elemntsInside">Day: {item.day}</h4>
                        <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        <h4 className="elemntsInside">Taught by: {item.academicMember}</h4>
                        <br></br>

                        <br></br>
                        <br></br>
                    </li>
                })}
            </ul>
            <hr></hr>
            {/* </table> */}
            <h2>Slots you will replace</h2>
            <h3>Date: {toReplaceDate}</h3>
            <ul>
                {toReplace.map((item, i) => {
                    return <li key={i}>
                        <h3 className="get">SLOT ID: {item.numberID}</h3>
                        <h3 className="elemntsInside">Type: {item.type}</h3>
                        <h4 className="elemntsInside">Location: {item.location}</h4>
                        <h4 className="elemntsInside">Time: {item.time}</h4>
                        <h4 className="elemntsInside">Day: {item.day}</h4>
                        <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        <h4 className="elemntsInside">Taught by: {item.academicMember}</h4>

                    </li>
                })}
            </ul>
            <hr></hr>
            <br></br>
        </div>

    )
}
{/* <li className='Days' >
                            {slot.map((item, i) => {
                                return <ul key={i} className='courseItem'>
                                    <h3 className="elemntsInside">Type: {item.type}</h3>
                                    <h4 className="elemntsInside">Location: {item.location}</h4>
                                    <h4 className="elemntsInside">Time: {item.time}</h4>
                                    <h4 className="elemntsInside">Day: {item.day}</h4>
                                    <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                                    <h4 className="elemntsInside">Assigned: {item.assignedFlag + ""}</h4>
                                    <h4 className="elemntsInside">Taught by: {item.academicMember}</h4>
                                    <br></br>
                                </ul>
                            })}
                        </li>
                        <br />
                    </ul>
                })}
            </ul> */}

    //     </div>
    // )
    //             }
