import React,{useState,useEffect } from 'react'
import {useHistory } from 'react-router-dom'

import axios from 'axios'
export default function UpdateInstructor() {
    const [Course,setCourse]=useState()
    const [OInstructorid,setoldID]=useState()
    const [NInstructorid,setnewID]=useState()
    const [courses,setCrs]= useState([])
    const [insts,setInst]= useState([])
    const [resp, setRes] = useState()
    let history = useHistory()


    useEffect(() => {

        const checkToken = async()=>{
            if(localStorage.getItem('token')){
              console.log("TOKENS")
              await axios
              .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
              .then(res => {
              if(!res.data.includes('headOfdepartments')) {
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
          .get('http://localhost:8000/hod/viewCourses',{ headers: { 'token': localStorage.getItem('token') } })
          .then(res => {
            setCrs(res.data)
            }); 
    
            await
            axios   
            .get('http://localhost:8000/hod/viewInsts',{ headers: { 'token': localStorage.getItem('token') } })
            .then(res => {
                setInst(res.data)
              });  
    
        };
        fetchData();
        
        },[]);


  function HandleUpdate(){
    const body={courseName:Course, oldInstructorId:OInstructorid, newInstructorId:NInstructorid}

   axios   
   .post('http://localhost:8000/hod/updateInstructor', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>{
     setRes(res.data)
    });
}

function ChooseCourse(e){
    setCourse(e.target.value)
  }
  
  function ChooseOInst(e){
    setoldID(e.target.value)
  }

  function ChooseNInst(e){
    setnewID(e.target.value)
  }

 return (

  <>
  <div >
      <div className="assignCourse">


          <span className="login100-form-title">
              Update Instructor
</span>


          <div >
                  <label >Course Name:  </label>
                  
                  <select className='dropbtn' name="types"  onChange={ChooseCourse}>
                      <option value=""> Course Name</option>
                      {courses.map(c => (
                          <option key={c} value={c}>{c}</option>
                      ))}
                  </select>
                  <br /><br /><br />
              </div>

              <div >
                  <label >Old Instructor ID:  </label>
                  
                  <select className='dropbtn' name="types"  onChange={ChooseOInst}>
                      <option value=""> Old Instructor ID</option>
                      {insts.map(item => (
                          <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                      ))}
                  </select>
                  <br /><br /><br />
              </div>

              <div >
                  <label >New Instructor ID:  </label>
                  
                  <select className='dropbtn' name="types"  onChange={ChooseNInst}>
                      <option value=""> New Instructor ID</option>
                      {insts.map(item => (
                          <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                      ))}
                  </select>
                  <br /><br /><br />
              </div>
              
      </div>        
      <br></br>
      <div className="buttons">
          <button onClick={HandleUpdate} className="buttons">
              Update Instructor
  </button>
  <br></br>
  <br></br>
      </div>
      <rl className='viewStaff'> {resp} </rl>
      <br></br><br></br>
  </div>

</>

)

}

