import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import UserContext from '../context/user-context';
import axios from 'axios';
import * as cookies from '../utils/cookies';
import MySnackbar from '../components/snackbar';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
})

class SignIn extends React.Component{
  static contextType = UserContext;


  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,

      open: false,
      severity: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount(){
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
    let email = this.state.email;
    let password = this.state.password;
    let rememberMe = this.state.rememberMe;
    console.log(rememberMe, typeof rememberMe);
    if(email === '' || password === ''){
      alert('One or more of the fields is missing!');
      return;
    }
    // this.props.authLogin(email,password,rememberMe);
    axios.post('http://localhost:8000/users/login/', {
        email: email,
        password: password
    })
    .then(res => {
        const token = res.data.token;
        const user = res.data.user;
        if(rememberMe === 'true'){
            localStorage.setItem('token', token);
            localStorage.setItem('user',JSON.stringify(user));
        } else{
            cookies.setCookie('token',token, 0.5);
            cookies.setCookie('user',JSON.stringify(user), 0.5);
        }
        this.context.setUser({ token: token, isAuthenticated: true, user: user });
        //push history to homepage.
        this.props.history.push('/');
    })
    .catch(err => {
        this.setState({
          open: true,
          severity: 'error',
          message: err.response.data.error
        })
    });
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 5}}>
      {this.state.open && <MySnackbar severity={this.state.severity} message={this.state.message}/>}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form  className={classes.form} id="loginForm">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {this.handleChange}
            />
            <FormControlLabel
              control={<Checkbox value={true} color="primary" />}
              label="Remember me"
              name="rememberMe"
              onChange = {this.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              form = "loginForm"
              className={classes.submit}
              onClick={this.submitForm}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/password/reset/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <br/>
        
      </Container>
      
      </div>
    );
  }
}

export default withStyles(useStyles)((withRouter(SignIn)));