<h1 align="center">Welcome to our ACL Project </h1>



> milestone 1, team 38

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## UML
https://drive.google.com/file/d/1WPWap3Ugs9aUj_pZEs6rPmgMuE81hGA1/view?usp=sharing


##Functionalities

<h4>Seeding the database: </h4>


<p>
<strong>- addSampleOffice</strong>
</p>
<p>
Functionality: Add a sample office to put the first hr member in
</p>
<p>
<strong>Route: <code>/addSampleOffice</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
   "type": "office",
   "capacity": 10,
   "name": "c7.304"

}
</pre>


<p>
Response: the details of the new location you just added
</p>
<p>
<strong>- addSampleStaff</strong>
</p>
<p>
Functionality: Add a sample hr member
</p>
<p>
<strong>Route: <code>/addSampleStaff</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
   "email": "tstHR",
   "name": "ta hr",
   "salary": 123434,
   "office": "c7.304",
   "gender": "Female"

}
</pre>


<p>
Response: the details of the new location you just added
</p>
<p>
Comments: put the name of the sample office as the hr member’s office.
</p>
<p>
His password is automatically set to “123456”
</p>
<h4>Login:</h4>


<p>
Functionality: Add a sample hr member
</p>
<p>
<strong>Route: <code>/hr/login</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
   "email": "tstHR",
   "password": "123456"
}
</pre>


<p>
Response: the details of the new location you just added
</p>
<h4>Add new things to make up the system:</h4>


<p>
<strong> -Add locations</strong>
</p>
<p>
Functionality: Add a location to the locations model
</p>
<p>
<strong>Route: <code>/hr/addLocation</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
   "type": "office",
   "capacity": 10,
   "name": "c7.304"

}
</pre>


<p>
Response: the details of the new location you just added
</p>
<p>
 <strong>-Add faculties</strong>
</p>
<p>
Functionality: Add a faculty to the faculty model
</p>
<p>
<strong>Route: <code>/hr/addFaculty</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
  "name": "fac1"
}
</pre>


<p>
Response: the new faculty you just added
</p>
<p>
<strong> -Add  departments under each faculty</strong>
</p>
<p>
Functionality: Add a department to the departments array under a certain faculty
</p>
<p>
<strong>Route: <code>/hr/addDepartment</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{

  "facultyName": "fac1",
"departmentName": "dep2"
}
</pre>


<p>
Response: the faculty you just added to, with the new department in it
</p>
<p>
<strong> -Add courses under each department</strong>
</p>
<p>
Functionality: Add a course to a certain department under a certain faculty
</p>
<p>
<strong>Route:<code> /hr/addCourse</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
 "facultyName": "fac1",
"departmentName": "dep2",
"courseName": "cs6",
"teachingSlotsNumber": 6

}
</pre>


<p>
Response: the faculty you just added to, with the new course in it
</p>
<p>
<strong> -update locations</strong>
</p>
<p>
Functionality: edit a certain location 
</p>
<p>
<strong>Route</strong>:<strong><code> /hr/updateLocation</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{


   "name": "c7.305",
   "type": "room",
   "capacity": 25,
   "officeMembers": 11,
   "newName": "c8.305"

}
</pre>


<p>
Specify the location you want to update in the “name” field. All the other fields are optional, depending on what you want to update. 
</p>
<p>
Response: the location you just updated
</p>
<p>
<strong>-delete locations</strong>
</p>
<p>
Functionality: delete a certain location from the system
</p>
<p>
<strong>Route:<code> /hr/deleteLocation</code></strong>

<p>
Request type: DELETE 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
   "name": "c7.305"
}
</pre>


<p>
Response: “deleted successfully” message
</p>
<p>
<strong> -update faculties</strong>
</p>
<p>
Functionality: update a certain faculty in the system
</p>
<p>
<strong>Route:<code>/hr/updateFaculty</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
    "name": "fac1",
   "addDepartments": ["dep1"],
   "removeDepartments": ["dep2"],
   "newName": "fac2"
}
</pre>


<p>
Specify the faculty you want to update in the “name” field. All the other fields are optional, depending on what you want to update. 
</p>
<p>
Response: the faculty you just updated, after the changes made
</p>
<p>
<strong>-delete faculties</strong>
</p>
<p>
Functionality: delete a certain faculty from the system
</p>
<p>
<strong>Route: <code>/hr/deleteFaculty</code></strong>

<p>
Request type: DELETE 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
 "facultyName": "fac1"
}
</pre>


<p>
Response: “deleted successfully” message
</p>
<p>
<strong> -update departments</strong>
</p>
<p>
Functionality: update a certain faculty in the system
</p>
<p>
<strong>Route:<code>/hr/updateDepartment</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
 "facultyName": "fac9",
"departmentName": "dep9",
"newName":"depNine",
"hod": "ac-4",
"newFaculty": "fac1"
}
</pre>


