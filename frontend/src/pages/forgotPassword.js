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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class ForgotPassword extends React.Component {
  static contextType = UserContext;

  constructor(props){
    super(props);
    this.state = {
      email: '',

      open: false,
      severity: '',
      message: ''
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
      let email = this.state.email;
      if(!validators.validate(validators.validation_types.EMAIL,email)){
        alert('Invalid Email.');
        return;
      }
      axios.post('users/password/reset/',{ email: email})
      .then(()=>{
          this.props.history.push('/password/reset/complete/');
      }).catch(err => {
        this.setState({
          open: true,
          severity: 'error',
          message: err.response.data.error
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
    return (
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 5}}>
        {this.state.open && <MySnackbar severity={this.state.severity} message={this.state.message} close={this.closeAlert.bind(this)}/>}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form onSubmit={this.submitForm} className={classes.form}>
            <Grid container spacing={2}>
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

export default withStyles(useStyles)(withRouter(ForgotPassword));