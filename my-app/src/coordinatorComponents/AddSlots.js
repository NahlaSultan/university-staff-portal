import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
//import '.dropDown.css';


export default function AddSlots() {
    const [Type, setType] = useState("")
    const [Time, setTime] = useState("")
    const [Day, setDay] = useState("")
    const [location, setLocation] = useState("")
    const [Output, setOutput] = useState("")
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState("")
    const locs = ['1', '2', '3']
    // var headerText=""
    //if the course is not found (azabtha fl backend)
    const CourseTaughtRef = useRef()
    const TimeRef = useRef()
    const LocationRef = useRef()
    async function HandleChange(e) {
        await setType(e.target.value)
        console.log(Type)
    }
    async function HandleTime(e) {
        await setTime(e.target.value)
        console.log(Time)
    }
    async function HandleDay(e) {
        await setDay(e.target.value)
        console.log(Day)
    }
    async function HandleLocation(e) {
        await setLocation(e.target.value)
        console.log(location)
    }
    async function HandleCourse(e) {
        await setCourse(e.target.value)
    }
    const [locations, setLocations] = useState([])
    const [headerText, setHeaderText] = useState("")
    function HandleAddSlot() {

        const body = {
            type: Type, time: Time,
            courseTaught: course, location: location,
            day: Day
        }
        //  console.log(body)

        axios
            .post('http://localhost:8000/coordinator/addSlot', body, { headers: { 'token': localStorage.getItem('token') } })

            .then(res => {
                setHeaderText(res.data);

            }
            );

        // callAPI()
    }


    // Update the document title using the browser API
    axios
        .get('http://localhost:8000/viewLocations')
        .then(res => {
            setLocations(res.data)

        });
    axios
        .get('http://localhost:8000/viewLocations')
        .then(res => {
            setLocations(res.data)

        });

    axios
        .get('http://localhost:8000/coordinator/viewCourseCoordinators', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => {
            setCourses(res.data)

        });


    return (
        <>
            <div >
                <h1>{headerText}</h1>
                <span className="login100-form-title">
                    Add Slot
                </span>

                <div className='whole'>

                    <label className='textDown'>Choose Course: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleCourse}>
                        <option value="">Choose Course</option>
                        {courses.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <br></br>


                </div>
                <br></br>
                <div className='whole'>
                    <label className='textDown'>Choose Location: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleLocation}>
                        <option value="">Choose location</option>
                        {locations.map(s => (
                            <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                    </select>


                    <label className='textDown'> Choose A Day: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleDay}>
                        <option value="">Choose day</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                    </select>
                </div>
                <br></br>
                <div className='whole'>
                    <label className='textDown'>Choose The Type: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleChange}>
                        <option value="">Choose type</option>
                        <option value="lab">Lab</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="lecture">Lecture</option>
                    </select>

                    {/* </div> */}
                    <label className='textDown'> Slot Time: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleTime}>
                        <option value="">Choose time</option>
                        <option value="First Slot">First Slot</option>
                        <option value="Second Slot">Second Slot</option>
                        <option value="Third Slot">Third Slot</option>
                        <option value="Fourth Slot">Fourth Slot</option>
                        <option value="Fifth Slot">Fifth Slot</option>
                    </select>



                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="buttons">
                    <button onClick={HandleAddSlot} className="buttons">
                        Add Slot
						</button>
                </div>

            </div>


        </>






        // <div>
        //  Name:
        // <input ref={NameRef} type="text" />
        // <br></br>
        // Email:
        // <input ref={EmailRef} type="text" />
        // <br></br>
        // Role:
        // <input ref={RoleRef} type="text" />
        // <br></br>
        // Day Off:
        // <input ref={DayOffRef} type="text" />
        // <br></br>
        // Salary:
        // <input ref={SalaryRef} type="text" />
        // <br></br>
        // Office number:
        // <input ref={OfficeRef} type="text" />
        // <br></br>
        // Gender:
        // <input ref={GenderRef} type="text" />
        // <br></br>
        // <button onClick={HandleAddStaff}> Add </button>
        // </div>
    )
}

