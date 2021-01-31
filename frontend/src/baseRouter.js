import React from 'react'
import { Switch,Route, withRouter } from 'react-router-dom';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Computers from './pages/Computers';
import Phones from './pages/Phones';
import Activation from './pages/acountActivation';
import RegistrationComplete from './pages/regitrationComplete';
import ForgotPassword from './pages/forgotPassword';
import ForgotPasswordVerify from './pages/forgotPasswordVerify';
import ResetPasswordEmail from './pages/resetPasswordEmail';
import ResetPasswordComplete from './pages/resetPasswordComplete';
import Profile from './pages/profile';


function baseRouter(props){
    return (
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
          <Route exact path="/profile/" >
            <Profile />
          </Route>
          <Route exact path="/password/reset/" >
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

        </Switch>
    );
}

export default withRouter(baseRouter);