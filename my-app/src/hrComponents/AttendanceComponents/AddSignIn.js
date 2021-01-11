import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import '../../styling/dropDown.css'
import { Link ,useHistory} from 'react-router-dom'

export default function AddSignIn() {
let history = useHistory()
    const [staffs, setStaffs] = useState([])
    const [date, setDate] = useState("")
    const [record, setRecord] = useState([])
    const [id, setID] = useState("")
    const [message, setMessage] = useState("")
    const [message2, setMessage2] = useState("")
    const [res, setRes] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            await
                axios
                    .get('http://localhost:8000/hr/viewStaffs', { headers: { 'token': localStorage.getItem('token') } })
                    .then(res => {
                        setStaffs(res.data)
                    });
        };
        fetchData();
    }, []);

    function ChooseID(e) {
        setID(e.target.value)

    }
    function HandleDate(e) {
        setDate(e.target.value)

    }


    //   "id": "ac-3",
    //   "month": 12,
    //   "day": 5,
    //   "year": 2020,
    //   "hour": 5,
    //   "minute": 10


    async function HandleAddSignIn() {
        console.log(document.getElementById("datetime"))
        if (document.getElementById("staffid").value == "") {
            console.log("if")
            setMessage("must specify memberID")
            return;
        }
        else{
            setMessage("")

        }

        if (date == "") {
            setMessage2("must specify date and time")
            return;
        }
        else{
            setMessage2("")

        }

        const year = parseInt(date.substring(0, 4));
        const month = parseInt(date.substring(5, 7));
        const day = parseInt(date.substring(8, 10));
        const hour = parseInt(date.substring(11, 13));
        const minute = parseInt(date.substring(14, 16));

        console.log("memberID")
        const body = {
            id: id,
            year: year, month: month, day: day, hour: hour,
            minute: minute
        }
        console.log("body")
        console.log(body)

        await axios
            .post('http://localhost:8000/hr/addSignIn', body, { headers: { 'token': localStorage.getItem('token') } })

            .then(res =>
                setRes(res.data));


        await axios
            .post('http://localhost:8000/hr/viewAttendanceRec', { id: id }, { headers: { 'token': localStorage.getItem('token') } })
            .then(res =>
                setRecord(res.data));
        console.log(record)

        if(res=='success'){
            history.push('/hr/manageAttendance')
    
        }


    }



    return (

        <div className="addStaff">

            <Link to='/hr/manageAttendance' className="linkPrev">&laquo;</ Link> <br />


            <span className="login100-form-title">
                Add SignIn
					</span>


            <label >ID: </label>
            <select className='dropbutton' id="staffid" onChange={ChooseID}>
                <option value="">Member ID</option>
                {staffs.map(item => (
                    <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                ))}
            </select>
            <div class="alert">
            {message}
            </div>



            <label for="start">date:</label>

            <input id="datetime" required="required" type="datetime-local" id="dateInput"

                min="2020-01-01" max="2021-12-31" onChange={HandleDate} />

            <div class="alert">
            {message2}
            </div>
            {/* <div >
					<label >Year: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseYear}>
                        <option value="">Choose Year</option>
						<option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                        <br/><br/>
					</div>

                    <label >Month: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseYear}>
                        <option value="">Choose Month</option>
						<option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                        <br/><br/>
					</div>
       
					<div >
					<label >Day: </label>
                    <select className='dropbtn' name="types"  onChange={ChooseDay}>
                        <option value="">Choose Day </option>
						<option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option> */}



            <div className="container-login100-form-btn" >
                <button type="submit" onClick={HandleAddSignIn} className="login100-form-btn">
                    Add SignIn Record
						</button >
            </div>

            <div class="alert">
            {res}
            </div>

            <div>
                <ul >
                    {record.map((item, i) => {
                        return <li key={i}>
                            <ul> signIn: {item.signInTime} </ul>
                            <br />
                        </li>
                    })}
                </ul>
            </div>


        </div>



    )
}
