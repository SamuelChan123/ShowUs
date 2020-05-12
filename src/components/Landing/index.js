import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { sizing } from "@material-ui/system";
import { AuthUserContext } from "../Session";

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
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

const styles = {
  paperContainer: {
    backgroundImage: `url(https://source.unsplash.com/random)`,
    backgroundSize: "cover",
    opacity: 0.7,
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

class Landing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    document.title = "ShowUs – Share TV Shows and Movies with Friends";

    return (
      <React.Fragment>
        <AuthUserContext.Consumer>
          {(authUser) => (authUser ? this.props.history.push("/home") : null)}
        </AuthUserContext.Consumer>
        <Paper style={styles.paperContainer}>
          <div
            style={{
              color: "white",
            }}
          >
            <Typography component="h1" variant="h1" className={classes.paper}>
              <Box fontWeight="fontWeightBold" m={1}>
                Some text
              </Box>
            </Typography>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

const LandingPage = compose(withRouter, withFirebase)(Landing);

export default withStyles(useStyles)(LandingPage);
