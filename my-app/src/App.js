
//Start Sofia

// import React, { useState, useRef } from 'react'
// import Login from './mainComponents/Login'
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
// import Nav from './mainComponents/Nav';
// import CourseStaff from './ciComponents/CourseStaff';
// import MonthAttendance from './smComponent/MonthAttendance';
// import ViewMonthAttendance from './smComponent/ViewMonthAttendance';
// import UpdateProfile from './smComponent/UpdateProfile';

// export default function App() {

//   return (
//     <Router>
//       <div className='App'>

//         {/* <h1> app page</h1> */}
//         <Route path='/' exact component={Login} />

//         <Nav/>
//         <SideNav/>

//         <Switch>
//         <Route exact path='/' exact component={Login} />
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
//           <Route exact path='/updateProfile' component={UpdateProfile} />
//         </Switch>
//       </div>
//     </Router>
//   )


// }

//End Sofia

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

// import React, { useState, useRef } from 'react'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// import Home from './mainComponents/Home';
// import Nav from './mainComponents/Nav';
// import SideNav from './mainComponents/SideNav'
// import SideNavHR from './hrComponents/SideNavHR'

// import Locations from './hrComponents/LocationComponents/Locations';
// import Faculties from './hrComponents/FacultyComponents/Faculties'
// import AddStaff from './hrComponents/StaffComponents/AddStaff'
// import Login from './mainComponents/Login'
// import Logout from './mainComponents/Logout';
// import HRprofile from './hrComponents/HRprofile'
// import Staffs from './hrComponents/StaffComponents/Staffs';

// import './styling/App.css'
// import './styling/main.css'
// import addLocation from './hrComponents/LocationComponents/AddLocation';
// import addDepartment from './hrComponents/FacultyComponents/AddDepartment';
// import addFaculty from './hrComponents/FacultyComponents/AddFaculty';
// import addCourse from './hrComponents/FacultyComponents/AddCourse';
// import StaffsMissingHours from './hrComponents/AttendanceComponents/StaffsMissingHours';
// import StaffsMissingDays from './hrComponents/AttendanceComponents/StaffsMissingDays';
// import ManageAttendance from './hrComponents/AttendanceComponents/ManageAttendance';
// import ViewAttendance from './hrComponents/AttendanceComponents/ViewAttendance'
// import AddSignIn from './hrComponents/AttendanceComponents/AddSignIn';
// import AddSignOut from './hrComponents/AttendanceComponents/AddSignOut';
// import UpdateFaculty from './hrComponents/FacultyComponents/UpdateFaculty';
// import UpdateDepartment from './hrComponents/FacultyComponents/UpdateDepartment';
// import UpdateCourse from './hrComponents/FacultyComponents/UpdateCourse';
// import UpdateStaff from './hrComponents/StaffComponents/UpdateStaff';
// import UpdateLocation from './hrComponents/LocationComponents/UpdateLocation';
// import UpdateSalary from './hrComponents/StaffComponents/UpdateSalary';
// import AddHr from './hrComponents/StaffComponents/AddHr';
// import DepartmentPage from './hrComponents/FacultyComponents/DepartmentPage';
// import CoursePage from './hrComponents/FacultyComponents/CoursePage';
// import Profile from './hrComponents/Profile';
// import StaffProfile from './smComponent/StaffProfile'
// ////academic and coordinator
// import coordinatorProfile from './coordinatorComponents/coordinatorProfile'
// import ManageSlots from './coordinatorComponents/ManageSlots';
// import AddSlots from './coordinatorComponents/AddSlots';
// import ManageLinkingRequest from './coordinatorComponents/ManageLinkingRequest';
// import Schedule from './academicMembersComponents/ViewSchedule';
// import SendReplacement from './academicMembersComponents/SendReplacement';
// import ChangeDayOff from './academicMembersComponents/ChangeDayOff';
// import ViewReplacementRequest from './academicMembersComponents/ViewReplacementRequest'
// import SendSlotLinkingRequest from './academicMembersComponents/SendSlotLinkingRequest';
// import SubmitLeaveRequest from './academicMembersComponents/SubmitLeaveRequest';
// import Requests from './academicMembersComponents/Requests';
// import ViewStatus from './academicMembersComponents/ViewStatus';
// import ViewAccepted from './academicMembersComponents/ViewAccepted';
// import ViewRejected from './academicMembersComponents/ViewRejected';
// import viewPending from './academicMembersComponents/ViewPending';
// import CangelDayOff from './academicMembersComponents/CangelDayOff';
// import CancelSlotLinking from './academicMembersComponents/CancelSlotLinking';
// import CancelLeaveRequest from './academicMembersComponents/CancelLeaveRequest';
// import Bell from './academicMembersComponents/Bell';
// ///////// cI and Staffmmbers
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
// import ViewMissingDays from './smComponent/ViewMissingDays'
// import ViewMissingHours from './smComponent/ViewMissingHours'
// import ViewExtraHours from './smComponent/ViewExtraHours'
// import ResetPassword from './mainComponents/ResetPassword'
// import CourseStaff from './ciComponents/CourseStaff';
// import MonthAttendance from './smComponent/MonthAttendance';
// import ViewMonthAttendance from './smComponent/ViewMonthAttendance';
// import UpdateProfile from './smComponent/UpdateProfile';
// import ViewAllStaff from './hodComponents/ViewAllStaff'
// import HodSideNav from './hodComponents/HodSideNav'
// import HodProfile from './hodComponents/HodProfile'
// import ViewStaffinCourse from './hodComponents/ViewStaffinCourse'
// import ViewDayOffAllStaff from './hodComponents/ViewDayOffAllStaff'
// import ViewDayOffSingleStaff from './hodComponents/ViewDayOffSingleStaff'
// import ViewAllRequests from './hodComponents/ViewAllRequests'
// import ViewChangeDayOffRequests from './hodComponents/ViewChangeDayOffRequests'
// import ViewLeaveRequests from './hodComponents/ViewLeaveRequests'
// import ViewCourseCoverage from './hodComponents/ViewCourseCoverage'
// import ViewTeachingAssignments from './hodComponents/ViewTeachingAssignments'
// import AssignInstructor from './hodComponents/AssignInstructor'
// import DeleteInstructor from './hodComponents/DeleteInstructor'
// import UpdateInstructor from './hodComponents/UpdateInstructor'
// import AcceptChangeDayoff from './hodComponents/AcceptChangeDayoff'
// import RejectChangeDayoff from './hodComponents/RejectChangeDayoff'
// import AcceptLeaveRequest from './hodComponents/AcceptLeaveRequest'
// import RejectLeaveRequest from './hodComponents/RejectLeaveRequest'

