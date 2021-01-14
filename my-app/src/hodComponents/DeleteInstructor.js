import React,{useState,useEffect } from 'react'
import axios from 'axios'
export default function DeleteInstructor() {
  const [Course,setCourse]=useState()
  const [Instructorid,setID]=useState()
  const [courses,setCrs]= useState([])
  const [insts,setInst]= useState([])
  const [resp, setRes] = useState()


  useEffect(() => {
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

  function HandleDelete(){
    const body={courseName:Course, instructorId:Instructorid}

   axios   
   .post('http://localhost:8000/hod/deleteInstructor', body, {headers:{'token': localStorage.getItem('token')}})
   
   .then(res=>{
     setRes(res.data)
    });
}


function ChooseCourse(e){
  setCourse(e.target.value)
}

function ChooseInst(e){
  setID(e.target.value)
}

return (

  <>
  <div >
      <div className="assignCourse">


          <span className="login100-form-title">
              Delete Instructor
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
                  <label >Instructor ID:  </label>
                  
                  <select className='dropbtn' name="types"  onChange={ChooseInst}>
                      <option value=""> Instructor ID</option>
                      {insts.map(item => (
                          <option key={item.memberID} value={item.memberID}>{item.memberID}</option>
                      ))}
                  </select>
                  <br /><br /><br />
              </div>
              
      </div>        
      <br></br>
      <div className="buttons">
          <button onClick={HandleDelete} className="buttons">
              Delete Instructor
  </button>
  <br></br>
  <br></br>
      </div>
      <ul className='viewStaff'> {resp} </ul>
      <br></br><br></br>
  </div>

</>

)
}

