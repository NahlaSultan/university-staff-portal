import React,{useRef, useState, useEffect} from 'react'
import axios from 'axios'
export default function AssignCoordinator() {
    const  memberIDRef=useRef()
   // const courseRef=useRef()
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState("")
    const [message, setMessage] = useState("")
    async function HandleCourses(e) {
        await setCourse(e.target.value)
        console.log(Location)
    }
  function HandleAssignCoordinator(){
    const body={memberID:memberIDRef.current.value, courseName: course  }

   axios   
   .post('http://localhost:8000/ci/assignCourseCoordinator', body, {headers:{'token':localStorage.getItem('token')}})
   
   .then(res=>setMessage(res.data));
   
}
axios
.get('http://localhost:8000/ci/loadCourses', {headers:{'token':localStorage.getItem('token')}})
.then(res => {
    setCourses(res.data)
    //console.log(res.data)

});

return (
  <>
      <div >
          <div className="assignCoordinator">


              <span className="login100-form-title">
                  Assign Coordinator
    </span>


              <div>
                  <input required={true} ref={memberIDRef} className="input100" name="memberID" placeholder="Member ID" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                  </span>
                  <br />
              </div>
              <br></br>
          <br></br>
          <label className='textDown'>Choose a course: </label>
                    <select className='dropbtn' name="types" id="type" onChange={HandleCourses}>
                        <option value="">Choose a Course</option>
                        {courses.map(item => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
          </div>
          <br></br>
          <br></br>
          <r1> {message}</r1>
          <br></br>
          <br></br>
          <br></br>
          <div className="buttons">
              <button onClick={HandleAssignCoordinator} className="buttons">
                  Assign Coordinator
      </button>
          </div>

      </div>

  </>
)
}