<p>
Specify the faculty you want to update in the “name” field. All the other fields are optional, depending on what you want to update. 
</p>
<p>
Response: the faculty you just updated, after the changes made
</p>
<p>
<strong>-delete departments</strong>
</p>
<p>
Functionality: delete a certain department from a certain faculty in the system
</p>
<p>
<strong>Route: <code>/hr/deleteDepartment</code></strong>

<p>
Request type: DELETE 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
"facultyName": "fac1",
"department": "dep9"
}
</pre>


<p>
Response: “deleted successfully” message
</p>
<p>
<strong> -update courses</strong>
</p>
<p>
Functionality: Add a course to a certain department under a certain faculty
</p>
<p>
<strong>Route: /hr<code>/updateCourse</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{

  "facultyName": "fac1",
"departmentName": "dep1",
"courseName": "cs1",
"teachingSlotsNumber": 6,
"newDepartment": "dep2"

}
</pre>


<p>
Specify the course you want to update using the “facultyName”, “departmentName”,“courseName” field. All the other fields are optional, depending on what you want to update. 
</p>
<p>
Response: the course you just updated, after the modifications
</p>
<p>
<strong>-delete courses</strong>
</p>
<p>
Functionality: delete a course from a certain department
</p>
<p>
<strong>Route: <code>/hr/deleteCourse</code></strong>

<p>
Request type: DELETE 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
"facultyName": "fac1",
"departmentName": "dep1",
"courseName": "cs1"
}
</pre>


<p>
Response: the faculty you just deleted from after the deletion of the course
</p>
<p>
<strong> -Add new staff members</strong>
</p>
<p>
Functionality: Add a new staff to a certain department under a certain faculty
</p>
<p>
<strong>Route: <code>/hr/addStaff</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
   "email": "raneem@guc.edu.eg",
   "role":  "courseCoordinators",
   "name": "raneem sultan",
   "salary": 123434,
   "dayOff": "Monday",
   "office": "c7.305",
   "gender": "Female",
   "faculty": "fac1",
   "department": "dep1"

}
</pre>


<p>
Response: the new staff member you just added
</p>
<p>
<strong> -update existing staff members</strong>
</p>
<p>
Functionality: update an existing staff member
</p>
<p>
<strong>Route: <code>/hr/updateStaff</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
"id": "ac-22",
"name": "newName",
"email": "newEmail@guc.edu.eg",
"password": "newPassowrd123",
"dayOff": "Monday",
"office": "c2.110",
"annualLeavesBalance": 2,
"Gender": "Male"
}
</pre>


<p>
Specify the staff member you want to update in the “id” field. All the other fields are optional, depending on what you want to update. 
</p>
<p>
Response: the staff member you just updated, after modifications
</p>
<p>
<strong>-delete existing staff members</strong>
</p>
<p>
Functionality: deletes a staff member entirely from the system. If it’s an academic member, then it’s also removed from all courses and roles it’s assigned to
</p>
<p>
<strong>Route: <code>/hr/deleteStaffMember</code></strong>

<p>
Request type: DELETE 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
   "id": "ac-3"
}
</pre>


<p>
Response: “deleted successfully” message
</p>
<p>
<strong> -update the salary of a staff member</strong>
</p>
<p>
Functionality: update the salary of a certain staff member
</p>
<p>
(missing days and hours deductions will be calculated in milestone 2)
</p>
<p>
<strong>Route: <code>/hr/updateSalary</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
 "id": "hr-12",
"salary": 121212
}
</pre>


<p>
Response: the staff member after the updates
</p>
<p>
<strong> -view the attendance of any staff member</strong>
</p>
<p>
Functionality: view the attendance record of a certain staff member
</p>
<p>
<strong>Route: <code>/hr/viewAttendance</code></strong>

<p>
Request type: GET 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
 "id": "hr-12"
}
</pre>


<p>
Response: the detailed attendance record of this staff member
</p>
<p>
<strong>-Manually add sign in for any staff member</strong>
</p>
<p>
Functionality: adds a signIn in the attendance record of a certain staff member
</p>
<p>
<strong>Route: <code>/hr/addSignIn</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
  "id": "ac-31",
  "month": 12,
  "day": 5,
  "year": 2020,
  "hour": 11,
  "minute": 10
}
</pre>


<p>
Response: the detailed attendance record of this staff member
</p>
<p>
<strong>-Manually add signOut record for any staff member</strong>
</p>
<p>
Functionality: adds a signIn in the attendance record of a certain staff member
</p>
<p>
<strong>Route: <code>/hr/addSignOut</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
  "id": "ac-31",
  "month": 12,
  "day": 5,
  "year": 2020,
  "hour": 22,
  "minute": 10
}
</pre>


<p>
Response: the detailed attendance record of this staff member
</p>
<p>
<strong>-View  profile</strong>
</p>
<p>
Functionality: View profile of any member
</p>
<p>
<strong>Route: /viewProfile</strong>
</p>
<p>
Request type: GET
</p>
<p>
Response: the details of the staff member viewing his profile
</p>
<p>
<strong>-Update profile</strong>
</p>
<p>
Functionality: update my profile
</p>
<p>
<strong>Route:<code>/updateProfile</code></strong>

