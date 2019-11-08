/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "assets/scss/argon-dashboard-react.scss";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "react-table/react-table.css";
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";
import "./index.css"

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
