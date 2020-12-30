import React, { useState, useRef } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Login from './Login'
import HRprofile from './HRprofile'
function App() {

  return (
    <>
      <Switch>
        <Route component={Login} exact path="/" />
        <Route component={HRprofile} exact path="/home"/>


      </Switch>

    </>
  )

}

export default App;