<p>
Request type: POST 
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{
"email": "newEmail@guc.edu.eg",
"password": "newPassowrd123",
"gender": "Male",
}
</pre>


<p>
fields are optional, depending on what you want to update. 
</p>
<p>
Response: the new staff member after modifications
</p>
<p>
<strong>-Reset their passwords</strong>
</p>
<p>
Functionality: Reset password
</p>
<p>
<strong>Route</strong>: /resetPassword
</p>
<p>
Request type: POST 
</p>
<p>
Request body: 
</p>
<p>
{ “password”:”123”}
</p>
<p>
Response: successfully saved
</p>
<p>
<strong>-Log out</strong>
</p>
<p>
Functionality: Log out from the profile
</p>
<p>
<strong>Route</strong>:/<code>logOut</code>
</p>
<p>
Request type:GET
</p>
<p>
Response: message<strong>: “<code>loggedOut</code>”</strong>

<h4>Head of Departments can: </h4>


<p>
-Assign/delete/update a course instructor for each course
</p>
<p>
Ac-9 -->cs1
</p>
<p>
Functional
</p>
<p>
(courseInstructor)
</p>
<p>
<strong>-Assign academic member to a course</strong>
</p>
<p>
Functionality:Assign academic member to a course
</p>
<p>
<strong>Route</strong>: /ci/<code>updateAssignedCourse</code>
</p>
<p>
Request type: POST 
</p>
<p>
Request body: { “memberID” : “ac-9”, “courseName”: “cs1”}
</p>
<p>
//
</p>
<p>
Functionality:Assign academic member to a course 
</p>
<p>
<strong>Route</strong>:  /ci/<code>updateAssignedCourse</code>
</p>
<p>
Request type: POST
</p>
<p>
Response: successfully done
</p>
<p>
<strong>-Assign an academic member to be a course coordinator</strong>
</p>
<p>
Functionality:Assign an academic member to be a course coordinator
</p>
<p>
<strong>Route</strong>: /ci/assignCourseCoordinator
</p>
<p>
Request type: POST 
</p>
<p>
Request body: { “memberID” : “academic -2”, “courseName”: “CSEN1”}
</p>
<p>
//
</p>
<p>
Functionality: Assign an academic member to be a course coordinator
</p>
<p>
<strong>Route</strong>: /ci/assignCourseCoordinator
</p>
<p>
Request type: POSt
</p>
<p>
Response: successfully assigned
</p>
<p>
(Coordinator)
</p>
<p>
<strong>-Add/Update/delete slots</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:add a slot to the system
</p>
<p>
<strong>Route</strong>: /<strong><code>coordinator</code></strong>/<strong><code>addSlot</code></strong>

<p>
Request type: <strong>POST</strong>
</p>
<p>
Request body:{
</p>
<p>
<strong><code>"type":"tutorial","time":"Fourth Slot","courseTaught":"cs1","location":"c7.304","day":"sunday"</code></strong>}

<p>
Response message:<strong><code>"Added successfully"</code></strong>

<p>
Example for using request body:
</p>
<p>
Functionality:delete a slot from the system
</p>
<p>
<strong>Route</strong>: /<strong><code>coordinator</code></strong>/<strong><code>deleteSlot</code></strong>

<p>
Request type: <strong>POST</strong>
</p>
<p>
Request body:{<strong><code> "numberID":""</code></strong>}

<p>
Response message<strong>:<code>"Successfully deleted"</code></strong>

<p>
Example for using request body:
</p>
<p>
Functionality:update an existing slot on the system
</p>
<p>
<strong>Route</strong>: /<strong><code>coordinator</code></strong>/<strong><code>updateSlot</code></strong>

<p>
Request type: <strong>POST</strong>
</p>
<p>
Request body:{<strong><code> "slotID":"","location":"","type":"","time":,"day":"","courseTaught":""</code></strong>}

<p>
Response message:<strong><code>"Successfully updated"</code></strong>




<pre class="prettyprint">(academic member)
</pre>


<p>
<strong>-Send slot linking request(2 or more)</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Request on teaching a certain slot
</p>
<p>
<strong>Route:/<code>academicMembers/sendSlotLinkingRequest</code></strong>

<p>
Request type: <strong>POST</strong>
</p>
<p>
Request body:{<strong><code> "slotId":"2"</code></strong>}

<p>
Response message:<strong><code>"Successfully sent to coordinator"</code></strong>




<pre class="prettyprint">(coordinator)
</pre>


<p>
<strong>-Accept slot linking request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:accept slot linking request
</p>
<p>
<strong>Route:/coordinator/acceptSlotLinkingRequest</strong>
</p>
<p>
Request type: <strong>POST</strong>
</p>
<p>
Request body:{<strong><code> "requestID":"5fe59fb4fc163faff7d8e424"</code></strong>}

<p>
Response message:<strong><code>"Successfully accepted"</code></strong>

