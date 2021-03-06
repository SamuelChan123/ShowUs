import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Copyright from "../Copyright";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../routes";
import { withStyles } from "@material-ui/styles";
import { SignInFacebook } from "./fbSignIn";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getFacebookToken = (token) => {
    this.setState({
      token: token,
    });
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";
    document.title = "ShowUs – Sign In";

    return (
      <div>
        <AuthUserContext.Consumer>
          {(authUser) => (authUser ? this.props.history.push("/home") : null)}
        </AuthUserContext.Consumer>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <form
                className={classes.form}
                onSubmit={this.onSubmit}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  value={email}
                  fullWidth
                  onChange={this.onChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={this.onChange}
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember Me"
                />
                {error && <p style={{ color: "red" }}>{error.message}</p>}
                <Button
                  type="submit"
                  fullWidth
                  color="#ffffff"
                  variant="contained"
                  color="primary"
                  disabled={isInvalid}
                  className={classes.submit}
                >
                  <div style={{ color: "white" }}>Sign In</div>
                </Button>
                <Grid container justify="center">
                  <Button>
                    <SignInFacebook getToken={this.getFacebookToken} />
                  </Button>
                </Grid>
                <br />
                <Grid container>
                  <Grid item xs>
                    <Link href={ROUTES.PASSWORD_FORGET} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    {"Don't have an account? "}
                    <Link href={ROUTES.REGISTER} variant="body2">
                      Sign Up
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(
  compose(withRouter, withFirebase)(SignInForm)
);
