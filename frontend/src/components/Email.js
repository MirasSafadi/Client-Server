import React from 'react';
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


class EmailForm extends React.Component{
    static contextType = UserContext;
    //TODO: add value to email from context
    constructor(props){
        super(props);
        // const { user, setUser } = this.context
        this.state = {
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    componentDidMount(){
      this.setState({
        email: this.context.user.email
      });
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
        let email = this.state.email;
        if(!validators.validate(validators.validation_types.EMAIL,email)){
          this.props.showAlert(true,'error','Invalid email.');
          return;
        }
        if(email === this.context.user.email){
          this.props.showAlert(true,'error','You need to change the email first');
          return;
        }
        axios.put('http://localhost:8000/users/email/change/', {email: email})
        .then(res =>{
          this.props.showAlert(true,'info','We sent you a verification email. Check your spam if you don\'t see it');
        }).catch(error =>{
          this.props.showAlert(true,'error',error.response.data.error);
        });
    }


    render(){
        const { classes } = this.props;
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