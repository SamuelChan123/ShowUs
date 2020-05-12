import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Copyright from "../Copyright";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../routes";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

const friends = {
  title: "Friends",
  desc: "Add friends, remove friends, and share your rankings with friends",
  image: "https://source.unsplash.com/random",
};
const groups = {
  title: "Groups",
  desc: "Join groups, leave groups, and share your rankings with groups",
  image: "https://source.unsplash.com/random",
};
const account = {
  title: "Account",
  desc: "Manage account settings, profile details, and personal info",
  image: "https://source.unsplash.com/random",
};

const cards = [friends, groups, account];

function Home(props) {
  const classes = useStyles();
  document.title = "ShowUs";

  const history = props.history;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Rank your favorites and share them
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Shows and movies keep us entertained–why not share them with your
              friends and groups too? Get started by ranking your favorite
              shows/movies!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    href={ROUTES.RATE_SHOWS}
                  >
                    Rank TV Shows
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={ROUTES.RATE_MOVIES}
                  >
                    Rank Movies
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.title} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <ButtonBase
                    className={classes.cardAction}
                    onClick={(event) => {
                      history.push(`/${card.title.toLowerCase()}`);
                    }}
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.image}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography>{card.desc}</Typography>
                    </CardContent>
                  </ButtonBase>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withRouter(Home);
