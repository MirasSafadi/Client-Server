import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import UserContext from '../context/user-context';
import axios from 'axios';
import * as validators from '../utils/inputValidators';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

class ForgotPasswordVerify extends React.Component {
  static contextType = UserContext;

  constructor(props){
    super(props);
    this.state = {
      password1: '',
      password2: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event){
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name] : value
    });
  }
  submitForm(event){
    event.preventDefault();
    let password1 = this.state.password1;
    let password2 = this.state.password2;
    let base64 = this.props.match.params.base64;
    //input validation..
    if(password1 !== password2){
      alert('Passwords do not match.');
      return;
    }
    if(!validators.validate(validators.validation_types.PASSWORD,password1)){
      var passAlert = 'Password must contain at least:\n'+
                        '• 1 lowercase alphabetical character.\n'+
                        '• 1 uppercase alphabetical character.\n'+
                        '• 1 numeric character.\n'+
                        '• 6 characters.\n'
      alert(passAlert);
      return;
    }
    var data = {
        base64: base64,
        password1: password1,
        password2: password2
    }
    axios.post('http://localhost:8000/users/password/reset/verify/',data)
    .then(res =>{
        this.props.history.push('/password/reset/success/')
    }).catch(err =>{

    })
  }
  render(){
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 5}}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form onSubmit={this.submitForm} className={classes.form} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  id="password1"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send me a link
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
        <br/>
      </Container>
    );
  }
}

export default withStyles(useStyles)(withRouter(ForgotPasswordVerify));