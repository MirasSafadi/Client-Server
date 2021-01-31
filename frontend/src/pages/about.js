import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const img = require.context('../assets/', false);
const miras = 'Miras.jpeg';
const jeries = 'jeries.jpg';

const styles = {
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop:'30'
    }
};

export default function About() {
  const classes = useStyles();

  return (
    <div className="d-flex align-content-center flex-wrap justify-content-center">
        <div style={{margin: 10}}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={require('../assets/Miras.jpeg')}
                  style={styles.media}
                //   image={img(`./${miras}`)}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Miras Safadi
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    A software engineer with passion to code and seek new knowledge
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" >
                  Email me
                </Button>
              </CardActions>
            </Card>
        </div>
        <div style={{margin: 10}}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  style={{ height: 0, paddingTop: '56%'}}
                  image={img(`./${jeries}`)}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Jeries Haddad
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    A software Developer at Nvidia with passion to code and 
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Email Me
                </Button>
              </CardActions>
            </Card>
        </div>
    </div>
  );
}
