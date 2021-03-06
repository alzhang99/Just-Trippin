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

import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";

import Index from "views/Index.js";
import LoginPage from "views/examples/LoginPage.js";
import SignUpPage from "views/examples/SignUpPage.js";
import SearchBusinessPage from "views/examples/SearchBusinessPage.js";
import SearchFlightsPage from "views/examples/SearchFlightsPage.js";
import RecPage from "views/examples/RecPage.js";
import ProfilePage from "views/examples/ProfilePage.js";

import ProtectedRoute from "./ProtectedRoute.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/home" render={props => <Index {...props} />} />
        <ProtectedRoute path="/profile" component={ProfilePage} />

        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route path="/sign-up" render={props => <SignUpPage {...props} />} />
        <ProtectedRoute path="/search-business" component={SearchBusinessPage} />
        <ProtectedRoute path="/search-flights" component={SearchFlightsPage} />
        <ProtectedRoute path="/rec" component={RecPage} />

        <Redirect from="/" to="/home" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
