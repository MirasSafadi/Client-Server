import React from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getComputers } from '../utils/utils';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



function Computers() {
    const classes = useStyles();
    const history = useHistory();
    const computers = getComputers().map(computer => (
      <div key={computer.id} style={{margin: 10}}>
          <Card className={classes.root} elevation={10}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={computer.photo}
                title="Miras Safadi"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {computer.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {computer.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() =>{history.push('/under_construction/')}}>
                View Details
              </Button>
            </CardActions>
          </Card>
      </div>
    ))
    return (
      <div className="d-flex align-content-center flex-wrap justify-content-center">
          {computers}
      </div>
    );
}


export default withRouter(Computers);