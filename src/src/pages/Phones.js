import React from 'react';
import logo from '../logo.svg';
import '../App.css';


class Phones extends React.Component{
    render(){
        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <h2 style={{color: 'white'}}>You can browse phones here</h2>
            </div>
        );
    }
}

export default Phones;