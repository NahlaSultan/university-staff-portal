import React,{useRef, useState,useEffect} from 'react'
import axios from 'axios'
import '../../styling/main.css';
import '../../styling/tables.css';

import { useHistory } from "react-router-dom";


export default function Faculty({fac }) {
    const [deps, setDeps] = useState([])
    const [toggle, setToggle] = useState(true)
    var facName = fac.facultyName+""
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
            state: { facultyName: fac.facultyName ,
            departmentArray: fac.departments}
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

    
    <>   
  
            <td><h3> {fac.facultyName}   </h3></td>

            <td> 
                <button className = 'btn' onClick={HandleDeleteFaculty}>   Delete   </button> 
                <button className = 'btn' onClick={HandleUpdateFaculty}>   Update   </button>
             </td>

             <td> 
             <button className = 'btn' onClick={HandleAddDepartments}>   Add Departments  </button> 
             </td>
             <td> 
             <button className = 'btn' onClick={HandleViewDepartments}>   View Departments  </button> 
             </td>
                



        </>      


    

  )

}



