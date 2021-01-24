import React from 'react';
import Container from '@material-ui/core/Container';

const classes = {
        paper: {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }
    }
class Activation extends React.Component{

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
                    {this.state.activated? 
                        <h3>Your Email is Verified, you may login now.</h3>
                        :
                        <h3>Something went wrong, please try again!</h3>
                    }
                </div>
            </Container>
        );
    }
}

export default Activation;