import React, { useRef,useState } from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useHistory,Link} from 'react-router-dom'


export default function AddFaculty() {
  let history = useHistory()
  const NameRef = useRef()
  const [res, setRes] = useState("")

  



  async function HandleAddFac() {

    if(!NameRef.current.value || NameRef.current.value==""){
      setRes("must sepcify faculty name")
      return
    } 

  

    const body = {
      name: NameRef.current.value,
    }

    await axios
      .post('http://localhost:8000/hr/addFaculty', body, { headers: { 'token': localStorage.getItem('token') } })
      .then( res => {
        setRes(res.data)
        if(res.data=="success")
          history.push('/hr/faculties')

      });

  }

  return (
    <>
      <div className="addStaff">
      <Link to='/hr/faculties' className="linkPrev">&laquo;</ Link> <br />


        <span className="login100-form-title">
          Add Faculty
					</span>



        <div>
          <input required={true} ref={NameRef} className="input100" id="nameInput" placeholder="Name" />
          <span className="focus-input100"></span>
          <span className="symbol-input100">
          </span>
          <br />
        </div>




        <div className="container-login100-form-btn">
          <button onClick={HandleAddFac} className="login100-form-btn">
            Add Faculty </button>
        </div>

        <div class="alert">
            {res}
            </div>


      </div>


    </>

  )
}

