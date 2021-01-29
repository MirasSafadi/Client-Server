import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';


const NotFound = (props) => (
  <div style={{textAlign:'center'}}>
    <h1 style={{color: 'white', textAlign: 'center'}}>404 - Not Found!</h1>
    <Button variant="contained" color="primary" onClick={()=> props.history.push('/')}>
        Go Back Home
    </Button>
  </div>
);

export default withRouter(NotFound);