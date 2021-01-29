import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';


const ResetPasswordComplete = (props) => (
  <div style={{textAlign:'center'}}>
    <h1 style={{color: 'white', textAlign: 'center'}}>Reset Successful</h1>
    <Button variant="contained" color="primary" onClick={()=> props.history.push('/login/')}>
        Go Back to Login
    </Button>
  </div>
);

export default withRouter(ResetPasswordComplete);