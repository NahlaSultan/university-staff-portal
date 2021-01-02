import React from 'react';
import {render} from 'react-dom';
import {Link,Switch,Route,BrowserRouter} from 'react-router-dom'

import App from './App';

render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