// export default function App() {

//   return (
//     <Router>
//       <div className='App'>

//         <Route path='/' exact component={Login} />
//         <Route path='/hr' component={Nav} />
//         <Route path='/hr' component={SideNav} />
//         <Route path='/ci' component={Nav} />
//         <Route path='/ci' component={SideNav} />
//         <Route path='/academic' component={Nav} />
//         <Route path='/academic' component={SideNav} />
//         <Route path='/coordinator' component={Nav} />
//         <Route path='/coordinator' component={SideNav} />
//         <Route path='/hod' component={Nav} />
//         <Route path='/hod' component={SideNav} />
//         <Switch>
//           <Route exact path='/staffProfile' component={StaffProfile} />

//           <Route path='/hr/addStaff' component={AddStaff} />
//           <Route path='/hr/locations' component={Locations} />
//           <Route path='/hr/staffs' component={Staffs} />
//           <Route path='/hr/faculties' component={Faculties} />
//           <Route path='/logout' component={Logout} />
//           <Route path='/hr/home' component={HRprofile} />
//           <Route path='/hr/addLocation' component={addLocation} />
//           <Route path='/hr/addDepartment' component={addDepartment} />
//           <Route path='/hr/addFaculty' component={addFaculty} />
//           <Route path='/hr/addCourse' component={addCourse} />
//           <Route path='/hr/viewMissingHours' component={StaffsMissingHours} />
//           <Route path='/hr/viewMissingDays' component={StaffsMissingDays} />
//           <Route path='/hr/manageAttendance' component={ManageAttendance} />
//           <Route path='/hr/viewAttendance' component={ViewAttendance} />
//           <Route path='/hr/AddSignIn' component={AddSignIn} />
//           <Route path='/hr/AddSignOut' component={AddSignOut} />
//           <Route path='/hr/updateFaculty' component={UpdateFaculty} />
//           <Route path='/hr/updateDepartment' component={UpdateDepartment} />
//           <Route path='/hr/updateCourse' component={UpdateCourse} />
//           <Route path='/hr/updateStaff' component={UpdateStaff} />
//           <Route path='/hr/updateLocation' component={UpdateLocation} />
//           <Route path='/hr/updateSalary' component={UpdateSalary} />
//           <Route path='/hr/addHR' component={AddHr} />
//           <Route path='/hr/departmentsPage' component={DepartmentPage} />
//           <Route path='/hr/coursePage' component={CoursePage} />
//           <Route path='/hr/home' component={HRprofile} />
//           {/* academic and coordinator */}
//           <Route exact path='/coordinator/addSlot' component={AddSlots} />
//           <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
//           <Route exact path='/coordinator/ManageLinkingRequest' component={ManageLinkingRequest} />
//           <Route exact path='/academic/schedule' component={Schedule} />
//           <Route exact path='/academic/manageReplacement' component={SendReplacement} />
//           <Route exact path='/academic/changeDayOff' component={ChangeDayOff} />
//           <Route exact path='/academic/Requests' component={Requests} />
//           <Route exact path='/academic/ViewReplacementRequest' component={ViewReplacementRequest} />
//           <Route exact path='/academic/SendSlotLinkingRequest' component={SendSlotLinkingRequest} />
//           <Route exact path='/academic/SubmitLeaveRequest' component={SubmitLeaveRequest} />
//           <Route exact path='/academic/Requests/ViewStatus' component={ViewStatus} />
//           <Route exact path='/academic/Requests/ViewAccepted' component={ViewAccepted} />
//           <Route exact path='/academic/Requests/ViewRejected' component={ViewRejected} />
//           <Route exact path='/academic/Requests/ViewPending' component={viewPending} />
//           <Route exact path='/academic/Requests/CancelDayOff' component={CangelDayOff} />
//           <Route exact path='/academic/Requests/CancelSlotLinking' component={CancelSlotLinking} />
//           <Route exact path='/academic/Requests/CancelLeaveRequest' component={CancelLeaveRequest} />
//           <Route exact path='/academic/Bell' component={Bell} />
//           <Route component={coordinatorProfile} exact path="/coordinatorProfile" />
//           {/* ci and staff members */}
// //           <Route exact path='/ci/assignSlots' component={AssignSlot} />
// //           <Route exact path='/ci/updateAssignedCourse' component={AssignCourse} />
// //           <Route exact path='/ci/removeAssignedCourse' component={RemoveAssignedCourse} />
// //           <Route exact path='/ci/assignCourseCoordinator' component={AssignCoordinator} />
// //           <Route exact path='/ci/viewSlots' component={ViewSlots} />
// //           <Route exact path='/instructorProfile' component={InstructorProfile} />
// //           <Route exact path='/ci/viewDepartmentStaff' component={ViewDepartmentStaff} />
// //           <Route exact path='/ci/viewCourseStaff' component={ViewCourseStaff} />
// //           <Route exact path='/ci/viewCoverage' component={CourseCoverage} />
// //           <Route exact path='/viewProfile' component={ViewProfile} />
// //           <Route exact path='/staffProfile' component={StaffProfile} />
// //           <Route exact path='/viewAttendance' component={ViewAttendance} />
// //           <Route exact path='/viewMissingDays' component={ViewMissingDays} />
// //           <Route exact path='/viewMissingHours' component={ViewMissingHours} />
// //           <Route exact path='/viewExtraHours' component={ViewExtraHours} />
// //           <Route exact path='/resetPassword' component={ResetPassword} />
// //           <Route exact path='/ci/courseStaff' component={CourseStaff} />
// //           <Route exact path='/monthAttendance' component={MonthAttendance} />
// //           <Route exact path='/viewMonthAttendance' component={ViewMonthAttendance} />
// //           <Route exact path='/updateProfile' component={UpdateProfile} />

