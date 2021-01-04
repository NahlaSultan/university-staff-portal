import React,{useRef} from 'react'
import axios from 'axios'
export default function RemoveAssignedCourse() {
    const memberIDRef=useRef()
    const courseRef=useRef()
  function HandleRemoveCourse(){
    const body={memberID:memberIDRef.current.value, courseName:courseRef.current.value  }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/ci/removeAssignedCourse', body, {headers:{'token':localStorage.getItem('token')}})
   
   .then(res=>console.log(res.data));
   // callAPI()
}

return (
  <>
      <div >
          <div className="RemoveAssignedCourse">


              <span className="login100-form-title">
                  Remove Assigned Course
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
              <button onClick={ HandleRemoveCourse} className="buttons">
                  Assign Course
      </button>
          </div>

      </div>

  </>
)
}

