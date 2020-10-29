import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardActions from '@material-ui/core/CardActions';
const useStyles = makeStyles(theme => ({
  content: {
    position: 'relative',
    padding: theme.spacing(1) * 2,
    '&:last-child': {
      paddingBottom: theme.spacing(1) * 2
    }
  },
  wrapCard: {
    display: "block",
    width: "100%",
  },
  icon: {

    boxShadow: 'none',
    color: 'white'
  },
  footer: {
    color: "gray",
  },
  statUp: {
    fontSize: "17px",
    color: "green",
  },
  statDown: {
    fontSize: "17px",
    color: "red",
  },
  values: {
    textAlign: "left",
  },
  iconFloat: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    marginTop: '-20px',

    transform: 'rotate(-5deg)'
  },
  lightText: {
    fontWeight: "bold",
    textAlign: 'left',
    color: 'gray'
  }
}));

const DashBoardCard = ({ type, title, value, icon, colorIcon, lastMonth = 0 }) => {
  const classes = useStyles();
  const color = "white";
  let before = null;
  let after = null;
  let upArrow = "↑";
  let downArrow = "↓";


  const cardIcon = (
    <Grid item className={type === 'fill' ? classes.iconFloat : null}>
      <IconButton
        className={classes.icon}
        aria-label={title}
        style={{ backgroundColor: colorIcon }}
      >
        {icon}
      </IconButton>
    </Grid>
  );

  function calcular_porcentaje(value, lastMonth) {
    if (lastMonth <= value) {
      let delta = value - lastMonth;
      let percent = delta * 100 / lastMonth;
      return `${upArrow} ${percent.toFixed(1)}%`;
    }
    else {
      let delta = lastMonth - value;
      let percent = delta * 100 / lastMonth;
      return `${downArrow} ${percent.toFixed(1)}%`;
    }
  }

  if (icon) {
    type === 'fill' ? (after = cardIcon) : (before = cardIcon);
  }

  return (
    <ButtonBase className={classes.wrapCard}>
      <Card style={type === 'fill' ? { backgroundColor: color } : null}>

        <CardContent className={classes.content}>
          <Grid
            container
            alignItems={'center'}
            direction={'row'}
            justify={'flex-start'}>
            {before}
            <Grid item>
              <div className={type === 'fill' ? 'pr-1' : 'px-1'}>

                <Typography
                  variant="caption"
                  className={type === 'fill' ? classes.lightText : null}
                >
                  {title}
                </Typography>
                <Typography variant="h6" className={type === 'fill' ? classes.values : null}>
                  ${value}
                </Typography>
              </div>
            </Grid>
            {after}
          </Grid>
        </CardContent>
        <CardActions className={classes.footer}>
          <a size="small"> <span className={value >= lastMonth ? classes.statUp : classes.statDown}>
            {calcular_porcentaje(value, lastMonth)}</span> Respecto al mes anterior</a>
        </CardActions>
      </Card>
    </ButtonBase>
  );
};

DashBoardCard.propTypes = {
  type: PropTypes.oneOf(['fill']),
  title: PropTypes.string,
  value: PropTypes.number,
  icon: PropTypes.element,
  color: PropTypes.string,
  lastMonth: PropTypes.number
};

export default DashBoardCard;