import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import UserContext from '../context/user-context';




class Computers extends React.Component{
    static contextType = UserContext;

    render(){
        const { user, setUser } = this.context
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