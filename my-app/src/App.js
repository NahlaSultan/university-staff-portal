
import React,{useState,useRef} from 'react'
import Login from './Login'
import AssignCoordinator from './AssignCoordinator'
import RemoveAssignedCourse from './RemoveAssignedCourse'
import AssignCourse from './AssignCourse'
import AssignSlot from './AssignSlot'
function App() {
 
  return (
    <>
    <Switch>
    <Route component={Test} exact path="/"/>
    <Route component={Test2} exact path="/AssignSlot"/>
    <Route component={Test2} exact path="/AssignCoordinator"/>
    <Route component={Test2} exact path="/AssignCourse"/>
    <Route component={Test2} exact path="/RemoveAssignedCourse"/>
    </Switch>
</>
  )
  //hassan trial
}

export default App;
