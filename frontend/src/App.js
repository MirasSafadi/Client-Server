import React from 'react';
import './App.css';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Computers from './pages/Computers';
import Phones from './pages/Phones';
import Activation from './pages/acountActivation';
import RegistrationComplete from './pages/regitrationComplete';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import HOC from './HOC/hoc';
import Navbar from './components/Navbar';
import AuthRouter from './authRouter';
import UserContext from './context/user-context';
import ForgotPassword from './pages/forgotPassword';
import ForgotPasswordVerify from './pages/forgotPasswordVerify';
import ResetPasswordEmail from './pages/resetPasswordEmail';
import ResetPasswordComplete from './pages/resetPasswordComplete';
import NotFound from './pages/404';
import Profile from './pages/profile';
import About from './pages/about';
import EmailVerification from './pages/emailVerification';
import UnderConstruction from './pages/underConstruction';
// import baseRouter from './baseRouter';


class App extends React.Component{
  static contextType = UserContext;

  render(){
    const { isAuthenticated } = this.context
    return (
      <HOC>
        <Navbar isAuthenticated={isAuthenticated} />
        
        <Switch>

          <Route exact path="/" >
            <Home />
          </Route>

          <Route exact path="/login/" >
            <SignIn />
          </Route>
          <Route exact path="/register/checkLink/:base64/" >
            <Activation />
          </Route>
          <Route exact path="/email/change/checkLink/:base64/" >
            <EmailVerification />
          </Route>
          <Route exact path="/signup/" >
            <SignUp />
          </Route>
          <Route exact path="/signup" >
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
          
          <Route exact path="/about/" >
            <About />
          </Route>
          <Route exact path="/password/reset/" >
            <ForgotPassword />
          </Route>
          <Route exact path="/password/reset" >
            <ForgotPassword />
          </Route>
          <Route exact path="/password/reset/verify/:base64/" >
            <ForgotPasswordVerify />
          </Route>
          <Route exact path="/password/reset/complete/" >
            <ResetPasswordEmail />
          </Route>
          <Route exact path="/password/reset/success/" >
            <ResetPasswordComplete />
          </Route>
          <Route exact path="/notfound/">
            <NotFound />
          </Route>
          <Route exact path="/under_construction/">
            <UnderConstruction />
          </Route>

          <AuthRouter isAuthenticated={isAuthenticated} path="/profile/" >
            <Profile />
          </AuthRouter>

          
          

          <Redirect to="/notfound/" />

        </Switch>
      </HOC>
    );
  }
}

export default withRouter(App);
