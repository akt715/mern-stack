import React, { Fragment } from 'react';
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Login } from "./components/auth/Login";
import Signup  from "./components/auth/Signup";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store = {store}>
   <Router>
    <Fragment>
        <Navbar/>
        <Route exact path = "/" component= {Landing} />
        <Switch>
        <section className ="container" >
            <Alert/>
            <Switch>
                
                <Route exact path = "/login" component= {Login} />
                <Route exact path = "/signup" component = {Signup} />
            </Switch>
        </section>
        </Switch>
        
    </Fragment>
    </Router>
    </Provider>
);

export default App;