<p>
(course instructor)
</p>
<p>
<strong>-Assign an academic member to an unassigned slots</strong>
</p>
<p>
Functionality:Assign an academic member to an unassigned slots
</p>
<p>
<strong>Route</strong>: /ci/assignSlots
</p>
<p>
Request type: POST 
</p>
<p>
Request body: { “memberID” : “ac-6”, “numberID”: “3”}
</p>
<p>
//
</p>
<p>
Functionality: Assign an academic member to an unassigned slotS 
</p>
<p>
<strong>Route</strong>: /ci/assignSlots
</p>
<p>
Request type:POST 
</p>
<p>
Response: successfully done
</p>
<p>
<strong>-View the coverage of course</strong>
</p>
<p>
Functionality: view the course coverage of each course the instructor is assigned to
</p>
<p>
<strong>Route</strong>: /ci/viewCoverage
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response: Array of courses with their coverages {   "cs1->Coverage: 16.666666666666664%"}
</p>
<p>
<strong>-View the slots' assignment of course</strong>
</p>
<p>
Functionality:view all slots assigned to an instructor
</p>
<p>
<strong>Route</strong>: /ci/viewSlots
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response: Array of slots schemas
</p>
<p>
<strong>-View all the staff in his/her department</strong>
</p>
<p>
Functionality: View all the staff in his/her department
</p>
<p>
<strong>Route</strong>: /ci/viewDepartmentStaff
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response: Array of staff members
</p>
<p>
<strong>-Remove an assigned member from a course</strong>
</p>
<p>
Functionality: remove academic member from a course 
</p>
<p>
<strong>Route</strong>: /ci/<code>removeAssignedCourse</code>
</p>
<p>
Request type: POST 
</p>
<p>
Request body: 
</p>
<p>
{  "memberID" : "ac-6", "courseName": "cs1"}
</p>
<p>
Response: successfully done
</p>
<p>
(Academic member)
</p>
<p>
<strong>-View Schedule</strong>
</p>
<p>
Functionality: view schedule of the logged in member
</p>
<p>
<strong>Route</strong>:academicMembers/viewSchedule
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of days in weekly schedule and any replacement slots . Example of a single Student:{“Your weekly schedule:”
</p>
<p>
	“Saturday:”[],”Sunday”:[],”Monday”
</p>
<p>
}
</p>
<p>
<strong>-Send replacement request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Request another academic member to replace you on a certain day 
</p>
<p>
<strong>Route</strong>:/<code>academicMembers/sendReplacementRequest</code>
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
 "slot":"2",
</p>
<p>
 "receiverId":"ac-8",
</p>
<p>
 "dateReplace":"2020/12/26"
</p>
<p>
} 
</p>
<p>
Response message:<code>"Successfully sent"</code>
</p>
<p>
<strong>-Accept Replacement Request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:<code>Request another academic member to replace you on a certain day</code> 
</p>
<p>
<strong>Route</strong>:/<code>academicMembers</code>/<code>acceptReplacementRequest</code>
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>



<pre class="prettyprint">{
"slotID":"5fe5aa6f6abfaeb1b39f87da"

}
where:The SlotID is the replacement_request _id he wishes to accept 
</pre>


<p>
Response message:<code>"Successfully accepted"</code>
</p>
<p>
<strong>-View replacement request</strong>
</p>
<p>
Functionality: view replacement requests this user sent and this user received
</p>
<p>
<strong>Route</strong>:academicMembers/<code>viewReplacementRequest</code>
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of replacement requests 
</p>
<p>
[
</p>
<p>
   "Sent requests are:",
</p>
<p>
   "Received requests are:",
</p>
<p>
   {
</p>
<p>
       "accepted": true,
</p>
<p>
       "_id": "5fe5aa6f6abfaeb1b39f87da",
</p>
<p>
       "pending": false,
</p>
<p>
       "slot": "2",
</p>
<p>
       "receiverId": "ac-8",
</p>
<p>
       "senderId": "ac-9",
</p>
<p>
       "date": "2020-12-26T22:00:00.000Z",
</p>
<p>
       "__v": 0
</p>
<p>
   }
</p>
<p>
]
</p>
<p>
}
</p>
<p>
<strong>-Send change dayOff request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Request to change dayOff requests to HOD
</p>
<p>
Route:/<code>academicMembers/sendChangeDayOff</code>
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{<code>{</code>
</p>
<p>
  "day":"Sunday"
</p>
<p>
}
</p>
<p>
 
</p>
<p>
} 
</p>
<p>
Response message:<code>"Successfully sent"</code>
</p>
<p>
<strong>-Send leave request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:<code>Request to send a leave request</code>
</p>
<p>
<strong>Route</strong>:/<code>academicMembers/</code>submitLeave
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
"type":"Sick",
</p>
<p>
"start":"2020/12/23",
</p>
<p>
"end":"2020/1/30",
</p>
<p>
"documentLinks":"www.djsbdjf"
</p>
<p>
}
</p>
<p>
Response message:<strong><code>"Successfully sent"</code></strong>

