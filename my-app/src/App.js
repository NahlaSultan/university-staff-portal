//Start Sofia
// import React, { useState, useRef } from 'react'
// import Login from './mainComponents/Login'
// import AddStaff from './hrComponents/AddStaff'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import HRprofile from './hrComponents/HRprofile';
// import AssignSlot from './ciComponents/AssignSlot'
// import AssignCourse from './ciComponents/AssignCourse'
// import RemoveAssignedCourse from './ciComponents/RemoveAssignedCourse'
// import AssignCoordinator from './ciComponents/AssignCoordinator'
// import ViewSlots from './ciComponents/ViewSlots'
// import InstructorProfile from './ciComponents/InstructorProfile'
// import ViewDepartmentStaff from './ciComponents/ViewDepartmentStaff'
// import ViewCourseStaff from './ciComponents/ViewCourseStaff'
// import CourseCoverage from './ciComponents/CourseCoverage'
// import ViewProfile from './smComponent/ViewProfile'
// import StaffProfile from './smComponent/StaffProfile'
// import ViewAttendance from './smComponent/ViewAttendance'
// import ViewMissingDays from './smComponent/ViewMissingDays'
// import ViewMissingHours from './smComponent/ViewMissingHours'
// import ViewExtraHours from './smComponent/ViewExtraHours'
// import ResetPassword from './mainComponents/ResetPassword'
// import SideNav from './mainComponents/SideNav'
// import CourseStaff from './ciComponents/CourseStaff';
// import MonthAttendance from './smComponent/MonthAttendance';
// import viewMonthAttendance from './smComponent/ViewMonthAttendance';
// import ViewMonthAttendance from './smComponent/ViewMonthAttendance';

// export default function App() {

//   return (
//     <Router>
//       <div className='App'>
//         <h1> app page</h1>
//         <Switch>
//         <Route exact path='/' exact component={Login} />
//           <Route exact path='/hr/addStaff' component={AddStaff} />
//           <Route exact path='/HRProfile' component={HRprofile} />
//           <Route exact path='/ci/assignSlots' component={AssignSlot} />
//           <Route exact path='/ci/updateAssignedCourse' component={AssignCourse} />
//           <Route exact path='/ci/removeAssignedCourse' component={RemoveAssignedCourse} />
//           <Route exact path='/ci/assignCourseCoordinator' component={AssignCoordinator} />
//           <Route exact path='/ci/viewSlots' component={ViewSlots} />
//           <Route exact path='/instructorProfile' component={InstructorProfile} />
//           <Route exact path='/ci/viewDepartmentStaff' component={ViewDepartmentStaff} />
//           <Route exact path='/ci/viewCourseStaff' component={ViewCourseStaff} />
//           <Route exact path='/ci/viewCoverage' component={CourseCoverage} />
//           <Route exact path='/viewProfile' component={ViewProfile} />
//           <Route exact path='/staffProfile' component={StaffProfile} />
//           <Route exact path='/viewAttendance' component={ViewAttendance} />
//           <Route exact path='/viewMissingDays' component={ViewMissingDays} />
//           <Route exact path='/viewMissingHours' component={ViewMissingHours} />
//           <Route exact path='/viewExtraHours' component={ViewExtraHours} />
//           <Route exact path='/resetPassword' component={ResetPassword} />
//           <Route exact path='/ci/courseStaff' component={CourseStaff} />
//           <Route exact path='/monthAttendance' component={MonthAttendance} />
//           <Route exact path='/viewMonthAttendance' component={ViewMonthAttendance} />
//         </Switch>
//       </div>
//     </Router>
//   )



// }

// //End Sofia

////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

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
import SideNav from './mainComponents/SideNav'
import Locations from './hrComponents/Locations';
import Faculties from './hrComponents/Faculties'
import AddStaff from './hrComponents/AddStaff'
import Login from './mainComponents/Login'
import Logout from './mainComponents/Logout';
import HRprofile from './hrComponents/HRprofile'
import Staffs from './hrComponents/Staffs';