//           {/* hod components */}
//           <Route exact path='/homeHOD' component={HodProfile} />
//           <Route exact path='/hod/viewAllStaff' component={ViewAllStaff} />
//           <Route exact path='/hod/viewStaffinCourse' component={ViewStaffinCourse} />
//           <Route exact path='/hod/viewDayOffAllStaff' component={ViewDayOffAllStaff} />
//           <Route exact path='/hod/viewDayOffSingleStaff' component={ViewDayOffSingleStaff} />
//           <Route exact path='/hod/viewAllRequests' component={ViewAllRequests} />
//           <Route exact path='/hod/viewChangeDayOffRequests' component={ViewChangeDayOffRequests} />
//           <Route exact path='/hod/viewLeaveRequests' component={ViewLeaveRequests} />
//           <Route exact path='/hod/viewCourseCoverage' component={ViewCourseCoverage} />
//           <Route exact path='/hod/viewTeachingAssignments' component={ViewTeachingAssignments} />
//           <Route exact path='/hod/assignInstructor' component={AssignInstructor} />
//           <Route exact path='/hod/deleteInstructor' component={DeleteInstructor} />
//           <Route exact path='/hod/updateInstructor' component={UpdateInstructor} />
//           <Route exact path='/hod/acceptChangeDayOffRequest' component={AcceptChangeDayoff} />
//           <Route exact path='/hod/rejectChangeDayOffRequest' component={RejectChangeDayoff} />
//           <Route exact path='/hod/acceptLeaveRequest' component={AcceptLeaveRequest} />
//           <Route exact path='/hod/rejectLeaveRequest' component={RejectLeaveRequest} />