<p>
<strong>-Send leave request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:<code>Request to send a leave request</code>
</p>
<p>
<strong>Route</strong>:/<code>academicMembers/</code>submitLeave
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
 
</p>
<p>
"type":"Annual",
</p>
<p>
"start":"2020/12/26",
</p>
<p>
"replacementRequestID":"5fe5aa6f6abfaeb1b39f87da"
</p>
<p>
} 
</p>
<p>
Response message:<strong><code>"Successfully sent"</code></strong>

<p>
<strong>-Send leave request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:<strong><code>Request to send a leave request</code></strong>

<p>
<strong>Route:/<code>academicMembers/</code>submitLeave</strong>

<p>
Request type: <strong>POST</strong>
</p>
<p>
Request body:
</p>
<p>
 {
</p>
<p>
"type":"Accidental",
</p>
<p>
"start":"2020/12/26",
</p>
<p>
"description":"Problemoo"
</p>
<p>
}
</p>
<p>
<strong>-Send leave request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Request to send a leave request
</p>
<p>
<strong>Route</strong>:/academicMembers/submitLeave
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
"type":"Maternity",
</p>
<p>
"start":"2020/12/26",
</p>
<p>
"end":"2020/12/30",
</p>
<p>
"documentLinks":"www.no.com"
</p>
<p>
}
</p>
<p>
Response message:<code>"Successfully sent"</code>
</p>
<p>
<strong>-Send leave request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Request to send a leave request
</p>
<p>
<strong>Route</strong>:/academicMembers/submitLeave
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
"type":"Maternity",
</p>
<p>
"start":"2020/12/26",
</p>
<p>
"end":"2020/12/30",
</p>
<p>
"documentLinks":"www.no.com"
</p>
<p>
}
</p>
<p>
Response message:<code>"Successfully sent"</code>
</p>
<p>
<strong>-Send leave request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Request to send a leave request
</p>
<p>
<strong>Route</strong>:/academicMembers/submitLeave
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
"type":"Compensation",
</p>
<p>
"description":"sister's wedding",
</p>
<p>
"start":"2020/12/23",
</p>
<p>
"compensation":"2020/12/28"
</p>
<p>
}
</p>
<p>
Response message:<code>"Successfully sent"</code>
</p>
<p>
<strong>-View status of all requests</strong>
</p>
<p>
Functionality: view the status of all the requests submitted by this user
</p>
<p>
<strong>Route</strong>:academicMembers/<code>viewStatusOfRequests</code>
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of request status you submitted{
</p>
<p>
[
</p>
<p>
    {
</p>
<p>
        "dayOff Request": {
</p>
<p>
            "id": "ac-9",
</p>
<p>
            "pending": true,
</p>
<p>
            "accepted": false
</p>
<p>
        }
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Replacement Requests": [
</p>
<p>
            {
</p>
<p>
                "id": "5fe5aa6f6abfaeb1b39f87da",
</p>
<p>
                "pending": false,
</p>
<p>
                "accepted": true
</p>
<p>
            }
</p>
<p>
        ]
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Slot linking Requests": [
</p>
<p>
            {
</p>
<p>
                "id": "5fe59fb4fc163faff7d8e424",
</p>
<p>
                "pending": false,
</p>
<p>
                "accepted": true
</p>
<p>
            }
</p>
<p>
        ]
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "leave requests": [
</p>
<p>
            {
</p>
<p>
                "id": "5fe5b41c03cce3b247585045",
</p>
<p>
                "pending": true,
</p>
<p>
                "accepted": false
</p>
<p>
            },
</p>
<p>
            {
</p>
<p>
                "id": "5fe5b50003cce3b247585046",
</p>
<p>
                "pending": true,
</p>
<p>
                "accepted": false
</p>
<p>
            }
</p>
<p>
        ]
</p>
<p>
    }
</p>
<p>
]
</p>
<p>
}
</p>
<p>
}
</p>
<p>
<strong>-View accepted requests</strong>
</p>
<p>
Functionality: view all the accepted requests submitted by the user
</p>
<p>
<strong>Route</strong>:academicMembers/viewAcceptedRequests
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of accepted requests you submitted
</p>
<p>
[
</p>
<p>
    {
</p>
<p>
        "dayOff Request": []
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Replacement Requests": [
</p>
<p>
            {
</p>
<p>
                "accepted": true,
</p>
<p>
                "_id": "5fe5aa6f6abfaeb1b39f87da",
</p>
<p>
                "pending": false,
</p>
<p>
                "slot": "2",
</p>
<p>
                "receiverId": "ac-8",
</p>
<p>
                "senderId": "ac-9",
</p>
<p>
                "date": "2020-12-26T22:00:00.000Z",
</p>
<p>
                "__v": 0,
</p>
<p>
                "leaveRequestAssigned": "5fe5b50003cce3b247585046"
</p>
<p>
            }
</p>
<p>
        ]
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Slot linking Requests": [
</p>
<p>
            {
</p>
<p>
                "accepted": true,
</p>
<p>
                "_id": "5fe59fb4fc163faff7d8e424",
</p>
<p>
                "pending": false,
</p>
<p>
                "slotID": "2",
</p>
<p>
                "coordinatorId": "ac-6",
</p>
<p>
                "senderId": "ac-9",
</p>
<p>
                "__v": 0,
</p>
<p>
                "notified": true
</p>
<p>
            }
</p>
<p>
        ]
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "leave requests": []
</p>
<p>
    }
