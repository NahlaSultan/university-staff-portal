
import React, { useState, useRef, useEffect } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../styling/main.css';
import '../styling/dropDown.css';
import '../styling/App.css';
import BellIcon from 'react-bell-icon';
import useSound from 'use-sound';
import boopSfx from './bell.mp3';

function Bell() {
    return (
        <div>
                <div style={{marginTop:'1%'}} className="Bell">
            <button onClick={HandleClick} >
              <Link to='/academic/Bell'>
                <BellIcon className="bell" width='40' active={bellHeader} animate={bellHeader} color='#fff' />
              </Link>
            </button>
          </div>
        </div>
    )
}

export default Bell
