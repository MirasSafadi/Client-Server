import React from 'react';
import { withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import axios from 'axios'

const classes = {
        paper: {
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }
    }
class EmailVerification extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activated: false
        }
    }
    componentDidMount(){
        //take the crypt message from the url and send it back to server.
        //when the server responds with ok display the message.
        axios.post('http://localhost:8000/users/email/change/verify/',this.props.match.params)
        .then(res => {
            this.setState({
                activated: true
            })
        }).catch(err =>{
            console.log(err)
        })
    }
    
    render(){
        return (
            <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 5}}>
                <div style={classes.paper}>
                    {this.state.activated && 
                        <h3>Your New Email is Verified.</h3>
                    }
                </div>
            </Container>
        );
    }
}

export default withRouter(EmailVerification);