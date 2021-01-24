import React from 'react';
import logo from '../logo.svg';
// import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
import '../App.css';
import { withRouter } from 'react-router-dom';
import UserContext from '../context/user-context';




class Home extends React.Component{
    static contextType = UserContext;

    render(){
        const { user, setUser } = this.context
        return (
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <h2 style={{color: 'white'}}>Welcome to our shop!</h2>
                {/* <Link to="/login" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none', marginBottom: 8}}>
                    <Button variant="contained" color="primary">
                        login
                    </Button>
                 </Link> */}
            </div>
        );
    }
}

export default withRouter(Home);