import React, { useState, useEffect } from "react";
import "../App.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IsLoggedIn from "./IsLoggedIn";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  login: {
    marginRight: theme.spacing(2)
  },
  loginButton: {
    marginRight: theme.spacing(2),
    flexGrow: 1
  },
  link: {
    textDecoration: "none"
  }
}));

function LogInOut() {
  const [isLoggedIn, setStatus] = useState({ state: IsLoggedIn() });
  let button = "";
  const classes = useStyles();

  useEffect(() => {
    async function getStatus() {
      const res = await IsLoggedIn();
      setStatus({ state: res });
    }
    getStatus();
  }, [setStatus]);

  if (!isLoggedIn.state) {
    button = (
      <div className={classes.root}>
        <Button
          className={classes.loginButton}
          variant="contained"
          color="primary"
        >
          <a className={classes.link} href="http://localhost:8000/auth/spotify">
            Login
          </a>
        </Button>
      </div>
    );
  } else {
    button = (
      <div className={classes.root}>
        <Button
          className={classes.loginButton}
          variant="contained"
          color="secondary"
        >
          <a className={classes.link} href="http://localhost:8000/logout">
            Logout
          </a>
        </Button>
      </div>
    );
  }
  return button;
}

export default LogInOut;
