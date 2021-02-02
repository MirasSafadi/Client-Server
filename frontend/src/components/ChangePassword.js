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


class PasswordForm extends React.Component{
    static contextType = UserContext;
    //TODO: add value to email from context
    constructor(props){
        super(props);
        // const { user, setUser } = this.context
        this.state = {
            old_password: '',
            new_password1: '',
            new_password2: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(event){
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }


    submitForm(event){
        event.preventDefault();
        let old_password = this.state.old_password;
        let new_password1 = this.state.new_password1;
        let new_password2 = this.state.new_password2;
        //TODO: input validation
        if(new_password1 !== new_password2){
            this.props.showAlert(true,'error','New passwords do not match');
            return;
        }
        if(new_password1 === old_password){
            this.props.showAlert(true,'error','New password is identical to old password');
            return;
        }
        if(!validators.validate(validators.validation_types.PASSWORD,new_password1)){
            var passAlert = 'Password must contain at least:\n'+
                        '• 1 lowercase alphabetical character.\n'+
                        '• 1 uppercase alphabetical character.\n'+
                        '• 1 numeric character.\n'+
                        '• 6 characters.\n';
            this.props.showAlert(true,'error',passAlert);
            return;
        }
        var body = {
            old_password: old_password,
            new_password1: new_password1,
            new_password2: new_password2
        }
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.context.token}`
        }
        axios.put('/users/password/change/',body)
        .then(res =>{
            this.props.showAlert(true,'success','You\'re password was successfully changed');
        }).catch(error =>{
            this.props.showAlert(true,'error',error.response.data.error);
        });
    }


    render(){
        const { classes } = this.props;
        return (
            <form onSubmit={this.submitForm} id="passwordForm" className={classes.form}>
                <Grid container spacing={1} direction="column" alignItems="center" justify="center" >
                  <Grid item xs={12}>
                  <TextField
                    value={this.state.old_password}
                    variant="outlined"
                    required
                    size="small"
                    style={{alignSelf:'center'}}
                    id="old_password"
                    label="Old Password"
                    type="password"
                    name="old_password"
                    onChange={this.handleChange}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                    value={this.state.new_password1}
                    variant="outlined"
                    required
                    size="small"
                    name="new_password1"
                    label="New Password"
                    type="password"
                    id="new_password1"
                    onChange={this.handleChange}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                    value={this.state.new_password2}
                    variant="outlined"
                    required
                    size="small"
                    name="new_password2"
                    label="Confirm Password"
                    type="password"
                    id="new_password2"
                    onChange={this.handleChange}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <Button
                    type="submit"
                    style={{alignSelf:'center', marginLeft:5}}
                    variant="contained"
                    color="primary"
                    size="medium"
                    form="passwordForm"
                    className={classes.submit}
                  >
                    Update Password
                  </Button>
                  </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(useStyles)(PasswordForm);