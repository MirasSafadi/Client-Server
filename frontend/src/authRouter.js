import React from "react";
import { Redirect, Route, withRouter } from "react-router";
import { connect } from 'react-redux';

//use this component to define private routes
//props: { path, children }
class AuthRoute extends React.Component{

  componentDidMount(){
  }

  render(){
    return (
      <Route exact path={this.props.path} >
        {!this.props.isAuthenticated? <Redirect exact to="/login" /> : this.props.children }
      </Route>
    );
  }
}

const mapStateToProps = state => {
  console.log('router: ',state);
  return {
    isAuthenticated: state.isAuthenticated
  }
}

// export default connect(mapStateToProps,null)(withRouter(AuthRoute));
export default withRouter(AuthRoute);