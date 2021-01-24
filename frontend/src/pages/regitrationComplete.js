import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const classes = {
        paper: {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }
    }
class RegistrationComplete extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activated: false
        }
    }
    componentDidMount(){
        //take the crypt message from the url and send it back to server.
        //when the server responds with ok display the message.
    }
    
    render(){
        return (
            <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 5}}>
                <div style={classes.paper}>
                    <h3>We sent you an email. Check your spam folder if you don't see it.</h3>
                    <Link to="/login/" style={{ textDecoration: 'none', margin: 8, color: 'black'}}>
                        <Button variant="text" color="primary">
                            <Typography variant="button" color="primary">
                                <b>Back to login</b>
                            </Typography>
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }
}

export default RegistrationComplete;