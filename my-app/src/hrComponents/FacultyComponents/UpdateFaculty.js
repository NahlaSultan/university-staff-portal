import React,{useRef,useState,useEffect} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useLocation,Link } from "react-router-dom";
import { useHistory } from "react-router-dom";





export default function UpdateFaculty() {
  let history = useHistory();

  useEffect(() => {
        
    const checkToken = async()=>{
        if(localStorage.getItem('token')){
          console.log("TOKENS")
          await axios
          .post('http://localhost:8000/getRoleFromToken', { token: localStorage.getItem('token')})
          .then(res => {
          if(!res.data.includes('HR members')) {
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
},[]);
  const NameRef=useRef()
  const locationReact = useLocation();
  const [res, setRes] = useState("")


 
  function HandleAddFac(){


    const body={
        name: locationReact.state.fac.facultyName,
        newName: NameRef.current.value
     }

   axios   
   .post('http://localhost:8000/hr/updateFaculty', body, { headers: { 'token': localStorage.getItem('token') } })
   .then(res=>{
     console.log(res.data)
     if(res.data=="success")
      history.push('/hr/faculties')
      setRes(res.data)
    
    });
   
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

          <div className="alert">
            {res}
          </div>




	</div>

	
</>

  )
}

