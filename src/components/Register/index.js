import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../Copyright";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../routes";
// import * as ROLES from "../../roles";
import { createMuiTheme } from "@material-ui/core";
import { AuthUserContext } from "../Session";

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      main: "#007bff",
    },
  },
});

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

// const ADMIN = 0;

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { firstName, lastName, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    // if (isAdmin) {
    //   roles[ROLES.ADMIN] = ROLES.ADMIN;
    // }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          firstName,
          lastName,
          email,
          //   roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      //   isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "";

    const { classes } = this.props;
    document.title = "ShowUs – Register";

    return (
      <Container component="main" maxWidth="xs">
        <AuthUserContext.Consumer>
          {(authUser) => (authUser ? this.props.history.push("/Home") : null)}
        </AuthUserContext.Consumer>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <form onSubmit={this.onSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  value={firstName}
                  onChange={this.onChange}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  value={lastName}
                  onChange={this.onChange}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={email}
                  onChange={this.onChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={passwordOne}
                  name="passwordOne"
                  label="Password"
                  type="password"
                  id="passwordOne"
                  onChange={this.onChange}
                  autoComplete="passwordOne"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordTwo"
                  label="Confirm Password"
                  value={passwordTwo}
                  type="password"
                  id="passwordTwo"
                  onChange={this.onChange}
                  autoComplete="passwordTwo"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={isInvalid}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <div style={{ color: "white" }}>Sign Up</div>
            </Button>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={ROUTES.SIGN_IN} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const RegisterForm = compose(withRouter, withFirebase)(RegisterFormBase);

export default withTheme(withStyles(useStyles(theme))(RegisterForm));
