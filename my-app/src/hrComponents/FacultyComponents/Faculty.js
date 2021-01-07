import React,{useRef, useState} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import { useHistory } from "react-router-dom";


export default function Faculty({fac }) {
    const [deps, setDeps] = useState([])
    const [toggle, setToggle] = useState(true)
    var facName = fac.facultyName+""
    let history = useHistory();

    function HandleDeleteFaculty(){

        const body = {name: facName}
       axios   
       .post('http://localhost:8000/hr/deleteFaculty',body, { headers: { 'token': localStorage.getItem('token') } })
       .then(res=>console.log(res.data));
    
    }

    function HandleUpdateFaculty(){
        history.push({
            pathname: '/hr/updateFaculty',
            state: { fac: fac }
           })
       
    
    }
    function HandleAddDepartments(){
        history.push({
            pathname: '/hr/addDepartment',
            state: { facultyName: fac.facultyName }
           })
    }
   

     function HandleViewDepartments(){
        history.push({
            pathname: '/hr/departmentsPage',
            state: { fac: fac }
           })


        // if(toggle){
 
        //        setDeps(fac.departments)
        //    }
        //    else{
        //        setDeps([])
        //    }  
        // setToggle(toggle => !toggle)
    }



  return (

    
    <div className='leftDiv'>   
  
                <h2> {fac.facultyName} 
                <button className = 'btn' onClick={HandleDeleteFaculty}>   Delete   </button> 
                <button className = 'btn' onClick={HandleUpdateFaculty}>   Update   </button> 
                <br/></h2>

                <button className = 'btn' onClick={HandleAddDepartments}>   Add Departments  </button> 
                <button className = 'btn' onClick={HandleViewDepartments}>   View Departments  </button> 
                
                <br/><br/>



        </div>      


    

  )

}



