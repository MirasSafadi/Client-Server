import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';
import UserContext from '../context/user-context';
import * as cookies from '../utils/cookies';

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

export default function Navbar(props) {
  const classes = useStyles();

  // const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);
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
          <Link to="/computers/" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Computers
                </Typography>
              </Button>
          </Link>
          <Link to="/phones/" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Phones
                </Typography>
                
              </Button>
          </Link>

          {props.isAuthenticated && 
            (<Button 
              variant="outlined"
              color="default"
              style={{color:'red', fontWeight:'bold'}}
              onClick={() => {
                  if(localStorage.getItem('token')){
                    localStorage.removeItem('token');
                  } else{
                    cookies.setCookie('token','', -0.5);
                  }
                  if(localStorage.getItem('name')){
                    localStorage.removeItem('name');
                  } else {
                    cookies.setCookie('name','', -0.5);
                  }

                  const newUser = { token: null, user: { name: null, isAuthenticated: false } }
                  setUser(newUser)

            }} >
              <Typography variant="button" color="inherit"  style={{float: 'right', display: 'inline-block'}}>
                Logout
              </Typography>
            </Button>)
          }

        </Toolbar>
        {/*make the logout button to the left and add the users' name upon login. */}
        
      </AppBar>
    </div>
  );
}