import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import UserContext from '../context/user-context';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import * as validators from '../utils/inputValidators';
import InfoForm from '../components/Info';
import EmailForm from '../components/Email';
import PasswordForm from '../components/ChangePassword';


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Profile extends React.Component{
    static contextType = UserContext;

    


    render(){
        const { classes } = this.props;
        const { user, setUser } = this.context
        return (
            <Container component="main" alignContent="center" maxWidth="sm" style={{ backgroundColor: 'white', borderRadius: 5}}>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Profile Details
                </Typography>
                  <Grid container spacing={0} direction="column" alignItems="center" justify="center" >
                    <EmailForm />
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <InfoForm />
                    <Grid item xs={12}> 
                      <Divider />
                    </Grid>
                    <PasswordForm />
                  </Grid>
              </div>
              <br/>
            </Container>
            
            
        );
    }
}

export default withStyles(useStyles)(withRouter(Profile));