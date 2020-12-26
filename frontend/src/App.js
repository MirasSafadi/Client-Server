import React from 'react';
import './App.css';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Computers from './pages/Computers';
import Phones from './pages/Phones';
import { Route, Switch, withRouter } from 'react-router-dom';
// import { Redirect, Route, Switch, Link, withRouter } from 'react-router-dom';
import HOC from './HOC/hoc';
import * as actions from './store/actions/auth';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import AuthRouter from './authRouter';
import axios from 'axios';

// import Button from '@material-ui/core/Button';




function App(props) {
  // const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [retVal, setRetVal ] = React.useState("");


  React.useEffect(() =>{
    axios.get('http://localhost:8000/testAPI')
    .then(response => {
      setRetVal(response.data);
    })
    .catch(err => {
      console.log(err);
    });

  }, []);
  return (
    <HOC>
      <Navbar />
      <Switch>
        <Route exact path="/login" >
          <SignIn />
        </Route>
        <Route exact path="/signup" >
          <SignUp />
        </Route>
        <Route exact path="/computers" >
          <Computers />
        </Route>
        <Route exact path="/phones" >
          <Phones />
        </Route>
        <AuthRouter path="/" Component={<Home />} />
      </Switch>
    </HOC>
  );
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.token !== null
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
//add mapStateToProps
export default withRouter(connect(null, mapDispatchToProps)(App));
