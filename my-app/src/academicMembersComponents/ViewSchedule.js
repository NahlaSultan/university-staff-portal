import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
export default function ViewSchedule() {
    const [schedule, setSchedule] = useState("")
    axios
        .get('http://localhost:8000/academicMembers/viewSchedule', { headers: { 'token': localStorage.getItem('token') } })
        .then(res => {
            console.log(res.data)
            setSchedule(res.data)
          
        });

    return (
        <div>
            <h2>Weekly Schedule:</h2>
            {/* <ul>
                <h3 className="elemntsInside">Sunday</h3>
                {schedule.map((item, i) => {
                    return <li key={i}>
                        <h3 className="elemntsInside">Type: {item.type}</h3>
                        <h4 className="elemntsInside">Location: {item.location}</h4>
                        <h4 className="elemntsInside">Time: {item.time}</h4>
                        <h4 className="elemntsInside">Day: {item.day}</h4>
                        <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        <h4 className="elemntsInside">Assigned: {item.assignedFlag + ""}</h4>
                        <h4 className="elemntsInside">Taught by: {item.academicMember}</h4>
                        <br></br>

                        {item}</li>
                })}
            </ul> */}


        </div>
    )
}
