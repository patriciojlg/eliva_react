import React from 'react';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import YearMonthPicker from './date-picker';
import ComboBox from './combo-empresas';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import {

  Link
} from "react-router-dom";
import { Card } from '@material-ui/core';


const useStyles = makeStyles(theme => ({

  backgroundMain: {
    background: "linear-gradient(180deg, rgba(88,88,221,1) 0%, rgba(255,255,255,1) 49%)",
  },
  periodo:{
    marginLeft: "10px",
  },
  breadcrumbs: {
    height: "80px",
    position: "relative",

    backgroundColor: "white",
    top: "8px",
    zIndex: "99",
    marginBottom: "20px",
  },
  colButtonSii:{
    textAlign: "right",
    paddingRight: "10px",
  },
  butonSii: {

    marginTop: "20px",
  },
  slug: {
    color: "gray",

    marginBottom: "7px",
  },
  span: {
    marginBottom: "5px",
    marginLeft: "0.8em",
    color: "black",
  },
  iconBreadCrums: {
    fontSize: "1rem",
    top: "0.1rem",
    position: "relative",
  },
  lessAnchorUnderLine: {
    textDecoration: "none",

  }

}));




export default function SimpleBreadcrumbs({setEmpresa, setRutempresa, empresalist, date, setDate, detalle }) {
  const classes = useStyles();
  const detalleIcon = {
    "BOLETAS VENTAS": <ReceiptIcon className={classes.iconBreadCrums} />,
    "FACTURA VENTAS": <TrendingUpIcon className={classes.iconBreadCrums} />,
    "FACTURA COMPRAS": <TransitEnterexitIcon className={classes.iconBreadCrums} />,
    "BOLETAS HONORARIO": <AccountBoxIcon className={classes.iconBreadCrums} />,
  }
  return (
    <Container>
      <Card className={classes.breadcrumbs}>

        <Grid container
          direction="row"
          justify="flex-end"
          alignItems="center" pacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <p className={classes.span}> <span><Icon className={classes.iconBreadCrums}>home</Icon>   <Link className={classes.lessAnchorUnderLine} to="/">PRINCIPAL</Link> /</span> <span className={classes.slug}>{detalleIcon[detalle]} {detalle}</span></p>
          </Grid>
          <Grid className={classes.colButtonSii} item xs={12} sm={12} md={3}>
            <Button variant="outlined" className={classes.butonSii} color="primary">
              Actualizar desde sii
</Button>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            {(empresalist !== "") ? <ComboBox empresalist={empresalist} setRutempresa={setRutempresa} setEmpresa={setEmpresa} /> : <div></div>}

          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <YearMonthPicker date={date} setDate={setDate}  className={classes.periodo}/>
          </Grid>

        </Grid>

      </Card>
    </Container>
  );
}