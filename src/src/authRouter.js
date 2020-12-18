import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router";

//use this component to define private routes
//props: { path, children }
const AuthRoute = (props) => {

  const { isAuthenticated } = props;
  return (
  <Route exact path={props.path} >
      {!isAuthenticated? <Redirect exact to="/login" /> : props.Component }
  </Route>)
};

const mapStateToProps = state => {
  return {
    isAuthenticated: false
  }
}

export default withRouter(connect(mapStateToProps)(AuthRoute));