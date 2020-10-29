import React from 'react';
import DashBoardCard from './components/dashboardcard.js'
import Grid from "@material-ui/core/Grid";
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ResumeTable from './components/table_resume';
import ChartBar from './components/ChartBar.js';
import History from './components/history.js'
export default function Widgets({ setDetalle }) {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em",
      marginBottom: "1em"
    },
    lessAnchorUnderLine: {
      textDecoration: "none",

    }
  }));

  setDetalle("PRINCIPAL");
  function cambiarDetalle(nombre_detalle) {
    setDetalle(nombre_detalle);

  }

  const classes = useStyles();
  return (

    <Grid container className={classes.themeMarginTop} spacing={1}>

      <Grid item xs={12} sm={6} md={3}>

        <Link onClick={() => cambiarDetalle("BOLETAS VENTAS")} className={classes.lessAnchorUnderLine} to="/boletas-ventas">

          <DashBoardCard type="fill"
            title="BOLETAS DE VENTAS"
            value={250000}
            lastMonth={260000}
            icon={<ReceiptIcon />}

            colorIcon="rgb(63, 81, 181)" />

        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Link onClick={() => cambiarDetalle("FACTURA VENTAS")} className={classes.lessAnchorUnderLine} to="/facturas-ventas">

          <DashBoardCard type="fill"
            title="FACTURAS DE VENTAS"
            value={250000}
            lastMonth={260000}
            icon={<TrendingUpIcon />}
            colorIcon="#9c27b0" />


        </Link>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Link onClick={() => cambiarDetalle("FACTURA COMPRAS")} className={classes.lessAnchorUnderLine} to="/facturas-compras">

          <DashBoardCard type="fill"
            title="FACTURAS DE COMPRAS"
            value={250000}
            lastMonth={260000}
            icon={<TransitEnterexitIcon />}
            colorIcon="#f44336" />
        </Link>

      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Link onClick={() => cambiarDetalle("BOLETAS HONORARIO")} className={classes.lessAnchorUnderLine} to="/boletas-honorario">
          <DashBoardCard type="fill"
            title="BOLETAS HONORARIO"
            value={250000}
            lastMonth={260000}
            icon={<AccountBoxIcon />}
            colorIcon="#ffd740" />
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={7}>
        <ResumeTable />
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <ChartBar />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <History />
      </Grid>
    </Grid>

  );
}