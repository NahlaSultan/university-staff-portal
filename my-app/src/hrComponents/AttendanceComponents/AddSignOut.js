import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import '../../styling/dropDown.css'

export default function AddSignOut() {

    const [staffs, setStaffs] = useState([])
    const [date, setDate] = useState("")
    const [record, setRecord] = useState([])

    const [id, setID] = useState("")


    useEffect(() => {
        const fetchData = async () => {
          await
          axios
          .get('http://localhost:8000/hr/viewStaffs', { headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setStaffs(res.data)
            console.log("here")
            console.log(res.data)
          });
        };
        fetchData();    
      }, []);

    function ChooseID(e){
        setID(e.target.value)

    }

    function HandleDate(e) {
        setDate(e.target.value)

    }





    async function HandleAddSignOut() {

        const year = parseInt(date.substring(0, 4));
        const month = parseInt(date.substring(5, 7));
        const day = parseInt(date.substring(8, 10));
        const hour = parseInt(date.substring(11, 13));
        const minute = parseInt(date.substring(14, 16));


        const body = {
            id: id,
            year: year, month: month, day: day, hour: hour,
            minute: minute
        }
        console.log("body")
        console.log(body)

        await axios
            .post('http://localhost:8000/hr/addSignOut', body, { headers: { 'token': localStorage.getItem('token') } })

            .then(res =>
                console.log(res.data));

        console.log(document.getElementById('dateInput').value)

        await axios
            .post('http://localhost:8000/hr/viewAttendanceRec', { id: id }, { headers: { 'token': localStorage.getItem('token') } })
            .then(res =>
                setRecord(res.data));
        console.log(record)


    }



    return (

        <div className="addStaff">


            <span className="login100-form-title">
                Add SignOut
					</span>


                    <label >ID: </label>
                <select className='dropbutton' name="types"  onChange={ChooseID}>
                        <option value="">Member ID</option>
                        {staffs.map(item => (
                            <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                        ))}
             </select>



            <label for="start">Start date:</label>

            <input type="datetime-local" id="dateInput" name="trip-start"
                min="2020-01-01" max="2021-12-31" onChange={HandleDate} />

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



            <div className="container-login100-form-btn">
                <button onClick={HandleAddSignOut} className="login100-form-btn">
                    Add SignOut Record
						</button>
            </div>

            <div>
                <ul >
                    {record.map((item, i) => {
                        return <li key={i}>
                            <ul> signIn: {item.signInTime} </ul>
                            <ul> signOut: {item.signOutTime} </ul>
                            <br />
                        </li>
                    })}
                </ul>
            </div>

        </div>



    )
}
