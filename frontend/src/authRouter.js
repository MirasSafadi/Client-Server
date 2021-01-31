import React from "react";
import { Redirect, Route, withRouter } from "react-router";

//use this component to define private routes
//props: { path, children }
class AuthRoute extends React.Component{

  componentDidMount(){
  }

  render(){
    return (
      <Route exact path={this.props.path} >
        {!this.props.isAuthenticated? <Redirect to="/login/" /> : this.props.children }
      </Route>
    );
  }
}
export default withRouter(AuthRoute);