//         </Switch>
//       </div>
//     </Router>
//   )

// }

//end nahla








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
// import coordinatorProfile from './coordinatorComponents/coordinatorProfile'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import HRprofile from './hrComponents/HRprofile';
// import ManageSlots from './coordinatorComponents/ManageSlots';
// import AddSlots from './coordinatorComponents/AddSlots';
// import ManageLinkingRequest from './coordinatorComponents/ManageLinkingRequest';
// import SideNav from './mainComponents/SideNav'
// import Nav from './mainComponents/Nav';
// import Schedule from './academicMembersComponents/ViewSchedule';
// import SendReplacement from './academicMembersComponents/SendReplacement';
// import ChangeDayOff from './academicMembersComponents/ChangeDayOff';
// import ViewReplacementRequest from './academicMembersComponents/ViewReplacementRequest'
// import SendSlotLinkingRequest from './academicMembersComponents/SendSlotLinkingRequest';
// import SubmitLeaveRequest from './academicMembersComponents/SubmitLeaveRequest';
// import Requests from './academicMembersComponents/Requests';
// import ViewStatus from './academicMembersComponents/ViewStatus';
// import ViewAccepted from './academicMembersComponents/ViewAccepted';
// import ViewRejected from './academicMembersComponents/ViewRejected';
// import viewPending from './academicMembersComponents/ViewPending';
// import CangelDayOff from './academicMembersComponents/CangelDayOff';
// import CancelSlotLinking from './academicMembersComponents/CancelSlotLinking';
// import CancelLeaveRequest from './academicMembersComponents/CancelLeaveRequest';
// import Bell from './academicMembersComponents/Bell';
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

//           <Route exact path='/HRProfile' component={HRprofile} />
//           <Route exact path='/coordinator/addSlot' component={AddSlots} />
//           <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
//           <Route exact path='/coordinator/ManageLinkingRequest' component={ManageLinkingRequest} />
//           <Route exact path='/academic/schedule' component={Schedule} />
//           <Route exact path='/academic/manageReplacement' component={SendReplacement} />
//           <Route exact path='/academic/changeDayOff' component={ChangeDayOff} />
//           <Route exact path='/academic/Requests' component={Requests} />
//           <Route exact path='/academic/ViewReplacementRequest' component={ViewReplacementRequest} />
//           <Route exact path='/academic/SendSlotLinkingRequest' component={SendSlotLinkingRequest} />
//           <Route exact path='/academic/SubmitLeaveRequest' component={SubmitLeaveRequest} />
//           <Route exact path='/academic/Requests/ViewStatus' component={ViewStatus} />
//           <Route exact path='/academic/Requests/ViewAccepted' component={ViewAccepted} />
//           <Route exact path='/academic/Requests/ViewRejected' component={ViewRejected} />
//           <Route exact path='/academic/Requests/ViewPending' component={viewPending} />
//           <Route exact path='/academic/Requests/CancelDayOff' component={CangelDayOff} />
//           <Route exact path='/academic/Requests/CancelSlotLinking' component={CancelSlotLinking} />
//           <Route exact path='/academic/Requests/CancelLeaveRequest' component={CancelLeaveRequest} />
//           <Route exact path='/academic/Bell' component={Bell} />
//           <Route component={HRprofile} exact path="/homeHR" />
//           <Route component={coordinatorProfile} exact path="/coordinatorProfile" />

//         </Switch>
//       </div>
//     </Router>
//   )

// }


//END SaraAmjad


//Start Sofia

