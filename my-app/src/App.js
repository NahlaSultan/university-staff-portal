
import React,{useState,useRef} from 'react' 
import './App.css';
import Nav from './Nav'
import Login from './Login'

//NAHLA
/* import AddStaff from './AddStaff'
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
import Home from './Home';

function App() {
 
  return (
    <Router>  
  <div className='App'> 
   <h1> app page</h1>
   <Nav/>
   <Switch> 
   <Route path='/' exact component={Home} />

   <Route path='/hr/addStaff' component={AddStaff} />
   <Route path='/login' component={Login} />
   </Switch>
    </div> 
    </Router>   
  )

*/
//END NAHLA

import AssignCoordinator from './AssignCoordinator'
import RemoveAssignedCourse from './RemoveAssignedCourse'
import AssignCourse from './AssignCourse'
import AssignSlot from './AssignSlot'
function App() {
 
  return (
    <>
    <AssignSlot/>
    
    </>
  )
}

export default App;

 