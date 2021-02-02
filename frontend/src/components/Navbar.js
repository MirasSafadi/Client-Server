import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  // const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);
  let name = '';
  if(user)
    name = user.first_name + ' ' + user.last_name;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <div style={{display: 'flex', flexGrow: 1}}>

          <Link to="/" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Home
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
          <Link to="/about/" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  About Us
                </Typography>
                
              </Button>
          </Link>

          {props.isAuthenticated &&
            (<Link to="/profile/" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Profile
                </Typography>
                
              </Button>
            </Link>)
          }
          </div>
          {props.isAuthenticated? 
            (
            <div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} style={{display:'flex'}}>
            <Typography noWrap={true} display="inline" variant="body1" color="inherit" style={{alignSelf:'center'}} >
              {name}
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button 
              variant="outlined"
              color="default"
              style={{color:'red', fontWeight:'bold'}}
              onClick={() => {
                  if(localStorage.getItem('token')){
                    localStorage.removeItem('token');
                  } else{
                    cookies.setCookie('token','', -0.5);
                  }
                  if(localStorage.getItem('user')){
                    localStorage.removeItem('user');
                  } else {
                    cookies.setCookie('user','', -0.5);
                  }

                  const newUser = { token: null, isAuthenticated: false, user: { } }
                  setUser(newUser)
                  history.push('/');
            }} >
              <Typography variant="button" color="inherit"  >
                Logout
              </Typography>
            </Button>
            </Grid>
            </Grid>
            </div>)
            :
            (
              <div>
              <Link to="/login/" style={{ textDecoration: 'none', margin: 8, color: 'white'}}>
              <Button variant="text" color="inherit">
                <Typography variant="button" color="inherit">
                  Login
                </Typography>
                
              </Button>
            </Link>
              </div>)
          }

        </Toolbar>
        {/*make the logout button to the left and add the users' name upon login. */}
        
      </AppBar>
    </div>
  );
}