// import React, { useState, useRef } from 'react'
// import Login from './mainComponents/Login'
// import coordinatorProfile from './coordinatorComponents/coordinatorProfile'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// import ManageSlots from './coordinatorComponents/ManageSlots';
// import AddSlots from './coordinatorComponents/AddSlots';
// import SideNav from './mainComponents/SideNav'
// import Nav from './mainComponents/Nav';
// import Schedule from './academicMembersComponents/ViewSchedule';
// import SendReplacement from './academicMembersComponents/SendReplacement';
// import ChangeDayOff from './academicMembersComponents/ChangeDayOff';
// import ViewReplacementRequest from './academicMembersComponents/ViewReplacementRequest'
// import SendSlotLinkingRequest from './academicMembersComponents/SendSlotLinkingRequest';
// import SubmitLeaveRequest from './academicMembersComponents/SubmitLeaveRequest';
// import Requests from './academicMembersComponents/Requests';

// export default function App() {

//   return (
//     <Router>
//       <div className='App'>


//       <h1> app page</h1>

//         <Route exact path='/' exact component={Login} />

//         <HodSideNav />

//         <Route exact path='/home' component={HodProfile} />
//         <Route exact path='/hod/viewAllStaff' component={ViewAllStaff} />
//         <Route exact path='/hod/viewStaffinCourse' component={ViewStaffinCourse} />
//         <Route exact path='/hod/viewDayOffAllStaff' component={ViewDayOffAllStaff} />
//         <Route exact path='/hod/viewDayOffSingleStaff' component={ViewDayOffSingleStaff} />
//         <Route exact path='/hod/viewAllRequests' component={ViewAllRequests} />
//         <Route exact path='/hod/viewChangeDayOffRequests' component={ViewChangeDayOffRequests} />
//         <Route exact path='/hod/viewLeaveRequests' component={ViewLeaveRequests} />
//         <Route exact path='/hod/viewCourseCoverage' component={ViewCourseCoverage} />
//         <Route exact path='/hod/viewTeachingAssignments' component={ViewTeachingAssignments} />
//         <Route exact path='/hod/assignInstructor' component={AssignInstructor} />
//         <Route exact path='/hod/deleteInstructor' component={DeleteInstructor} />
//         <Route exact path='/hod/updateInstructor' component={UpdateInstructor} />
//         <Route exact path='/hod/acceptChangeDayOffRequest' component={AcceptChangeDayoff} />
//         <Route exact path='/hod/rejectChangeDayOffRequest' component={RejectChangeDayoff} />
//         <Route exact path='/hod/acceptLeaveRequest' component={AcceptLeaveRequest} />
//         <Route exact path='/hod/rejectLeaveRequest' component={RejectLeaveRequest} />



//         <h1> app page</h1>
//         <Route exact path='/' exact component={Login} />
//         <Nav />
//         <SideNav />
//         <Switch>

//           {/* {/* <Nav /> */}


//           <Route exact path='/coordinator/addSlot' component={AddSlots} />
//           <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
//           <Route exact path='/academic/schedule' component={Schedule} />
//           <Route exact path='/academic/manageReplacement' component={SendReplacement} />
//           <Route exact path='/academic/changeDayOff' component={ChangeDayOff} />
//           <Route exact path='/academic/Requests' component={Requests} />
//           <Route exact path='/academic/ViewReplacementRequest' component={ViewReplacementRequest} />
//           <Route exact path='/academic/SendSlotLinkingRequest' component={SendSlotLinkingRequest} />
//           <Route exact path='/academic/SubmitLeaveRequest' component={SubmitLeaveRequest} />
//           <Route component={coordinatorProfile} exact path="/coordinatorProfile" />


//         </Switch>
//       </div>
//     </Router>
//   )

// }



//   return (
//     <Router>
//       <div className='App'>


//END SaraAmjad






///////////////////////////////// Start HASSAN  ////////////////////////////////////
// import React, { useState, useRef } from 'react'
//  import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
//  import Login from './mainComponents/Login'
// import ViewAllStaff from './hodComponents/ViewAllStaff'
// import Nav from './mainComponents/Nav';
// import HodSideNav from './hodComponents/HodSideNav'
// import HodProfile from './hodComponents/HodProfile'
// import ViewStaffinCourse from './hodComponents/ViewStaffinCourse'
// import ViewDayOffAllStaff from './hodComponents/ViewDayOffAllStaff'
// import ViewDayOffSingleStaff from './hodComponents/ViewDayOffSingleStaff'
// import ViewAllRequests from './hodComponents/ViewAllRequests'
// import ViewChangeDayOffRequests from './hodComponents/ViewChangeDayOffRequests'
// import ViewLeaveRequests from './hodComponents/ViewLeaveRequests'
// import ViewCourseCoverage from './hodComponents/ViewCourseCoverage'
// import ViewTeachingAssignments from './hodComponents/ViewTeachingAssignments'
// import AssignInstructor from './hodComponents/AssignInstructor'
// import DeleteInstructor from './hodComponents/DeleteInstructor'
// import UpdateInstructor from './hodComponents/UpdateInstructor'
// import AcceptChangeDayoff from './hodComponents/AcceptChangeDayoff'
// import RejectChangeDayoff from './hodComponents/RejectChangeDayoff'
// import AcceptLeaveRequest from './hodComponents/AcceptLeaveRequest'
// import RejectLeaveRequest from './hodComponents/RejectLeaveRequest'



