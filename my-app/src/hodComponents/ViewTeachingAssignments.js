import React,{useState,useEffect} from 'react'
import {useHistory } from 'react-router-dom'

import axios from 'axios'
import '../styling/main.css';
import TeachingAssignments from './TeachingAssignments'

export default function ViewTeachingAssignments() {
  const [teachAss, setTeachAss] = useState([])
  const [Course,setCourse]=useState()
  const [courses,setCrs]= useState([])
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

    };
    fetchData();
    
    },[]);


     function HandleView(){
        const body={courseName:Course}

        axios   
        .post('http://localhost:8000/hod/viewTeachingAssignments',body,{headers:{'token': localStorage.getItem('token')}})
        .then(res => {
            setTeachAss(res.data)
          });
    }  
    function ChooseCourse(e){
      setCourse(e.target.value)
    }
    

  return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                View Teaching Assignments
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

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleView} className="buttons">
                View Teaching Assignments
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> <TeachingAssignments teachAss={teachAss} /></ul>

        <br></br><br></br>
    </div>

</>

      
    

  )

}