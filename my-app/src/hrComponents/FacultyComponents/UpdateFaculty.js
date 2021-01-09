import React,{useRef} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation,Link } from "react-router-dom";
import { useHistory } from "react-router-dom";





export default function UpdateFaculty() {
  const NameRef=useRef()
  const locationReact = useLocation();
  let history = useHistory();

  function ClearTxtfields(){
    document.getElementById('nameInput').value = ''
  }

  function HandleAddFac(){


    const body={
        name: locationReact.state.fac.facultyName,
        newName: NameRef.current.value
     }

   axios   
   .post('http://localhost:8000/hr/updateFaculty', body, { headers: { 'token': localStorage.getItem('token') } })
   .then(res=>console.log(res.data));
   
   ClearTxtfields()
  }

  return (
    <>
            <Link to='/hr/faculties' className="linkPrev">&laquo;</ Link> <br/>

    <div className="addStaff">		


					<span className="login100-form-title">
						Update {locationReact.state.fac.facultyName}
					</span>



            <div>
              <input required={true} ref={NameRef} className="input100" id="nameInput" placeholder="new name" />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
              </span>
            <br/>
					</div>


            

					<div className="container-login100-form-btn">
            <button onClick={HandleAddFac} className="login100-form-btn">
            Update </button>
					</div>

	


	</div>

	
</>

  )
}

