

import React, { useState, useRef } from 'react'
import {BrowserRouter as Router, Switch, Route, Link}  from 'react-router-dom'

import Home from './mainComponents/Home';
import Nav from './mainComponents/Nav';
import SideNav from './mainComponents/SideNav'
import SideNavHR from './hrComponents/SideNavHR'

import Locations from './hrComponents/LocationComponents/Locations';
import Faculties from './hrComponents/FacultyComponents/Faculties'
import AddStaff from './hrComponents/StaffComponents/AddStaff'
import Login from './mainComponents/Login'
import Logout from './mainComponents/Logout';
import HRprofile from './hrComponents/HRprofile'
import Staffs from './hrComponents/StaffComponents/Staffs';

import './styling/App.css'
import './styling/main.css'
import addLocation from './hrComponents/LocationComponents/AddLocation';
import addDepartment from './hrComponents/FacultyComponents/AddDepartment';
import addFaculty from './hrComponents/FacultyComponents/AddFaculty';
import addCourse from './hrComponents/FacultyComponents/AddCourse';
import StaffsMissingHours from './hrComponents/AttendanceComponents/StaffsMissingHours';
import StaffsMissingDays from './hrComponents/AttendanceComponents/StaffsMissingDays';
import ManageAttendance from './hrComponents/AttendanceComponents/ManageAttendance';
import ViewAttendance from './hrComponents/AttendanceComponents/ViewAttendance'
import AddSignIn from './hrComponents/AttendanceComponents/AddSignIn';
import AddSignOut from './hrComponents/AttendanceComponents/AddSignOut';
import UpdateFaculty from './hrComponents/FacultyComponents/UpdateFaculty';
import UpdateDepartment from './hrComponents/FacultyComponents/UpdateDepartment';
import UpdateCourse from './hrComponents/FacultyComponents/UpdateCourse';
import UpdateStaff from './hrComponents/StaffComponents/UpdateStaff';
import UpdateLocation from './hrComponents/LocationComponents/UpdateLocation';
import UpdateSalary from './hrComponents/StaffComponents/UpdateSalary';
import AddHr from './hrComponents/StaffComponents/AddHr';
import DepartmentPage from './hrComponents/FacultyComponents/DepartmentPage';
import CoursePage from './hrComponents/FacultyComponents/CoursePage';
import Profile from './hrComponents/Profile';
import StaffProfile from './smComponent/StaffProfile'
//academic and coordinator
import coordinatorProfile from './coordinatorComponents/coordinatorProfile'
import ManageSlots from './coordinatorComponents/ManageSlots';
import AddSlots from './coordinatorComponents/AddSlots';
import ManageLinkingRequest from './coordinatorComponents/ManageLinkingRequest';
import Schedule from './academicMembersComponents/ViewSchedule';
import SendReplacement from './academicMembersComponents/SendReplacement';
import ChangeDayOff from './academicMembersComponents/ChangeDayOff';
import ViewReplacementRequest from './academicMembersComponents/ViewReplacementRequest'
import SendSlotLinkingRequest from './academicMembersComponents/SendSlotLinkingRequest';
import SubmitLeaveRequest from './academicMembersComponents/SubmitLeaveRequest';
import Requests from './academicMembersComponents/Requests';
import ViewStatus from './academicMembersComponents/ViewStatus';
import ViewAccepted from './academicMembersComponents/ViewAccepted';
import ViewRejected from './academicMembersComponents/ViewRejected';
import viewPending from './academicMembersComponents/ViewPending';
import CangelDayOff from './academicMembersComponents/CangelDayOff';
import CancelSlotLinking from './academicMembersComponents/CancelSlotLinking';
import CancelLeaveRequest from './academicMembersComponents/CancelLeaveRequest';
import Bell from './academicMembersComponents/Bell';
///////// cI and Staffmmbers
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
import ViewMissingDays from './smComponent/ViewMissingDays'
import ViewMissingHours from './smComponent/ViewMissingHours'
import ViewExtraHours from './smComponent/ViewExtraHours'
import ResetPassword from './mainComponents/ResetPassword'
import CourseStaff from './ciComponents/CourseStaff';
import MonthAttendance from './smComponent/MonthAttendance';
import ViewMonthAttendance from './smComponent/ViewMonthAttendance';
import UpdateProfile from './smComponent/UpdateProfile';
import ViewSmAttendance from './smComponent/ViewAttendance';
import SignIn from './smComponent/SignIn';
import SignOut from './smComponent/SignOut';
export default function App() {

    return (
   <Router>  
   <div className='App'> 

   <Route path='/' exact component={Login} />
         <Route path='/hr' component={Nav} />
         <Route path='/hr' component={SideNav} />
         <Route path='/ci' component={Nav} />
         <Route path='/ci' component={SideNav} />
         <Route path='/academic' component={Nav} />
         <Route path='/academic' component={SideNav} />
         <Route path='/coordinator' component={Nav} />
         <Route path='/coordinator' component={SideNav} />
         <Route path='/hod' component={Nav} />
         <Route path='/hod' component={SideNav} />
         <Route path='/sm' component={Nav} />
         <Route path='/sm' component={SideNav} />
    <Switch> 
    <Route path='/hr/addStaff' component={AddStaff} />
    <Route path='/hr/locations' component={Locations} />
    <Route path='/hr/staffs' component={Staffs} />
    <Route path='/hr/faculties' component={Faculties} />
    <Route path='/logout' component={Logout} />
    <Route path='/hr/home' component={HRprofile} />
    <Route path='/hr/addLocation' component={addLocation} />
    <Route path='/hr/addDepartment' component={addDepartment} />
    <Route path='/hr/addFaculty' component={addFaculty} />
    <Route path='/hr/addCourse' component={addCourse} />
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
    <Route path='/hr/addHR' component={AddHr}/>
    <Route path='/hr/departmentsPage' component={DepartmentPage}/>
    <Route path='/hr/coursePage' component={CoursePage}/>
{/* academic and coordinator */}
<Route exact path='/coordinator/addSlot' component={AddSlots} />
         <Route exact path='/coordinator/manageSlots' component={ManageSlots} />
        <Route exact path='/coordinator/ManageLinkingRequest' component={ManageLinkingRequest} />
        <Route exact path='/academic/schedule' component={Schedule} />
        <Route exact path='/academic/manageReplacement' component={SendReplacement} />
          <Route exact path='/academic/changeDayOff' component={ChangeDayOff} />
          <Route exact path='/academic/Requests' component={Requests} />
          <Route exact path='/academic/ViewReplacementRequest' component={ViewReplacementRequest} />
         <Route exact path='/academic/SendSlotLinkingRequest' component={SendSlotLinkingRequest} />
         <Route exact path='/academic/SubmitLeaveRequest' component={SubmitLeaveRequest} />
         <Route exact path='/academic/Requests/ViewStatus' component={ViewStatus} />
        <Route exact path='/academic/Requests/ViewAccepted' component={ViewAccepted} />
         <Route exact path='/academic/Requests/ViewRejected' component={ViewRejected} />
        <Route exact path='/academic/Requests/ViewPending' component={viewPending} />
         <Route exact path='/academic/Requests/CancelDayOff' component={CangelDayOff} />
          <Route exact path='/academic/Requests/CancelSlotLinking' component={CancelSlotLinking} />
         <Route exact path='/academic/Requests/CancelLeaveRequest' component={CancelLeaveRequest} />
          <Route exact path='/academic/Bell' component={Bell} />
           <Route exact path="/coordinatorProfile" component={coordinatorProfile} />
{/* ci and staff members */}
           <Route exact path='/ci/assignSlots' component={AssignSlot} />
           <Route exact path='/ci/updateAssignedCourse' component={AssignCourse} />
           <Route exact path='/ci/removeAssignedCourse' component={RemoveAssignedCourse} />
           <Route exact path='/ci/assignCourseCoordinator' component={AssignCoordinator} />
           <Route exact path='/ci/viewSlots' component={ViewSlots} />
           <Route exact path='/instructorProfile' component={InstructorProfile} />
           <Route exact path='/ci/viewDepartmentStaff' component={ViewDepartmentStaff} />
           <Route exact path='/ci/viewCourseStaff' component={ViewCourseStaff} />
           <Route exact path='/ci/viewCoverage' component={CourseCoverage} />

           <Route exact path='/sm/viewProfile' component={ViewProfile} />
           <Route exact path='/sm/staffProfile' component={StaffProfile} />
           <Route exact path='/sm/viewAttendance' component={ViewSmAttendance} />
           <Route exact path='/sm/viewMissingDays' component={ViewMissingDays} />
           <Route exact path='/sm/viewMissingHours' component={ViewMissingHours} />
           <Route exact path='/sm/viewExtraHours' component={ViewExtraHours} />
           <Route exact path='/sm/resetPassword' component={ResetPassword} />
           <Route exact path='/ci/courseStaff' component={CourseStaff} />
           <Route exact path='/sm/monthAttendance' component={MonthAttendance} />
           <Route exact path='/sm/viewMonthAttendance' component={ViewMonthAttendance} />
           <Route exact path='/sm/updateProfile' component={UpdateProfile} />
             <Route exact path='/sm/signIn' component={SignIn} />
             <Route exact path='/sm/signOut' component={SignOut} />

 

         </Switch>
       </div>
     </Router>
   )

 }