import './styling/App.css'
import './styling/main.css'
import addLocation from './hrComponents/AddLocation';
import addDepartment from './hrComponents/AddDepartment';
import addFaculty from './hrComponents/AddFaculty';
import addCourse from './hrComponents/AddCourse';
import StaffsMissingHours from './hrComponents/StaffsMissingHours';
import StaffsMissingDays from './hrComponents/StaffsMissingDays';
import ManageAttendance from './hrComponents/ManageAttendance';
import ViewAttendance from './hrComponents/ViewAttendance'
import AddSignIn from './hrComponents/AddSignIn';
import AddSignOut from './hrComponents/AddSignOut';
import UpdateFaculty from './hrComponents/UpdateFaculty';
import UpdateDepartment from './hrComponents/UpdateDepartment';
import UpdateCourse from './hrComponents/UpdateCourse';
import UpdateStaff from './hrComponents/UpdateStaff';
import UpdateLocation from './hrComponents/UpdateLocation';
import UpdateSalary from './hrComponents/UpdateSalary';


export default function App() {

   return (
   <Router>  
   <div className='App'> 

   <Route path='/' exact component={Login} />

    <Nav/>
    <SideNav/>
    <Switch> 
    <Route path='/hr/addStaff' component={AddStaff} />
    <Route path='/hr/locations' component={Locations} />
    <Route path='/hr/staffs' component={Staffs} />
    <Route path='/hr/faculties' component={Faculties} />
    <Route path='/logout' component={Logout} />
    <Route path='/home' component={HRprofile} />
    <Route path='/addLocation' component={addLocation} />
    <Route path='/hr/addDepartment' component={addDepartment} />
    <Route path='/addFaculty' component={addFaculty} />
    <Route path='/addCourse' component={addCourse} />
    <Route path='/hr/viewMissingHours' component={StaffsMissingHours} />
    <Route path='/hr/viewMissingDays' component={StaffsMissingDays} />
    <Route path='/hr/manageAttendance' component={ManageAttendance}/>
    <Route path='/hr/viewAttendance' component={ViewAttendance}/>
    <Route path='/hr/AddSignIn' component={AddSignIn}/>
    <Route path='/hr/AddSignOut' component={AddSignOut}/>
    <Route path= '/hr/updateFaculty' component={UpdateFaculty}/>
    <Route path= '/hr/updateDepartment' component={UpdateDepartment}/>
    <Route path= '/hr/updateCourse' component={UpdateCourse}/>
    <Route path= '/hr/updateStaff' component={UpdateStaff}/>
    <Route path= '/hr/updateLocation' component={UpdateLocation}/>
    <Route path= '/hr/updateSalary' component={UpdateSalary}/>


    



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



//startSaraAmjadOLD
// import React, { useState, useRef } from 'react'
// import Login from './mainComponents/Login'
// import AddStaff from './hrComponents/AddStaff'
// import coordinatorProfile from './coordinatorComponents/coordinatorProfile'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import HRprofile from './hrComponents/HRprofile';
// import ManageSlots from './coordinatorComponents/ManageSlots'
// import AddSlots from './coordinatorComponents/AddSlots'
// import AssignSlot from './ciComponents/AssignSlot'
// import AssignCourse from './ciComponents/AssignCourse'
// import RemoveAssignedCourse from './ciComponents/RemoveAssignedCourse'
// import AssignCoordinator from './ciComponents/AssignCoordinator'
// import ViewSlots from './ciComponents/ViewSlots'
// import InstructorProfile from './ciComponents/InstructorProfile'
// import ViewDepartmentStaff from './ciComponents/ViewDepartmentStaff'
// import ViewCourseStaff from './ciComponents/ViewCourseStaff'
// import CourseCoverage from './ciComponents/CourseCoverage'
// import ViewProfile from './smComponent/ViewProfile'
// import staffProfile from './smComponent/StaffProfile'
// import StaffProfile from './smComponent/StaffProfile'
// import ViewAttendance from './smComponent/ViewAttendance'
// import ViewMissingDays from './smComponent/ViewMissingDays'
// import ViewMissingHours from './smComponent/ViewMissingHours'
// import ViewExtraHours from './smComponent/ViewExtraHours'
// import ResetPassword from './mainComponents/ResetPassword'
// import SideNav from './mainComponents/SideNav'

// export default function App() {

//   return (
//     <Router>
//       <div className='App'>
//         <h1> app page</h1>
//         <Route exact path='/' exact component={Login} />
//            <SideNav/>
//         <Switch>
//           {/* <Nav /> */}
//           <Route exact path='/hr/addStaff' component={AddStaff} />
//           <Route exact path='/HRProfile' component={HRprofile} />
//           <Route exact pa th='/coordinator/addSlot' component={AddSlots} />
//           <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
//           <Route component={HRprofile} exact path="/homeHR" />
//           <Route component={coordinatorProfile} exact path="/coordinatorProfile" />
//           <Route exact path='/ci/assignSlots' component={AssignSlot} />
//           <Route exact path='/ci/updateAssignedCourse' component={AssignCourse} />
//           <Route exact path='/ci/removeAssignedCourse' component={RemoveAssignedCourse} />
//           <Route exact path='/ci/assignCourseCoordinator' component={AssignCoordinator} />
//           <Route exact path='/ci/viewSlots' component={ViewSlots} />
//           <Route exact path='/instructorProfile' component={InstructorProfile} />
//           <Route exact path='/ci/viewDepartmentStaff' component={ViewDepartmentStaff} />
//           <Route exact path='/ci/viewCourseStaff' component={ViewCourseStaff} />
//           <Route exact path='/ci/viewCoverage' component={CourseCoverage} />
//           <Route exact path='/viewProfile' component={ViewProfile} />
//           <Route exact path='/staffProfile' component={StaffProfile} />
//           <Route exact path='/viewAttendance' component={ViewAttendance} />
//           <Route exact path='/viewMissingDays' component={ViewMissingDays} />
//           <Route exact path='/viewMissingHours' component={ViewMissingHours} />
//           <Route exact path='/viewExtraHours' component={ViewExtraHours} />
//           <Route exact path='/resetPassword' component={ResetPassword} />
//         </Switch>
//       </div>
//     </Router>
//   )



// }
////////////////////////////////////////////////////////////////////////////////
//startSaraAmjad
// import React, { useState, useRef } from 'react'
// import Login from './mainComponents/Login'
// import AddStaff from './hrComponents/AddStaff'
// import coordinatorProfile from './coordinatorComponents/coordinatorProfile'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import HRprofile from './hrComponents/HRprofile';
// import ManageSlots from './coordinatorComponents/ManageSlots';
// import AddSlots from './coordinatorComponents/AddSlots';
// import SideNav from './mainComponents/SideNav'
// import Nav from './mainComponents/Nav';
// import Schedule from './academicMembersComponents/ViewSchedule';
// import SendReplacement from './academicMembersComponents/SendReplacement';
// import ChangeDayOff from './academicMembersComponents/ChangeDayOff';
// export default function App() {

//   return (
//     <Router>
//       <div className='App'>
//         <h1> app page</h1>
//         <Route exact path='/' exact component={Login} />
//         <Nav />
//         <SideNav />
//         <Switch>

//           {/* {/* <Nav /> */}

//           <Route exact path='/hr/addStaff' component={AddStaff} />
//           <Route exact path='/HRProfile' component={HRprofile} />
//           <Route exact path='/coordinator/addSlot' component={AddSlots} />
//           <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
//           <Route exact path='/academic/schedule' component={Schedule} />
//           <Route exact path='/academic/manageReplacement' component={SendReplacement} />
//           <Route exact path='/academic/changeDayOff' component={ChangeDayOff} />
//           <Route component={HRprofile} exact path="/homeHR" />
//           <Route component={coordinatorProfile} exact path="/coordinatorProfile" />

//         </Switch>
//       </div>
//     </Router>
//   )

// }

//END SaraAmjad


// //Start Sofia
// import React, { useState, useRef } from 'react'
// import Login from './mainComponents/Login'
// import AddStaff from './hrComponents/AddStaff'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import HRprofile from './hrComponents/HRprofile';
// import AssignSlot from './ciComponents/AssignSlot'
// import AssignCourse from './ciComponents/AssignCourse'
// import RemoveAssignedCourse from './ciComponents/RemoveAssignedCourse'
// import AssignCoordinator from './ciComponents/AssignCoordinator'
// import ViewSlots from './ciComponents/ViewSlots'
// import InstructorProfile from './ciComponents/InstructorProfile'
// import ViewDepartmentStaff from './ciComponents/ViewDepartmentStaff'
// import ViewCourseStaff from './ciComponents/ViewCourseStaff'
// import CourseCoverage from './ciComponents/CourseCoverage'
// import ViewProfile from './smComponent/ViewProfile'
// import StaffProfile from './smComponent/StaffProfile'
// import ViewAttendance from './smComponent/ViewAttendance'
// import ViewMissingDays from './smComponent/ViewMissingDays'
// import ViewMissingHours from './smComponent/ViewMissingHours'
// import ViewExtraHours from './smComponent/ViewExtraHours'
// import ResetPassword from './mainComponents/ResetPassword'
// import SideNav from './mainComponents/SideNav'
// import CourseStaff from './ciComponents/CourseStaff';
// import MonthAttendance from './smComponent/MonthAttendance';
// import viewMonthAttendance from './smComponent/ViewMonthAttendance';
// import ViewMonthAttendance from './smComponent/ViewMonthAttendance';

// export default function App() {

//   return (
//     <Router>
//       <div className='App'>
//         <h1> app page</h1>
//         <Switch>
//         <Route exact path='/' exact component={Login} />
//           <Route exact path='/hr/addStaff' component={AddStaff} />
//           <Route exact path='/HRProfile' component={HRprofile} />
//           <Route exact path='/ci/assignSlots' component={AssignSlot} />
//           <Route exact path='/ci/updateAssignedCourse' component={AssignCourse} />
//           <Route exact path='/ci/removeAssignedCourse' component={RemoveAssignedCourse} />
//           <Route exact path='/ci/assignCourseCoordinator' component={AssignCoordinator} />
//           <Route exact path='/ci/viewSlots' component={ViewSlots} />
//           <Route exact path='/instructorProfile' component={InstructorProfile} />
//           <Route exact path='/ci/viewDepartmentStaff' component={ViewDepartmentStaff} />
//           <Route exact path='/ci/viewCourseStaff' component={ViewCourseStaff} />
//           <Route exact path='/ci/viewCoverage' component={CourseCoverage} />
//           <Route exact path='/viewProfile' component={ViewProfile} />
//           <Route exact path='/staffProfile' component={StaffProfile} />
//           <Route exact path='/viewAttendance' component={ViewAttendance} />
//           <Route exact path='/viewMissingDays' component={ViewMissingDays} />
//           <Route exact path='/viewMissingHours' component={ViewMissingHours} />
//           <Route exact path='/viewExtraHours' component={ViewExtraHours} />
//           <Route exact path='/resetPassword' component={ResetPassword} />
//           <Route exact path='/ci/courseStaff' component={CourseStaff} />
//           <Route exact path='/monthAttendance' component={MonthAttendance} />
//           <Route exact path='/viewMonthAttendance' component={ViewMonthAttendance} />
//         </Switch>
//       </div>
//     </Router>
//   )


// }
// //End Sofia

///////////////////////////////////////////////////////////////////
// // Start HASSAN
// import React, { useState, useRef } from 'react'
//  import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
//  import Login from './mainComponents/Login'
// import ViewAllStaff from './hodComponents/ViewAllStaff'
// import AssignInstructor from './hodComponents/AssignInstructor'
// import Nav from './mainComponents/Nav';
// import HodSideNav from './hodComponents/HodSideNav'
// import HodProfile from './hodComponents/HodProfile'

//  export default function App() {

//   return (
    
//     <Router>
//       <div className='App'>
//       <h1> app page</h1>
//         <Route exact path='/' exact component={Login} />
//         <HodSideNav />
//         <Route exact path='/home' component={HodProfile} />
//         <Route exact path='/hod/viewAllStaff' component={ViewAllStaff} />
        
//         <Nav />
//       </div>
//     </Router>
//   )

// }
// //END HASSAN
////////////////////////////////////////////////////////////////
//END SaraAmjad
/////////////////////////////////////////////////////////////////////
// import React, { useState, useRef } from 'react'
// import {BrowserRouter as Router, Switch, Route, Link}  from 'react-router-dom'

// import Home from './mainComponents/Home';
// import Nav from './mainComponents/Nav';
// import SideNav from './mainComponents/SideNav'
// import Locations from './hrComponents/Locations';
// import Faculties from './hrComponents/Faculties'
// import AddStaff from './hrComponents/AddStaff'
// import Login from './mainComponents/Login'
// import Logout from './mainComponents/Logout';
// import HRprofile from './hrComponents/HRprofile'
// import AssignCoordinator from './ciComponents/AssignCoordinator'
// import RemoveAssignedCourse from './ciComponents/RemoveAssignedCourse'
// import AssignCourse from './ciComponents/AssignCourse'
// import AssignSlot from './acComponents/AssignSlot'

// import './styling/App.css'
// import './styling/main.css'



// export default function App() {

//    return (
//    <Router>  
//    <div className='App'> 
//     <Route path='/' exact component={Login} />
//     <Nav/>
//     <SideNav/>
//     <Switch> 
//     <Route path='/hr/addStaff' component={AddStaff} />
//     <Route path='/hr/locations' component={Locations} />
//     <Route path='/hr/faculties' component={Faculties} />
//     <Route path='/logout' component={Logout} />
//    <Route path='/home' component={Home} />

//     </Switch>
//      </div> 
//      </Router>   
//    )

//  }
// 
 //end nahla

