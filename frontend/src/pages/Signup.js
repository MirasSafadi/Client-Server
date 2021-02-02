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
import ReCAPTCHA from "react-google-recaptcha";
import { withRouter } from "react-router-dom";
import UserContext from '../context/user-context';
import axios from 'axios';
import * as validators from '../utils/inputValidators';
import MySnackbar from '../components/snackbar';



const TEST_SITE_KEY = "6LeoExQaAAAAAGwiyrmrZa3e6lwmmUj726tqSs_t";
const DELAY = 1500;

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

class SignUp extends React.Component {
  static contextType = UserContext;

  constructor(props){
    super(props);
    this.state = {
      //for the recaptcha
      value: '[empty]',
      load: false,
      expired: false,

      fname: '',
      lname: '',
      email: '',
      password1: '',
      password2: '',


      open: false,
      severity: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleCAPTCHAChange = this.handleCAPTCHAChange.bind(this);
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        load: true
      })
    }, DELAY);
  }

  handleChange(event){
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name] : value
    });
  }

  handleCAPTCHAChange(cValue){
    this.setState({
      value: cValue
    });
    // if value is null recaptcha expired
    if (cValue === null) 
      this.setState({
        expired: true
      })
  }
  submitForm(event){
    event.preventDefault();
    let fname = this.state.fname;
    let lname = this.state.lname;
    let email = this.state.email;
    let password1 = this.state.password1;
    let password2 = this.state.password2;
    let value = this.state.value;
    console.log(fname,lname,email, password1,password2)
    //validate input and recaptcha...
    if(value === '[empty]' || this.state.expired){
      this.setState({
        open: true,
        severity: 'error',
        message: 'please recheck the CAPTCHA box!'
      })
      return;
    }
    if(!validators.validate(validators.validation_types.NAME,fname)){
      this.setState({
        open: true,
        severity: 'error',
        message: 'First name must contain only English letters.'
      })
      return;
    }
    if(!validators.validate(validators.validation_types.NAME,lname)){
      this.setState({
        open: true,
        severity: 'error',
        message: 'Last name must contain only English letters.'
      })
      return;
    }
    if(!validators.validate(validators.validation_types.EMAIL,email)){
      this.setState({
        open: true,
        severity: 'error',
        message: 'Invalid Email.'
      })
      return;
    }
    if(password1 !== password2){
      this.setState({
        open: true,
        severity: 'error',
        message: 'Passwords do not match.'
      })
      return;
    }
    if(!validators.validate(validators.validation_types.PASSWORD,password1)){
      var passAlert = 'Password must contain at least:\n'+
                        '• 1 lowercase alphabetical character.\n'+
                        '• 1 uppercase alphabetical character.\n'+
                        '• 1 numeric character.\n'+
                        '• 6 characters.\n'
      this.setState({
        open: true,
        severity: 'error',
        message: passAlert
      })
      return;
    }
    
    var data = {
      email: email,
      first_name: fname,
      last_name: lname,
      password1: password1,
      password2: password2
    }
    axios.post('users/register/',data)
    .then(() => {
      
      this.props.history.push('/signup/complete/');
    }).catch(error =>{
      this.setState({
        open: true,
        severity: 'error',
        message: error.response.data.error
      })
    });
  }
  closeAlert(){
    this.setState({
      open: false,
      severity: '',
      message: ''
    })
  }
  render(){
    const { classes } = this.props;
    // const { user, setUser } = this.context
    return (
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 5}}>
        {this.state.open && <MySnackbar severity={this.state.severity} message={this.state.message} close={this.closeAlert.bind(this)}/>}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={this.submitForm} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lname"
                  autoComplete="lname"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                />
              </Grid>
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
              <Grid item xs={12}>
              {this.state.load && (
                <ReCAPTCHA
                  theme="light"
                  sitekey={TEST_SITE_KEY}
                  onChange={this.handleCAPTCHAChange}
                />
              )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
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

export default withStyles(useStyles)(withRouter(SignUp));