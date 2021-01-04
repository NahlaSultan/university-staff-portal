import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/App.css'
import '../styling/dropDown.css'
import { Link } from 'react-router-dom'

export default function ManageSlots() {
    const [slot, setSlot] = useState([])
    const [updateSlot, setUpdateSlot] = useState("")
    const [certainSlot, setCertainSlot] = useState([])
    const [slotType, setSlotType] = useState("")
    const [locations, setLocations] = useState([])
    const [Time, setTime] = useState("")
    const [count, setCount] = useState(Number)
    const [Day, setDay] = useState("")
    const [Location, setLocation] = useState("")
    const [headerText, setHeaderText] = useState("")
    var numberId;

    useEffect(() => {
        // Update the document title using the browser API
        if (updateSlot == "") {
            axios
                .get('http://localhost:8000/coordinator/viewSlots', { headers: { 'token': localStorage.getItem('token') } })
                .then(res => {
                    setSlot(res.data)
                });
        }
        else {
            const body = { numberID: updateSlot }
            if (count < 3)
                setCount(count + 1)
            axios
                .post('http://localhost:8000/viewCertainSlot', body)
                .then(res => {
                    setCertainSlot(res.data)

                });


            // Update the document title using the browser API

        }
    });

    // });
    if (updateSlot != "" && count == 1) {
        console.log("ENTERED")
        axios
            .get('http://localhost:8000/viewLocations')
            .then(res => {
                setLocations(res.data)

            });
    }
    async function HandleType(e) {
        setSlotType(e.target.value)
        console.log(slotType)
    }
    async function HandleTime(e) {
        setTime(e.target.value)
        console.log(Time)
    }
    function HandleDay(e) {
        console.log("Entered day")
        setDay(e.target.value)
        console.log(Day)
    }
    async function HandleLocation(e) {
        setLocation(e.target.value)
        console.log(Location)
    }
    function HandleUpdate(e) {
        setCount(1)
        setUpdateSlot(e.target.value)
        console.log(updateSlot)
    }

    function HandleDelete(e) {
        numberId = e.target.value
        console.log(e.target.value)
        var body = { numberID: numberId }
        console.log(body)
        axios
            .post('http://localhost:8000/coordinator/deleteSlot', body, { headers: { 'token': localStorage.getItem('token') } })

    }
    function HandleSubmit(e) {
        console.log("Pressed")
        const body = { slotID: e.target.value, location: Location, type: slotType, time: Time, day: Day }
        console.log(body)
        axios
            .post('http://localhost:8000/coordinator/updateSlot', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setUpdateSlot("")

                setCount(0)
            })

    }
    if (updateSlot == "") {
        return (

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
                                <button value={item.numberID} className="btn" onClick={HandleDelete}>
                                    Delete Slot
						</button>
                                <br></br>
                                <br></br>
                                <button value={item.numberID} className="btn" onClick={HandleUpdate}>
                                    Update Slot
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
    else {
        return (

            <div>
                <ul>
                    {certainSlot.map((item, i) => {
                        return <li key={i}>
                            <h3 className="get">SLOT ID: {item.numberID}</h3>
                            <div>
                                <h2>Type: {item.type}</h2>
                                <div className='whole'>
                                    <label className='textDown'>Change new Type: </label>
                                    <select className='dropbtn' name="types" id="type" onChange={HandleType}>
                                        <option value="">Choose type</option>
                                        <option value="lab">Lab</option>
                                        <option value="tutorial">Tutorial</option>
                                        <option value="lecture">Lecture</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <h2>Location: {item.location}</h2>
                                <div className='whole'>
                                    <label className='textDown'>Choose new Location: </label>
                                    <select className='dropbtn' name="types" id="type" onChange={HandleLocation}>
                                        <option value="">Choose location</option>
                                        {locations.map(item => (
                                            <option key={item.name} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <h2>Time: {item.time}</h2>
                                <div className='whole'>
                                    <label className='textDown'>New Slot Time: </label>
                                    <select className='dropbtn' name="types" id="type" onChange={HandleTime}>
                                        <option value="">Choose time</option>
                                        <option value="First Slot">First Slot</option>
                                        <option value="Second Slot">Second Slot</option>
                                        <option value="Third Slot">Third Slot</option>
                                        <option value="Fourth Slot">Fourth Slot</option>
                                        <option value="Fifth Slot">Fifth Slot</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <h2>Day: {item.day}</h2>
                                <div className='whole'>
                                    <label className='textDown'> Choose new Day: </label>
                                    <select className='dropbtn' name="types" id="type" onChange={HandleDay}>
                                        <option value="">Choose day</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                    </select>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div>
                                <h2>CourseTaught: {item.courseTaught}</h2>
                                to do

                            </div>
                            <br></br>
                            <div className="divider">
                                <button value={item.numberID} className="btn" onClick={HandleSubmit}>
                                    Submit Update
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
}