import React from 'react';
import './App.css';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Computers from './pages/Computers';
import Phones from './pages/Phones';
import Activation from './pages/acountActivation';
import RegistrationComplete from './pages/regitrationComplete';
import { Route, Switch, withRouter } from 'react-router-dom';
import HOC from './HOC/hoc';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import AuthRouter from './authRouter';
import UserContext from './context/user-context';


class App extends React.Component{
  static contextType = UserContext;

  componentDidMount(){
    // console.log(localStorage.getItem('token'))
    // console.log(this.props.isAuthenticated);
    const user = this.context
    console.log(user) // { name: null, isAuthenticated: false }
  }

  render(){
    const { user, setUser } = this.context
    return (
      <HOC>
        <Navbar isAuthenticated={user.isAuthenticated} />
        <Switch>
          <Route exact path="/login/" >
            <SignIn />
          </Route>
          <Route exact path="/register/checkLink/:base64/" >
            <Activation />
          </Route>
          <Route exact path="/signup/" >
            <SignUp />
          </Route>
          <Route exact path="/signup/complete/" >
            <RegistrationComplete />
          </Route>
          <Route exact path="/computers/" >
            <Computers />
          </Route>
          <Route exact path="/phones/" >
            <Phones />
          </Route>
          {/* <AuthRouter path="/" >
            <Home />
          </AuthRouter> */}
          <AuthRouter isAuthenticated={user.isAuthenticated} path="/" >
            <Home />
          </AuthRouter>
        </Switch>
      </HOC>
    );
  }
}

const mapStateToProps = state => {
  console.log('App: ',state);
  return {
    isAuthenticated: state.isAuthenticated
  }
}


// export default withRouter(connect(mapStateToProps)(App));
export default withRouter(App);