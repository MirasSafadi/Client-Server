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


class EmailForm extends React.Component{
    static contextType = UserContext;

    constructor(props){
        super(props);
        // const { user, setUser } = this.context
        this.state = {
            email: '',
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

    }


    render(){
        const { classes } = this.props;
        const { user, setUser } = this.context
        return (
            <form onSubmit={this.submitForm} id="emailForm" className={classes.form}>
                <Grid container spacing={1} direction="column" alignItems="center" justify="center" >
                  <Grid item xs={12} className="d-flex justify-content-center">
                    <TextField
                        value={this.state.email}
                        name="email"
                        variant="outlined"
                        required
                        size="small"
                        style={{alignSelf:'center'}}
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} className="d-flex justify-content-center" >
                    <Button
                      type="submit"
                      style={{alignSelf:'center', marginLeft:5}}
                      variant="contained"
                      color="primary"
                      size="medium"
                      form="emailForm"
                      className={classes.submit}
                    >
                      Update Email
                    </Button>
                  </Grid>
                </Grid>
            </form>
        );
    }
}

export default withStyles(useStyles)(EmailForm);