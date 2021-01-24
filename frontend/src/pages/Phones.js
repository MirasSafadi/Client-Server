import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import { withRouter } from 'react-router-dom'
import UserContext from '../context/user-context';



class Phones extends React.Component{
    static contextType = UserContext;

    render(){
        const { user, setUser } = this.context
        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <h2 style={{color: 'white'}}>You can browse phones here</h2>
            </div>
        );
    }
}

export default withRouter(Phones);