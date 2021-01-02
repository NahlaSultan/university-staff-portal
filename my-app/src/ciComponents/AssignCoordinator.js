import React,{useRef} from 'react'
import axios from 'axios'
export default function AssignCoordinator() {
    const  memberIDRef=useRef()
    const courseRef=useRef()
  function HandleAssignCoordinator(){
    const body={memberID:memberIDRef.current.value, courseName: courseRef.current.value  }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/ci/assignCourseCoordinator', body)
   
   .then(res=>console.log(res.data));
   // callAPI()
}

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
              <button onClick={HandleAssignCoordinator} className="buttons">
                  Assign Coordinator
      </button>
          </div>

      </div>

  </>
)
}

