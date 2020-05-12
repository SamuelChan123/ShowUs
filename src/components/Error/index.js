import React from "react";
import {
  makeStyles,
  Typography,
  Container,
  Grid,
  Button,
  CssBaseline,
  Paper,
} from "@material-ui/core";
import * as ROUTES from "../../routes";
import { useTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    justifyContent: "center",
  },
  button: { padding: theme.spacing(2) },
  buttonMargin: { margin: theme.spacing(1) },
  submit: {},
}));

function Error(props) {
  const classes = useStyles();
  const theme = useTheme();

  const history = props.history;
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper className={classes.card}>
        <Container>
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            404 Error: Page Not Found
          </Typography>
        </Container>
        <Container className={classes.button}>
          <Grid container justify="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.buttonMargin}
              style={{ justifyContent: "center" }}
              onClick={(e) => {
                history.goBack();
              }}
            >
              <div style={{ color: "white" }}>Back to Previous</div>
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className={classes.buttonMargin}
              style={{ justifyContent: "center" }}
              href={ROUTES.LANDING}
            >
              Back to Home
            </Button>
          </Grid>
        </Container>
      </Paper>
    </React.Fragment>
  );
}

export default withRouter(Error);