</p>
<p>
]
</p>
<p>
<strong>-View pending requests</strong>
</p>
<p>
Functionality: view all the pendingrequests submitted by the user
</p>
<p>
<strong>Route</strong>:academicMembers/viewPendingRequests
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of pending request you submitted
</p>
<p>
[
</p>
<p>
    {
</p>
<p>
        "dayOff Request": {
</p>
<p>
            "accepted": false,
</p>
<p>
            "_id": "5fe5b24f03cce3b247585044",
</p>
<p>
            "pending": true,
</p>
<p>
            "day": "Sunday",
</p>
<p>
            "HODId": "ac-3",
</p>
<p>
            "senderId": "ac-9",
</p>
<p>
            "__v": 0
</p>
<p>
        }
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Replacement Requests": []
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Slot linking Requests": []
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "leave requests": [
</p>
<p>
            {
</p>
<p>
                "leaveDates": [],
</p>
<p>
                "_id": "5fe5b41c03cce3b247585045",
</p>
<p>
                "staffID": "ac-9",
</p>
<p>
                "hodID": "ac-3",
</p>
<p>
                "type": "Sick",
</p>
<p>
                "submission": "2020-12-25T22:00:00.000Z",
</p>
<p>
                "pending": true,
</p>
<p>
                "accepted": false,
</p>
<p>
                "start": "2020-12-23T22:00:00.000Z",
</p>
<p>
                "end": "2020-01-30T22:00:00.000Z",
</p>
<p>
                "documentLinks": "www.djsbdjf",
</p>
<p>
                "__v": 0
</p>
<p>
            }
</p>
<p>
        ]
</p>
<p>
    }
</p>
<p>
]
</p>
<p>
<strong>-View rejecting requests</strong>
</p>
<p>
Functionality: view all the rejected requests submitted by the user
</p>
<p>
<strong>Route</strong>:academicMembers/viewRejectedRequests
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of rejected  request  you submitted
</p>
<p>
[
</p>
<p>
    {
</p>
<p>
        "dayOff Request": []
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Replacement Requests": []
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "Slot linking Requests": []
</p>
<p>
    },
</p>
<p>
    {
</p>
<p>
        "leave requests": []
</p>
<p>
    }
</p>
<p>
]
</p>
<p>
<strong>-cancel a request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Cancel a replacement request
</p>
<p>
<strong>Route</strong>:/academicMembers/<code>cancelReplacementRequest</code>
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
	“<code>requestID":"5fe5c446e7b1f998d4fc9ae2"</code>
</p>
<p>
}
</p>
<p>
Response:”Cancelled successfully”
</p>
<p>
<strong>-cancel a request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Cancel a slotLinking request
</p>
<p>
<strong>Route</strong>:/academicMembers/cancelSlotLinkingRequest
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
	“<code>requestId":"5fe5c446e7b1f998d4fc9ae2"</code>
</p>
<p>
}
</p>
<p>
Response:”Cancelled successfully”
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Cancel a leave request
</p>
<p>
Route:/academicMembers/cancelLeaveRequest
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
	“<code>requestId":"5fe5c446e7b1f998d4fc9ae2"</code>
