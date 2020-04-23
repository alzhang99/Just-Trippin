/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import LoginPage from "views/examples/LoginPage.js";
import SignUpPage from "views/examples/SignUpPage.js";
import SearchPage from "views/examples/SearchPage.js";

import ProfilePage from "views/examples/ProfilePage.js";



import Dashboard from "views/examples/Dashboard.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        
        <Route path="/home" render={props => <Index {...props} />} />
        {/* <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        /> */}
        <Route
          path="/profile-page"
          render={props => <ProfilePage {...props} />}
        />

        <Route
          path="/dashboard"
          render={props => <Dashboard {...props} />}
        />
        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route path="/sign-up" render={props => <SignUpPage {...props} />} />
        <Route path="/search" render={props => <SearchPage {...props} />} />

        <Redirect from="/" to="/home" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
