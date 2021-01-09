import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import Slot from './ViewSlots'
import Replacements from './ViewReplacement'
export default function Bsell() {
    const [staff, setStaff] = useState("")
    const [dayOffHeader, setDayOffHeader] = useState("")
    const [dayOff, setDayOff] = useState([])
    const [replacementHeader, setReplacementHeader] = useState("")
    const [replacement, setReplacement] = useState([])
    const [slotLinkingHeader, setSlotLinkingHeader] = useState("")
    const [slotLinking, setSlotLinking] = useState([])
    const [leaveHeader, setLeaverHeader] = useState("")
    const [leave, setLeave] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:8000/academicMembers/viewNotificaitons', { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setStaff(res.data[0])
               
            });
    })
    return (
        < div >

        </div >
    )
}