</p>
<p>
}
</p>
<p>
Response:”Cancelled successfully”
</p>
<p>
Response:”Cancelled successfully”
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Cancel a dayOff request
</p>
<p>
Route:/academicMembers/cancelDayoffRequest
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
{
</p>
<p>
	
</p>
<p>
}
</p>
<p>
Response:”Cancelled successfully”
</p>
<p>
Comments:Each staff member has only one dayoff request to be sent at once 
</p>
<p>
(Coordinator)
</p>
<p>
<strong>-View slot linking request</strong>
</p>
<p>
Functionality: view the slot linking requests sent to the coordinator
</p>
<p>
<strong>Route</strong>:coordinator/viewSlotLinkingRequest
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of rejected  request  you submitted
</p>
<p>
[
</p>
<p>
    "Slot linking requests are:",
</p>
<p>
    {
</p>
<p>
        "accepted": false,
</p>
<p>
        "_id": "5fe5ebcf698799cd38f7d5e1",
</p>
<p>
        "pending": true,
</p>
<p>
        "slotID": "2",
</p>
<p>
        "coordinatorId": "ac-6",
</p>
<p>
        "senderId": "ac-9",
</p>
<p>
        "__v": 0
</p>
<p>
    }
</p>
<p>
]
</p>
<p>
<strong>-Reject slot linking request</strong>
</p>
<p>
Example for using request body:
</p>
<p>
Functionality:Reject slot linking request
</p>
<p>
<strong>Route</strong>:/academicMembers/<code>rejectSlotLinkingRequest</code>
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
<strong>{</strong>
</p>
<p>
<strong>	“<code>requestID":"5fe5c446e7b1f998d4fc9ae2"</code></strong>

<p>
<strong>}</strong>
</p>
<p>
(HOD)
</p>
<p>
<strong>-Assign instructor</strong> 
</p>
<p>
Functionality: assign instructor to a course
</p>
<p>
Route: /hod/assignInstructor 
</p>
<p>
Request type: POST
</p>
<p>
Request body: <code>{"courseName":"cs2", "instructorId": "ac-7" }</code>
</p>
<p>
Response body: instructor assigned successfully
</p>
<p>
<strong>-Update instructor</strong>
</p>
<p>
Functionality: update instructor in a course (removes the instructor of old instructor id and replaces him with instructor of new instructor id )
</p>
<p>
<strong>Route</strong>: /hod/updateInstructor 
</p>
<p>
Request type: POST
</p>
<p>
Request body: <code>{"courseName":"cs3", "oldInstructorId": "ac-8", "newInstructorId": "ac-7" }</code>
</p>
<p>
Response body: instructor updated successfully
</p>
<p>
<strong>-Delete instructor</strong>
</p>
<p>
Functionality: delete instructor from a course
</p>
<p>
Route: /hod/deleteInstructor 
</p>
<p>
Request type: POST
</p>
<p>
Request body: <code>{"courseName":"cs2", "instructorId": "ac-7" }</code>
</p>
<p>
Response body: instructor deleted successfully
</p>
<p>
-<strong>view all staff </strong>
</p>
<p>
Functionality: get all staff in his department
</p>
<p>
<strong>Route</strong>: /hod/viewAllStaff
</p>
<p>
Request type: GET 
</p>
<p>
Response: Array of staff. 
</p>
<p>
Example of a single staff: 
</p>



<pre class="prettyprint">[Staff name: ta test
ID: ac-6
email: tstTA2
Role: teachingAssistants,courseCoordinators
Day off: Monday
Office location: c2.210
Attendance:
Annual leaves balance: 2.5
Leaves: 5fe5b6e703cce3b247585047,5fe5b7c703cce3b247585048,5fe5bb38ad1d32b31d15550f
Request replacement sent:
Request replacement received:
Coordinator linking requests: 5fe5ebcf698799cd38f7d5e1,5fe5ecba698799cd38f7d5e2
Courses:
Slots assigned:
Slots replaced:
Slots to replace:
Day off request sent:]
</pre>


<p>
<strong>View staff in course</strong>
</p>
<p>
Functionality: get all staff in course
</p>
<p>
<strong>Route</strong>: /hod/viewStaffinCourse
</p>
<p>
Request type: GET
</p>
<p>
Request body: <code>{"courseName":"cs2"}</code>
</p>
<p>
Response: Array of staff. 
</p>
<p>
Example of a single staff: 
</p>



<pre class="prettyprint">[Staff name: ta ci
ID: ac-7
email: tstCI
Role: courseInstructors
Day off: Monday
Office location: c2.210
Attendance:
Annual leaves balance: 2.5
Leaves:
Request replacement sent:
Request replacement received:
Coordinator linking requests:
Courses: cs2
Slots assigned:
Slots replaced:
Slots to replace:
Day off request sent:]
</pre>


<p>
-<strong>View dayOff of all staff</strong>
</p>
<p>
Functionality: get all day offs of staff in his department
</p>
<p>
Route: /hod/viewDayOffAllStaff
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of the day offs of all staff. 
</p>
<p>
Example of a single staff:  [<code>"name: ta test day off: Monday"]</code>
</p>
<p>
<strong>-View dayOff of single staff</strong>
</p>
<p>
Functionality: get day off of single staff in his department
</p>
<p>
Route: /hod/viewDayOffSingleStaff
</p>
<p>
Request type: GET
</p>
<p>
Request body: <code>{"staffId":"ac-7"}</code> 
</p>
<p>
Response: string of the day off the single staff. 
</p>
<p>
Example of a output:  “<code>name: ta ci day off: Monday"</code>
</p>
<p>
<strong>-View all requests</strong>
</p>
<p>
Functionality: get all requests of all staffs in his department
</p>
<p>
<strong>Route</strong>: /hod/viewAllRequests
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of the requests of all staff. 
</p>
<p>
Example of a single request:  [<code> "Staff name: ta ci, leave request:  type:Sick, pending:true, accepted: false, reason: undefined"]</code>
</p>
<p>
-<strong>View change dayOff requests</strong>
</p>
<p>
Functionality: get change day off requests of all staffs in his department
</p>
<p>
<strong>Route</strong>: /hod/viewChangeDayOffRequests
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of the change day off requests of all staff. 
</p>
<p>
Example of a single request:  [<code> "Staff name: ta ci, change day off request:  pending:true, accepted: false, reason: undefined"]</code>
</p>
<p>
-<strong>View leaveRequests</strong>
</p>
<p>
Functionality: get all leave requests of all staff in his department
</p>
<p>
<strong>Route</strong>: /hod/viewLeaveRequests
</p>
<p>
Request type: GET
</p>
<p>
Response: Array of the leave requests of all staff. 
</p>
<p>
Example of a single request:  [<code> "Staff name: ta test, leave request:  type:Accidental, pending:true, accepted: false, reason: undefined"]</code>
</p>
<p>
-<strong>Accept leave request</strong>
</p>
<p>
Functionality: accept a leave request of a staff in his department
</p>
<p>
<strong>Route</strong>: /hod/acceptLeaveRequest 
</p>
<p>
Request type: POST
</p>
<p>
Request body: <code>{"requestId":"5fe5bb38ad1d32b31d15550f"}</code>
</p>
<p>
Response body: request accepted successfully
</p>
<p>
-<strong>Accept change dayOff request</strong>
</p>
<p>
Functionality: accept a change day off request of a staff in his department
</p>
<p>
<strong>Route</strong>: /hod/acceptChangeDayOffRequest 
</p>
<p>
Request type: POST
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{"staffId":"ac-9"}
</pre>


