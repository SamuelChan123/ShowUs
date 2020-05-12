import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import ErrorPage from "../Error";
import RegisterPage from "../Register";
import SignInPage from "../SignIn";
import HomePage from "../Home";
// import AccountPage from "../Account";
// import FriendsPage from "../Friends";
// import GroupsPage from "../Groups";
// import RatePage from "../Rate";
// import AdminPage from "../Admin";
// import PasswordForgetPage from "../PasswordForget";

import * as ROUTES from "../../routes";
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.REGISTER} component={RegisterPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        {/* <Route exact path={ROUTES.FRIENDS} component={FriendsPage} />
        <Route exact path={ROUTES.GROUPS} component={GroupsPage} />
        <Route exact path={ROUTES.RATE} component={RatePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} /> */}
        {/* <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} /> */}
        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  </Router>
);

export default withAuthentication(App);
