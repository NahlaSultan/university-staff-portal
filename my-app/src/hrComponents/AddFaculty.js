import React,{useRef} from 'react'
import axios from 'axios'
import '../styling/main.css'


export default function AddFaculty() {
  const NameRef=useRef()

  function ClearTxtfields(){
    document.getElementById('nameInput').value = ''
  }

  function HandleAddFac(){


    const body={
        name: NameRef.current.value,
     }

   axios   
   .post('http://localhost:8000/hr/addFaculty', body, { headers: { 'token': localStorage.getItem('token') } })
   .then(res=>console.log(res.data));
   
   ClearTxtfields()
  }

  return (
    <>
    <div className="addStaff">		


					<span className="login100-form-title">
						Add Faculty
					</span>



            <div>
              <input required={true} ref={NameRef} className="input100" id="nameInput" placeholder="Name" />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
              </span>
            <br/>
					</div>


            

					<div className="container-login100-form-btn">
            <button onClick={HandleAddFac} className="login100-form-btn">
            Add Faculty </button>
					</div>

	


	</div>

	
</>

  )
}

