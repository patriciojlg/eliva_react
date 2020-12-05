import React from 'react';

import Grid from "@material-ui/core/Grid";

import { makeStyles } from '@material-ui/core/styles';
import SyncTable from '../components/synctable.js'
import AgregarEmpresa from '../components/agregarEmpresa.js'
import MisEmpresas from '../components/misempresas.js' 
import ClientesProveedores from "../components/clientesyproveedores"



export default function Administrador({date, rutempresa}) {



  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em",
      marginBottom: "1em"
    },
    lessAnchorUnderLine: {
      textDecoration: "none",

    }
  }));



  const classes = useStyles();
  return (

    <Grid container className={classes.themeMarginTop} spacing={1}>
      <Grid item xs={12} sm={12} md={7}>
          <SyncTable date={date} rutempresa={rutempresa} />
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
     <AgregarEmpresa />
          </Grid>
          <Grid item xs={12} sm={5} md={6}>
            <MisEmpresas />
      </Grid>
      <Grid item xs={12} sm={7} md={6}>
            <ClientesProveedores />
      </Grid>
      </Grid>
     
)
}