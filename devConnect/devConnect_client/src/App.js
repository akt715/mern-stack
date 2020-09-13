import React, { Fragment } from 'react';
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Login } from "./components/auth/Login";
import {Signup } from "./components/auth/Signup";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


import './App.css';

const App = () => (

   <Router>
    <Fragment>
        <Navbar/>
        <Route exact path = "/" component= {Landing} />
        <section className ="container" >
            <Switch>
                
                <Route exact path = "/login" component= {Login} />
                <Route exact path = "/signup" component = {Signup} />
            </Switch>
        </section>
        <Landing/>
    </Fragment>
    </Router>
);

export default App;
