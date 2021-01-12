import React,{useState,useEffect } from 'react'
import axios from 'axios'
import '../styling/main.css';


export default function ViewDayOffSingleStaff() {
  const [dayOff, setDayOff] = useState()
  const [staffs,setStaffs]= useState([])
   const [staffID, setID] = useState()


  useEffect(() => {
    const fetchData = async () => {
      await
      axios   
      .get('http://localhost:8000/hod/viewStaffs',{ headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setStaffs(res.data)
        }); 

    };
    fetchData();
    
    },[]);


     function HandleView(){
        const body={staffId: staffID}

        axios   
        .post('http://localhost:8000/hod/viewDayOffSingleStaff',body,{headers:{'token': localStorage.getItem('token')}})
        .then(res => {
            setDayOff(res.data)
          });
    }  

    function ChooseSatff(e){
      setID(e.target.value)
    }

  return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                View Day Off
  </span>


  <div >
                  <label >Staff ID:  </label>
                  
                  <select className='dropbtn' name="types"  onChange={ChooseSatff}>
                      <option value=""> Staff ID</option>
                      {staffs.map(item => (
                          <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                      ))}
                  </select>
                  <br /><br /><br />
              </div>

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleView} className="buttons">
                View Day Off
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> {dayOff}</ul>
        <br></br><br></br>
    </div>

</>

      
    

  )

}