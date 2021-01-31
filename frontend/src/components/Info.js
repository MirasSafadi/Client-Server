import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import UserContext from '../context/user-context';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
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


class InfoForm extends React.Component{
    static contextType = UserContext;
    //TODO: add value to email from context
    constructor(props){
        super(props);
        // const { user, setUser } = this.context
        this.state = {
            first_name: '',
            last_name: '',
            country: '',
            city: '',
            street: '',
            zipCode: '',
            phone_number: '',
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
        let first_name = this.state.first_name;
        let last_name = this.state.last_name;
        let country = this.state.country;
        let city = this.state.city;
        let street = this.state.street;
        let zipCode = this.state.zipCode;
        let phone_number = this.state.phone_number;
        //TODO: input validation..
        var body = {
          first_name: first_name,
          last_name: last_name,
          country: country,
          city: city,
          street: street,
          zipCode: zipCode,
          phone_number: phone_number
        }
        axios.put('http://localhost:8000/users/info/change/',body)
        .then(res =>{
          //TODO: display message
        }).catch(error =>{
          //TODO: display message
        });
    }


    render(){
        const { classes } = this.props;
        const { user, setUser } = this.context
        return (
            <form onSubmit={this.submitForm} id="infoForm" className={classes.form}>
                <Grid container spacing={1}  alignItems="center" justify="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={this.state.first_name}
                        name="first_name"
                        variant="outlined"
                        required
                        size="small"
                        id="firstName"
                        label="First Name"
                        autoFocus
                        onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={this.state.last_name}
                        name="last_name"
                        variant="outlined"
                        required
                        size="small"
                        id="lastName"
                        label="Last Name"
                        onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={this.state.country}
                        name="country"
                        variant="outlined"
                        required
                        size="small"
                        id="country"
                        label="Country"
                        
                        onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={this.state.city}
                        name="city"
                        variant="outlined"
                        required
                        size="small"
                        id="city"
                        label="City"
                        onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={this.state.street}
                        name="street"
                        variant="outlined"
                        required
                        size="small"
                        id="street"
                        label="Street"
                        onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={this.state.zipCode}
                        name="zipCode"
                        variant="outlined"
                        required
                        size="small"
                        id="zipCode"
                        label="Zip Code"
                        onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} className="d-flex justify-content-center">
                    <TextField
                        value={this.state.phone_number}
                        name="phone_number"
                        variant="outlined"
                        required
                        size="small"
                        id="phoneNumber"
                        label="Phone Number"
                        onChange={this.handleChange}
                    />
                  </Grid>


                  <Button
                    type="submit"
                    style={{alignSelf:'center', marginLeft:5}}
                    variant="contained"
                    color="primary"
                    size="medium"
                    form="infoForm"
                    className={classes.submit}
                  >
                    Update Info
                  </Button>
                </Grid>
            </form>
        );
    }
}

export default withStyles(useStyles)(InfoForm);