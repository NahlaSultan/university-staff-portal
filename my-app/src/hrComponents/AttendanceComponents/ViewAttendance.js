import AttendanceRecord from './AttendanceRecord';
import React, { useRef, useState, useEffect } from 'react'
import { Link ,useHistory} from 'react-router-dom'
import axios from 'axios'
import '../../styling/main.css';

export default function ViewAttendance() {
    const [attendance, setAttendance] = useState([])
    const [staffs, setStaffs] = useState([])
    const [id, setID] = useState("")
    const [message, setMessage] = useState("")
    let history = useHistory()

    useEffect(() => {

        const checkToken = async()=>{
            if(localStorage.getItem('token')){
              console.log("TOKENS")
              await axios
              .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
              .then(res => {
              if(!res.data.includes('HR members')) {
                history.push('/error')
              } 
              });
            }
            else{
              console.log("NOT TOKENS")
              history.push('/')
        
            }
    
        }
        checkToken()

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

  
    function HandleViewAttendance() {
        if (document.getElementById("staffid").value == "") {
            console.log("if")
            setMessage("must specify memberID")
            return;
        }
        else{
            setMessage("")

        }

        const body = { id: id }

        axios
            .post('http://localhost:8000/hr/viewAttendance', body, { headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setAttendance(res.data)
                console.log(attendance)
            }
            ).catch(error => {
                console.log(error)
            })

        document.getElementById("attendanceTable").style.display = "block"
        

    }



    return (
        <div>
            <br />
            <Link to='/hr/manageAttendance' className="linkPrev">&laquo;</ Link> <br/>

            <br />

  

            <label >ID: </label> 
                <select className='dropbutton' name="types" id="staffid"  onChange={ChooseID}>
                        <option value="">Member ID</option>
                        {staffs.map(item => (
                            <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                        ))}
             </select><br/>

            <div  className="container-login100-form-btn"  >
                <button onClick={HandleViewAttendance} className="login100-form-btn">
                    View Attendace
				</button>
            </div>
            <br/>
            <div class="alert">
            {message}
            </div>
            
            <div id="attendanceTable" style={{display: "none"}}>
                <h3>Attendace:</h3>
                <AttendanceRecord attendance={attendance} />
            </div>

        </div>
    )
}


