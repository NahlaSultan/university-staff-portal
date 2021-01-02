
// import HRprofile from './HRprofile'
// import AssignCoordinator from './AssignCoordinator'
// import RemoveAssignedCourse from './RemoveAssignedCourse'
// import AssignCourse from './AssignCourse'
// import AssignSlot from './AssignSlot'
// import AddStaff from './AddStaff'
// import {BrowserRouter as Router, Switch, Route, Link}  from 'react-router-dom'
// import Home from './Home';
// import Nav from './Nav'




//NAHLA
import React, { useState, useRef } from 'react'
import {BrowserRouter as Router, Switch, Route, Link}  from 'react-router-dom'

import Home from './mainComponents/Home';
import Nav from './mainComponents/Nav';
import Locations from './hrComponents/Locations';
import Faculties from './hrComponents/Faculties'
import AddStaff from './hrComponents/AddStaff'
import Login from './mainComponents/Login'
import HRprofile from './hrComponents/HRprofile'
import AssignCoordinator from './ciComponents/AssignCoordinator'
import RemoveAssignedCourse from './ciComponents/RemoveAssignedCourse'
import AssignCourse from './ciComponents/AssignCourse'
import AssignSlot from './acComponents/AssignSlot'
import './styling/App.css'
import './styling/main.css'

 

export default function App() {
 
   return (
   <Router>  
   <div className='App'> 
    <Route path='/' exact component={Login} />
    <h1> app page</h1>
    <Nav/>

    <Switch> 
    <Route path='/hr/addStaff' component={AddStaff} />
    <Route path='/hr/locations' component={Locations} />
    <Route path='/hr/faculties' component={Faculties} />

   <Route path='/home' component={Home} />

    </Switch>
     </div> 
     </Router>   
   )

 }
 //end nahla






 // 
//  =======
//    return (
//      <Router>  
//    <div className='App'> 
//    <Route path='/' exact component={Login} />
//    <h1> app page</h1>
//     <Nav/>
//     <Switch> 
//     <Route path='/hr/addStaff' component={AddStaff} />
//    <Route path='/home' component={Home} />

//     <Route component={HRprofile} exact path="/homeHR" />
//    </Switch>
//      </div> 
//      </Router>   
//    )

//  }
// >>>>>>> 5625b40f960a7f098cbedb69a0dc4d35238066e1

// import React, { useState, useRef } from 'react'
// //import { Link, Switch, Route } from 'react-router-dom'
// import Login from './Login'
// import HRprofile from './HRprofile'
// import AssignCoordinator from './AssignCoordinator'
// import RemoveAssignedCourse from './RemoveAssignedCourse'
// import AssignCourse from './AssignCourse'
// import AssignSlot from './AssignSlot'
// import AddStaff from './AddStaff'
// import coordinatorProfile from './coordinatorProfile'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import Home from './Home';
// import Nav from './Nav';
// import ManageSlots from './ManageSlots'
// import AddSlots from './AddSlots'

// export default function App() {

//   return (
//     <Router>
//       <div className='App'>
//         <h1> app page</h1>
//         <Switch>
//           <Route exact path='/' exact component={Login} />
//           {/* <Nav /> */}
//           <Route exact path='/hr/addStaff' component={AddStaff} />
//           <Route exact path='/home' component={Home} />
//           <Route exact path='/coordinator/addSlot' component={AddSlots} />
//           <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
//           <Route component={HRprofile} exact path="/homeHR" />
//           <Route component={coordinatorProfile} exact path="/coordinatorProfile" />

//         </Switch>
//       </div>
//     </Router>
//   )

// }
