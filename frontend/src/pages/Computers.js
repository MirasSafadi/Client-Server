import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';


class Computers extends React.Component{
    render(){
        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <h2 style={{color: 'white'}}>You can browse computers here</h2>
                <Button variant="contained" color="primary" onClick={()=> this.props.history.push('/')}>
                    go back 
                </Button>
            </div>
        );
    }
}

export default withRouter(Computers);