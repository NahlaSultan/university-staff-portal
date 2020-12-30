import React,{useRef} from 'react'
import axios from 'axios'
export default function AddStaff() {
  const EmailRef=useRef()
  const NameRef=useRef()
  const RoleRef=useRef()
  const DayOffRef=useRef()
  const SalaryRef=useRef()
  const OfficeRef=useRef()
  const GenderRef=useRef()

  function HandleAddStaff(){


    const body={email:EmailRef.current.value, name:NameRef.current.value ,
        role:RoleRef.current.value, dayOff:DayOffRef.current.value ,
        salary:SalaryRef.current.value, officeLocation:OfficeRef.current.value ,
        gender:GenderRef.current.value
     }
  //  console.log(body)

   axios   
   .post('http://localhost:8000/hr/addStaff', body)
   
   .then(res=>console.log(res.data));
   // callAPI()
}

  return (
    <div>
     Name:
    <input ref={NameRef} type="text"/>
    <br></br>
    Email:
    <input ref={EmailRef} type="text"/>
    <br></br>
    Role:
    <input ref={RoleRef} type="text"/>
    <br></br>
    Day Off:
    <input ref={DayOffRef} type="text"/>
    <br></br>
    Salary:
    <input ref={SalaryRef} type="text"/>
    <br></br>
    Office number:
    <input ref={OfficeRef} type="text"/>
    <br></br>
    Gender:
    <input ref={GenderRef} type="text"/>
    <br></br>
    <button onClick={HandleAddStaff}> Add </button>
    </div>
  )
}

