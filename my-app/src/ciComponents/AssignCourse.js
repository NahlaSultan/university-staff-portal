import React,{useRef} from 'react'
import axios from 'axios'
export default function AssignCourse() {
    const memberIDRef=useRef()
    const courseRef=useRef()
  function HandleAssCourse(){
    const body={memberID:memberIDRef.current.value, courseName:courseRef.current.value  }
  

   axios   
   .post('http://localhost:8000/ci/updateAssignedCourse', body, {headers:{'token':localStorage.getItem('token')}})
   
   .then(res=>console.log(res.data));
  
}

return (
  <>
      <div >
          <div className="assignCourse">


              <span className="login100-form-title">
                  Assign Course
    </span>


              <div>
                  <input required={true} ref={memberIDRef} className="input100" name="memberID" placeholder="Member ID" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                  </span>
                  <br />
              </div>


              <div>
                  <input required={true} ref={courseRef} className="input100" name="courseName" placeholder="Course Name" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                  </span>
                  <br />
              </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="buttons">
              <button onClick={HandleAssCourse} className="buttons">
                  Assign Course
      </button>
          </div>

      </div>

  </>
)

}

