import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Background from './images/drawer_bg.jpg';
const useStyles = makeStyles(theme => ({
  content: {
    color: "white",
    paddingBottom: theme.spacing(1) * 2
  },
  bg:{
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
  },
  avatar: {
    textAlign: "left",
    marginBottom: theme.spacing(1) * 2
  }
}));

const ProfileCard = ({ name, image, location, stats }) => {
  const classes = useStyles();
  return (
    <Card className={classes.bg}>
      <CardContent className={classNames(classes.content, 'px-0')}>
        <Grid
          container
          spacing={0}
          alignItems={'left'}
          direction={'row'}
         
        >
          <Grid item>
            <Avatar alt={name} src={image} className={classes.avatar} />
          </Grid>
       
        </Grid>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="caption">{location}</Typography>
      </CardContent>

    </Card>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.string,}

    export default ProfileCard;