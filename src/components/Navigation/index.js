import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import Logo from "../../images/ShowUsLogo.png";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../routes";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
}));

/*
Authors: Edward Zhuang
This allows users to sign out.  
*/

const SignOutBase = ({ firebase }) => (
  <Button
    color="primary"
    type="button"
    variant="contained"
    color="primary"
    href={ROUTES.LANDING}
    onClick={firebase.doSignOut}
  >
    <div style={{ color: "white" }}>Sign Out</div>
  </Button>
);

const SignOutButton = withFirebase(SignOutBase);

export default function Navigation(props) {
  const classes = useStyles();
  const theme = useTheme();

  const toolbarStyle = {
    backgroundColor: theme.palette.primary.main,
    height: "10vh",
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar} style={toolbarStyle}>
        <Box display="flex" width={500} height={80} alignItems="left">
          <Typography variant="title">
            <a href={ROUTES.LANDING}>
              <img
                style={{ maxWidth: "100%", maxHeight: "100%", margin: "2px" }}
                src={Logo}
                alt="bug"
                height={100}
              />
            </a>
          </Typography>
        </Box>
        <Typography
          component="h2"
          variant="h5"
          align="left"
          noWrap
          className={classes.toolbarTitle}
        ></Typography>
        <AuthUserContext.Consumer>
          {(authUser) =>
            authUser ? (
              <SignOutButton />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                href={ROUTES.SIGN_IN}
              >
                <div style={{ color: "white" }}>Sign In</div>
              </Button>
            )
          }
        </AuthUserContext.Consumer>
      </Toolbar>
    </React.Fragment>
  );
}
