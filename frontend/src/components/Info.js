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
    componentDidMount(){
      this.setState({
        first_name: this.context.user.first_name || '',
        last_name: this.context.user.last_name || '',
        country: this.context.user.country || '',
        city: this.context.user.city || '',
        street: this.context.user.street || '',
        zipCode: this.context.user.zipCode || '',
        phone_number: this.context.user.phone_number || '',
    })
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
        
        if(!validators.validate(validators.validation_types.NAME,first_name)){
          this.props.showAlert(true,'error','Please use only english Character in your name.');
          return;
        }
        if(!validators.validate(validators.validation_types.NAME,last_name)){
          this.props.showAlert(true,'error','Please use only english Character in your name.');
          return;
        }
        if(!validators.validate(validators.validation_types.NAME,country)){
          this.props.showAlert(true,'error','Country names can only contain English letters');
          return;
        }
        if(!validators.validate(validators.validation_types.NAME,city)){
          this.props.showAlert(true,'error','Please use only english Character in your name.');
          return;
        }
        //can't validate street names
        if(!validators.validate(validators.validation_types.DIGITS,zipCode)){
          this.props.showAlert(true,'error','Zip code can only contain digits');
          return;
        }
        if(!validators.validate(validators.validation_types.DIGITS,phone_number)){
          this.props.showAlert(true,'error','Please enter only digits in your phone number');
          return;
        }
        var body = {
          first_name: first_name,
          last_name: last_name,
          country: country,
          city: city,
          street: street,
          zipCode: zipCode,
          phone_number: phone_number
        }
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.context.token}`
        }
        axios.put('/users/info/change/',body)
        .then(res =>{
          this.props.showAlert(true,'success','You\'re info was successfully changed');
        }).catch(error =>{
          this.props.showAlert(true,'error',error.response.data.error);
        });
    }


    render(){
        const { classes } = this.props;
        return (
            <form onSubmit={this.submitForm} id="infoForm" className={classes.form}>
                <Grid container spacing={1}  alignItems="center" justify="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                        value={this.state.first_name}
                        name="first_name"
                        variant="outlined"
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
                        type="tel"
                        variant="outlined"
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
                        type="tel"
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