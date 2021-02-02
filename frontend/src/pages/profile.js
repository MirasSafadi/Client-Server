import React from 'react';
import { withRouter } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import InfoForm from '../components/Info';
import EmailForm from '../components/Email';
import PasswordForm from '../components/ChangePassword';
import MySnackbar from '../components/snackbar';


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

  constructor(props){
    super(props);
    this.state ={
      open: false,
      severity: '',
      message: ''
    }
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert(open,severity,message){
    this.setState({
      open: open,
      severity: severity,
      message: message
    })
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
            <Container component="main" alignContent="center" maxWidth="sm" style={{ backgroundColor: 'white', borderRadius: 5}}>
              {this.state.open && <MySnackbar severity={this.state.severity} message={this.state.message} close={this.closeAlert.bind(this)}/>}
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Profile Details
                </Typography>
                  <Grid container spacing={0} direction="column" alignItems="center" justify="center" >
                    <EmailForm showAlert={this.showAlert}/>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <InfoForm showAlert={this.showAlert}/>
                    <Grid item xs={12}> 
                      <Divider />
                    </Grid>
                    <PasswordForm showAlert={this.showAlert}/>
                  </Grid>
              </div>
              <br/>
            </Container>
            
            
        );
    }
}

export default withStyles(useStyles)(withRouter(Profile));