import React from 'react';
import { withRouter,useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getPhones } from '../utils/utils';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



function Phones() {
  const classes = useStyles();
  const history = useHistory();
  const phones = getPhones().map(phone => (
    <div key={phone.id} style={{margin: 10}}>
        <Card className={classes.root} elevation={10}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={phone.photo}
              title="Miras Safadi"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {phone.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {phone.description}
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
        {phones}
    </div>
  );
}


export default withRouter(Phones);