<p>
Response body: request accepted successfully
</p>
<p>
-<strong>Reject leave request</strong>
</p>
<p>
Functionality: reject a leave request of a staff in his department
</p>
<p>
<strong>Route</strong>: /hod/rejectLeaveRequest 
</p>
<p>
Request type: POST
</p>
<p>
Request body:
</p>
<p>
 <code>{"requestId":"5fe5b41c03cce3b247585045" , "comment":"no documents attached"}</code>
</p>
<p>
Response body:<code>request rejected</code>
</p>
<p>
-<strong>Reject change dayOff request</strong>
</p>
<p>
Functionality: reject a change day off request of a staff in his department
</p>
<p>
<strong>Route</strong>: /hod/rejectChangeDayOffRequest 
</p>
<p>
Request type: POST
</p>
<p>
Request body: 
</p>



<pre class="prettyprint">{"staffId":"ac-9"}
</pre>


<p>
Response body: <code>request rejected</code>
</p>
<p>
-<strong>View course coverage</strong>
</p>
<p>
Functionality: view the coverage of a course in his department
</p>
<p>
<strong>Route</strong>: /hod/viewCourseCoverage
</p>
<p>
Request type: GET
</p>
<p>
Request body: 
</p>
<p>
<code>{"courseName":"cs1"}</code> 
</p>
<p>
Response: string of the course coverage. 
</p>
<p>
Example of a output: <code>Course Name: cs1, Coverage: 50%</code>
</p>
<p>
-<strong>View teaching assignments</strong>
</p>
<p>
Functionality: view the teaching assignments of a course in his department
</p>
<p>
<strong>Route</strong>: /hod/viewTeachingAssignments
</p>
<p>
Request type: GET
</p>
<p>
Request body: 
</p>
<p>
<code>{"courseName":"cs1"}</code> 
</p>
<p>
Response: Array of the teaching assignments. 
</p>
<p>
Example of a a single teaching assignment: <code> ["Staff name: ta ci, course taught: cs1, slot type: tutorial, day: Sunday, time: Fourth Slot, location: c7.304"]</code>
</p>
<h4>All Staff Members can: </h4>


<p>
<strong>-Sign in.</strong>
</p>
<p>
Functionality:signIn
</p>
<p>
<strong>Route</strong>: /signIn
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response:attendanceTable
</p>
<p>
<strong>-Sign out.</strong>
</p>
<p>
Functionality:sign out
</p>
<p>
<strong>Route</strong>: /signOut
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response:attendanceTable
</p>
<p>
<strong>-View attendance records</strong>
</p>
<p>
Functionality:View attendance records
</p>
<p>
<strong>Route</strong>: /viewAttendance
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response:attendanceTable
</p>
<p>
<strong>-view missing days</strong>
</p>
<p>
Functionality:View missing days
</p>
<p>
<strong>Route</strong>: /viewMissingDays
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response: array of missing days in each month, example [14,15]
</p>
<p>
<strong>-view missing hours </strong>
</p>
<p>
Functionality:View missing hours
</p>
<p>
<strong>Route</strong>: /viewMissingHours
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response: array of missing hours in each month example [7,0]
</p>
<p>
<strong>- extra hours</strong>
</p>
<p>
Functionality:View extra hours
</p>
<p>
<strong>Route</strong>: /viewExtraHours
</p>
<p>
Request type: GET 
</p>
<p>
Parameters: memberId from token
</p>
<p>
Response: array of extra hours in each month example [7,0]
</p>



## Authors

👤 **Nahla Sultan, Sara Amgad, Sofia Nasser, Sara Hassan**

* Github: [@nahla.sultan](https://github.com/nahla.sultan)


