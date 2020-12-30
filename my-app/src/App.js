// import React,{useState,useRef} from 'react' 
// import './App.css';
// import Nav from './Nav'
// import Login from './Login'
// import AddStaff from './AddStaff'
// import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
// import Home from './Home';

import React, { useState, useRef } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Login from './Login'
import HRprofile from './HRprofile'
import AssignCoordinator from './AssignCoordinator'
import RemoveAssignedCourse from './RemoveAssignedCourse'
import AssignCourse from './AssignCourse'
import AssignSlot from './AssignSlot'

//export default function App() {

//   return (
//     <>
//       <Switch>
//         <Route component={Login} exact path="/" />
       
//       </Switch>

//     </>
//   )

// }


 

//NAHLA
 import AddStaff from './AddStaff'
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
import Home from './Home';

export default function App() {
 
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

 }


