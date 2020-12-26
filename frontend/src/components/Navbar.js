import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Link to="/" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Dashboard
                </Typography>
              </Button>
          </Link>
          <Link to="/computers" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Computers
                </Typography>
              </Button>
          </Link>
          <Link to="/phones" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Phones
                </Typography>
                
              </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