// export default function App() {

//   return (
//     <Router>
//       <div className='App'>

//       <h1> app page</h1>
      
//         <Route exact path='/' exact component={Login} />
        
//         <HodSideNav />
//         <Switch>
//         <Route exact path='/homeHOD' component={HodProfile} />
//         <Route exact path='/hod/viewAllStaff' component={ViewAllStaff} />
//         <Route exact path='/hod/viewStaffinCourse' component={ViewStaffinCourse} />
//         <Route exact path='/hod/viewDayOffAllStaff' component={ViewDayOffAllStaff} />
//         <Route exact path='/hod/viewDayOffSingleStaff' component={ViewDayOffSingleStaff} />
//         {/* <Route exact path='/hod/viewAllRequests' component={ViewAllRequests} /> */}
//         <Route exact path='/hod/viewChangeDayOffRequests' component={ViewChangeDayOffRequests} />
//         <Route exact path='/hod/viewLeaveRequests' component={ViewLeaveRequests} />
//         <Route exact path='/hod/viewCourseCoverage' component={ViewCourseCoverage} />
//         <Route exact path='/hod/viewTeachingAssignments' component={ViewTeachingAssignments} />
//         <Route exact path='/hod/assignInstructor' component={AssignInstructor} />
//         <Route exact path='/hod/deleteInstructor' component={DeleteInstructor} />
//         <Route exact path='/hod/updateInstructor' component={UpdateInstructor} />
//         {/* <Route exact path='/hod/acceptChangeDayOffRequest' component={AcceptChangeDayoff} /> */}
//         {/* <Route exact path='/hod/rejectChangeDayOffRequest' component={RejectChangeDayoff} /> */}
//         {/* <Route exact path='/hod/acceptLeaveRequest' component={AcceptLeaveRequest} /> */}
//         {/* <Route exact path='/hod/rejectLeaveRequest' component={RejectLeaveRequest} /> */}
    
//         </Switch>
//       </div>
//     </Router>
//   )
// }

//       <h1> app page</h1>

//         <Route exact path='/' exact component={Login} />

//         <HodSideNav />
//         <Switch>
//         <Route exact path='/homeHOD' component={HodProfile} />
//         <Route exact path='/hod/viewAllStaff' component={ViewAllStaff} />
//         <Route exact path='/hod/viewStaffinCourse' component={ViewStaffinCourse} />
//         <Route exact path='/hod/viewDayOffAllStaff' component={ViewDayOffAllStaff} />
//         <Route exact path='/hod/viewDayOffSingleStaff' component={ViewDayOffSingleStaff} />
//         <Route exact path='/hod/viewAllRequests' component={ViewAllRequests} />
//         <Route exact path='/hod/viewChangeDayOffRequests' component={ViewChangeDayOffRequests} />
//         <Route exact path='/hod/viewLeaveRequests' component={ViewLeaveRequests} />
//         <Route exact path='/hod/viewCourseCoverage' component={ViewCourseCoverage} />
//         <Route exact path='/hod/viewTeachingAssignments' component={ViewTeachingAssignments} />
//         <Route exact path='/hod/assignInstructor' component={AssignInstructor} />
//         <Route exact path='/hod/deleteInstructor' component={DeleteInstructor} />
//         <Route exact path='/hod/updateInstructor' component={UpdateInstructor} />
//         <Route exact path='/hod/acceptChangeDayOffRequest' component={AcceptChangeDayoff} />
//         <Route exact path='/hod/rejectChangeDayOffRequest' component={RejectChangeDayoff} />
//         <Route exact path='/hod/acceptLeaveRequest' component={AcceptLeaveRequest} />
//         <Route exact path='/hod/rejectLeaveRequest' component={RejectLeaveRequest} />

//         </Switch>
//       </div>
//     </Router>
//   )
// }

//////////////////////////// END HASSAN ///////////////////////////////////////

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
