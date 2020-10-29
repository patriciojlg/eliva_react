import React from 'react';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import YearMonthPicker from './date-picker';
import ComboBox from './combo-empresas';
import Container from '@material-ui/core/Container';
import  Grid  from '@material-ui/core/Grid';
import {makeStyles}  from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';


import {

  Link
} from "react-router-dom";
import { Card } from '@material-ui/core';


const useStyles = makeStyles(theme => ({

  backgroundMain: {
    background: "linear-gradient(180deg, rgba(88,88,221,1) 0%, rgba(255,255,255,1) 49%)",
  },
 
  breadcrumbs: {
    height: "58px",
position: "relative",

backgroundColor: "white",
top: "8px",
zIndex: "99",
marginBottom: "20px",
  },
slug:{
  color: "gray",

 marginBottom: "5px",
},
span:{
  marginBottom: "5px",
  marginLeft: "0.8em",
color: "black",
},
iconBreadCrums:{
  fontSize: "1rem", 
  top: "0.1rem",
  position: "relative",
},
lessAnchorUnderLine: {
  textDecoration: "none",

}

}));




export default function SimpleBreadcrumbs({setEmpresa, empresalist, detalle}) {
  const classes = useStyles();
  const detalleIcon = {
    "BOLETAS VENTAS"     : <ReceiptIcon className={classes.iconBreadCrums}/>,
    "FACTURA VENTAS"    : <TrendingUpIcon className={classes.iconBreadCrums}/>,
    "FACTURA COMPRAS"   : <TransitEnterexitIcon className={classes.iconBreadCrums}/>,
    "BOLETAS HONORARIO" : <AccountBoxIcon className={classes.iconBreadCrums}/>,
  
   }
  return (
    <Container>
    <Card className={classes.breadcrumbs}>

    <Grid  container
    direction="row"
    justify="flex-end"
    alignItems="center" pacing={1}>
    <Grid item xs={12} sm={6} md={8}>
  <p className={classes.span}> <span><Icon className={classes.iconBreadCrums}>home</Icon>   <Link className={classes.lessAnchorUnderLine} to="/">PRINCIPAL</Link> /</span> <span className={classes.slug}>{detalleIcon[detalle]} {detalle}</span></p>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
      <YearMonthPicker />
      </Grid>
      <Grid item  xs={12} sm={6} md={2}>
      { (empresalist !== "")? <ComboBox empresalist={empresalist} setEmpresa={setEmpresa} /> : <div></div> }
      
      </Grid>
      </Grid>

      </Card>
            </Container>
  );
}