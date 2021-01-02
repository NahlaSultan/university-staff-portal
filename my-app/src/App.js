
// import HRprofile from './HRprofile'
// import AssignCoordinator from './AssignCoordinator'
// import RemoveAssignedCourse from './RemoveAssignedCourse'
// import AssignCourse from './AssignCourse'
// import AssignSlot from './AssignSlot'
// import AddStaff from './AddStaff'
// import {BrowserRouter as Router, Switch, Route, Link}  from 'react-router-dom'
// import Home from './Home';
// import Nav from './Nav'



import React, { useState, useRef } from 'react'
//import { Link, Switch, Route } from 'react-router-dom'
import Login from './Login'
import HRprofile from './HRprofile'
import AssignCoordinator from './AssignCoordinator'
import RemoveAssignedCourse from './RemoveAssignedCourse'
import AssignCourse from './AssignCourse'
import AssignSlot from './AssignSlot'
import AddStaff from './AddStaff'
import coordinatorProfile from './coordinatorProfile'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './Home';
import Nav from './Nav';
import ManageSlots from './ManageSlots'
import AddSlots from './AddSlots'
import InstructorProfile from './InstructorProfile'
import ViewSlots from './ViewSlots'
import ViewDepartmentStaff from './ViewDepartmentStaff'
import ViewCourseStaff from './ViewCourseStaff'

export default function App() {

  return (
    <Router>
      <div className='App'>
        <h1> app page</h1>
        <Switch>
          <Route exact path='/' exact component={Login} />
          {/* <Nav /> */}
          <Route exact path='/hr/addStaff' component={AddStaff} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/coordinator/addSlot' component={AddSlots} />
          <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
          <Route exact path='/ci/assignSlots' component={AssignSlot} />
          <Route exact path='/ci/updateAssignedCourse' component={AssignCourse} />
          <Route exact path='/ci/removeAssignedCourse' component={RemoveAssignedCourse} />
          <Route exact path='/ci/assignCourseCoordinator' component={AssignCoordinator} />
          <Route exact path='/ci/viewSlots' component={ViewSlots} />
          <Route exact path='/instructorProfile' component={InstructorProfile} />
          <Route exact path='/ci/viewDepartmentStaff' component={ViewDepartmentStaff} />
          <Route exact path='/ci/viewCourseStaff' component={ViewCourseStaff} />
          <Route component={HRprofile} exact path="/homeHR" />
          <Route component={coordinatorProfile} exact path="/coordinatorProfile" />
        
        </Switch>
      </div>
    </Router>
  )

}
