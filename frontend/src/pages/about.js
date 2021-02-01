import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Miras from '../assets/Miras.png';
import jeries from '../assets/jeries.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



export default function About() {
  const classes = useStyles();

  return (
    <div style={{textAlign:'center'}}>
      <Typography variant="h2" component="h2" style={{color: 'white', fontFamily: 'cursive'}}>
        About us
      </Typography>
    <div className="d-flex align-content-center flex-wrap justify-content-center">
        
        <div style={{margin: 10}}>
            <Card className={classes.root} elevation={10}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Miras}
                  style={{ height: 400 }}
                  title="Miras Safadi"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Miras Safadi
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    A software engineer with passion to code and seek new knowledge.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() =>{ window.open('mailto:safadimiras@gmail.com')}}>
                  Email me
                </Button>
              </CardActions>
            </Card>
        </div>
        <div style={{margin: 10}}>
            <Card className={classes.root} elevation={10}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={jeries}
                  style={{ height: 400 }}
                  title="Jeries Haddad"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Jeries Haddad
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    A software Developer at Nvidia with passion to code and a thrive to be knowledgeful.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() =>{ window.open('mailto:jerieshaddad115@gmail.com')}}>
                  Email Me
                </Button>
              </CardActions>
            </Card>
        </div>
    </div>
    </div>
  );
}
