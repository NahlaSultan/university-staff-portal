import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../styling/main.css';


export default function ViewCourseCoverage() {
  const [coverage, setCoverage] = useState()
  const [Course,setCourse]=useState()
  const [courses,setCrs]= useState([])


  useEffect(() => {
    const fetchData = async () => {
      await
      axios   
      .get('http://localhost:8000/hod/viewCourses',{ headers: { 'token': localStorage.getItem('token') } })
      .then(res => {
        setCrs(res.data)
        }); 

    };
    fetchData();
    
    },[]);

     function HandleView(){
        const body={courseName: Course}

        axios   
        .post('http://localhost:8000/hod/viewCourseCoverage',body,{headers:{'token': localStorage.getItem('token')}})
        .then(res => {
            setCoverage(res.data)
          });
    }  

    function ChooseCourse(e){
      setCourse(e.target.value)
    }
    
  return (

    <>
    <div >
        <div className="assignCourse">


            <span className="login100-form-title">
                View Course Coverage
  </span>


            <div>
            <label >Course Name:  </label>
                  
                  <select className='dropbtn' name="types"  onChange={ChooseCourse}>
                      <option value=""> Course Name</option>
                      {courses.map(c => (
                          <option key={c} value={c}>{c}</option>
                      ))}
                  </select>
                  <br /><br /><br />
            </div>

        </div>        
        <br></br>
        <div className="buttons">
            <button onClick={HandleView} className="buttons">
                View Course Coverage
    </button>
    <br></br>
    <br></br>
        </div>
        <ul className='viewStaff'> {coverage}</ul>

        <br></br><br></br>
    </div>

</>

      
    

  )

}