import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';

export default function ViewSlots({ SlotToView }) {

    return (
        <div>

            <ul>
                {SlotToView.map((item, i) => {
                    <h2>Slot Details: </h2>
                    return <li key={i}>
                        <h3 className="get">SLOT ID: {item.numberID}</h3>
                        <br></br>
                        <h3 className="elemntsInside">Type: {item.type}</h3>
                        <h4 className="elemntsInside">Location: {item.location}</h4>
                        <h4 className="elemntsInside">Time: {item.time}</h4>
                        <h4 className="elemntsInside">Day: {item.day}</h4>
                        <h4 className="elemntsInside">CourseTaught: {item.courseTaught}</h4>
                        <h4 className="elemntsInside">Taught by: {item.academicMember}</h4>
                        <br></br>
                    </li>
                })}
            </ul>
        </div>
    )
}
