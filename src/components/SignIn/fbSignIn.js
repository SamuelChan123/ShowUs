import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import Button from "@material-ui/core/Button";

import * as ROUTES from "../../routes";
import "./fbSignIn.css";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = (event) => {
    console.log("hello");
    this.props.firebase
      .doSignInWithFacebook()
      .then((socialAuthUser) => {
        // Create a user in your Firebase Realtime Database too
        console.log(socialAuthUser);
        var token = socialAuthUser.credential.accessToken;
        this.props.getToken(token);
        var fullName = socialAuthUser.additionalUserInfo.profile.name.split(
          " "
        );
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          firstName: fullName[0],
          lastName: fullName[1],
          email: socialAuthUser.additionalUserInfo.profile.email,
          //   roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  responseFacebook = (response) => {
    console.log(response);
  };

  render() {
    const { error } = this.state;

    return (
      <div onClick={this.onSubmit}>
        <a className="fb connect" type="submit">
          Continue with Facebook
        </a>

        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </div>
    );
  }
}
const SignInFacebook = compose(withRouter, withFirebase)(SignInFacebookBase);

export { SignInFacebook };
