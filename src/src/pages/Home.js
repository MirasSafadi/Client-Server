import React from 'react';
import logo from '../logo.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import '../App.css';


class Home extends React.Component{
    render(){
        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="/login" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', marginBottom: 8}}>
                    <Button variant="contained" color="primary">
                        Log in
                    </Button>
                </Link>
                <Link to="/signup" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none'}}>
                    <Button variant="contained" color="primary">
                        Sign up
                    </Button>
                </Link>
            </div>
        );
    }
}

export default Home;