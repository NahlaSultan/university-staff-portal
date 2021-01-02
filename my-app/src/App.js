
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
// 
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



//startSaraAmjad
import React, { useState, useRef } from 'react'
import Login from './mainComponents/Login'
import AddStaff from './hrComponents/AddStaff'
import coordinatorProfile from './coordinatorComponents/coordinatorProfile'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import HRprofile from './hrComponents/HRprofile';
import ManageSlots from './coordinatorComponents/ManageSlots'
import AddSlots from './coordinatorComponents/AddSlots'
import AssignSlot from './ciComponents/AssignSlot'
import AssignCourse from './ciComponents/AssignCourse'
import RemoveAssignedCourse from './ciComponents/RemoveAssignedCourse'
import AssignCoordinator from './ciComponents/AssignCoordinator'
import ViewSlots from './ciComponents/ViewSlots'
import InstructorProfile from './ciComponents/InstructorProfile'
import ViewDepartmentStaff from './ciComponents/ViewDepartmentStaff'
import ViewCourseStaff from './ciComponents/ViewCourseStaff'
import CourseCoverage from './ciComponents/CourseCoverage'
import ViewProfile from './smComponent/ViewProfile'
import staffProfile from './smComponent/StaffProfile'
import StaffProfile from './smComponent/StaffProfile'
import ViewAttendance from './smComponent/ViewAttendance'
import ViewMissingDays from './smComponent/ViewMissingDays'
import ViewMissingHours from './smComponent/ViewMissingHours'
import ViewExtraHours from './smComponent/ViewExtraHours'
import ResetPassword from './mainComponents/ResetPassword'

export default function App() {

  return (
    <Router>
      <div className='App'>
        <h1> app page</h1>
        <Switch>
          <Route exact path='/' exact component={Login} />
          {/* <Nav /> */}
          <Route exact path='/hr/addStaff' component={AddStaff} />
          <Route exact path='/HRProfile' component={HRprofile} />
          <Route exact path='/coordinator/addSlot' component={AddSlots} />
          <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
          <Route component={HRprofile} exact path="/homeHR" />
          <Route component={coordinatorProfile} exact path="/coordinatorProfile" />
          <Route exact path='/ci/assignSlots' component={AssignSlot} />
          <Route exact path='/ci/updateAssignedCourse' component={AssignCourse} />
          <Route exact path='/ci/removeAssignedCourse' component={RemoveAssignedCourse} />
          <Route exact path='/ci/assignCourseCoordinator' component={AssignCoordinator} />
          <Route exact path='/ci/viewSlots' component={ViewSlots} />
          <Route exact path='/instructorProfile' component={InstructorProfile} />
          <Route exact path='/ci/viewDepartmentStaff' component={ViewDepartmentStaff} />
          <Route exact path='/ci/viewCourseStaff' component={ViewCourseStaff} />
          <Route exact path='/ci/viewCoverage' component={CourseCoverage} />
          <Route exact path='/viewProfile' component={ViewProfile} />
          <Route exact path='/staffProfile' component={StaffProfile} />
          <Route exact path='/viewAttendance' component={ViewAttendance} />
          <Route exact path='/viewMissingDays' component={ViewMissingDays} />
          <Route exact path='/viewMissingHours' component={ViewMissingHours} />
          <Route exact path='/viewExtraHours' component={ViewExtraHours} />
          <Route exact path='/resetPassword' component={ResetPassword} />
        </Switch>
      </div>
    </Router>
  )

}
//END SaraAmjad