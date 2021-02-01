import React from 'react';
import { withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container';

const classes = {
    paper: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
}
class UnderConstruction extends React.Component{

    
    render(){
        return (
            <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 5}}>
                <div style={classes.paper}>
                    <h3>Sorry, this page is currently under construction.</h3>
                </div>
            </Container>
        );
    }
}

export default withRouter(UnderConstruction);