// import React,{useState,useRef} from 'react' 
// import './App.css';
// import Nav from './Nav'
// import Login from './Login'
// import AddStaff from './AddStaff'
// import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
// import Home from './Home';

import React, { useState, useRef } from 'react'
//import { Link, Switch, Route } from 'react-router-dom'
import Login from './Login'
import HRprofile from './HRprofile'
import AssignCoordinator from './AssignCoordinator'
import RemoveAssignedCourse from './RemoveAssignedCourse'
import AssignCourse from './AssignCourse'
import AssignSlot from './AssignSlot'
import AddStaff from './AddStaff'
import {BrowserRouter as Router, Switch, Route, Link}  from 'react-router-dom'
import Home from './Home';
import Nav from './Nav'
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


export default function App() {
 
   return (
     <Router>  
   <div className='App'> 
   <Route path='/' exact component={Login} />
   <h1> app page</h1>
    <Nav/>
    <Switch> 
    <Route path='/hr/addStaff' component={AddStaff} />
   <Route path='/home' component={Home} />

   </Switch>
     </div> 
     </Router>   
   )

 }


