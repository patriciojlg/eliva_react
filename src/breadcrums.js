import React from 'react';

import YearMonthPicker from './date-picker';
import ComboBox from './combo-empresas';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import Axios from 'axios';
import pull_rpa from './controllers/pull_rpa.js'

import {
  useLocation,
  Link
} from "react-router-dom";
import { Card } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  mescerrado_chip:{
    marginTop: "22px",
    marginRight: "10px",
  },
  backgroundMain: {
    background: "linear-gradient(180deg, rgba(88,88,221,1) 0%, rgba(255,255,255,1) 49%)",
  },
  periodo: {
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
  colButtonSii: {
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




export default function SimpleBreadcrumbs({ setMessagemodal, setTitlemodal, setEmpresa, setLoading, rutempresa, setRutempresa, empresalist, date, setDate, detalle }) {
  const [closed, setClosed] = React.useState(false);

  React.useEffect(() => {

    function month_zero() {
      const month2mod = date.getMonth() 
      if (String(month2mod).length < 2) {
        return `0${month2mod + 1}`;
      } else {
        return month2mod+1;
      }
    }
    function buton_or_chips() {
      const month = month_zero(date);
      const date_iso = `01/${month}/${date.getFullYear()}`
      const data_params = { "fecha": date_iso, "rut": rutempresa, "doc": "dtec" }
      Axios.get("http://54.232.8.231/api/control-rpa/", { params: data_params })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            if (response.data["cerrado"] == true) {
              setClosed(true)
            }
            else {
              setClosed(false)
            }
          }
          else {
            //notificacion erro al solicitar las boletas para este periodo
          }
        })
    }
    buton_or_chips() 
    const x = closed;
  }, [rutempresa, date])


  const classes = useStyles();


  function show_breadcrums(){

    const menu = [
       {nombre: "Principal",
      url: "/",
      icon:"home"},     
      {nombre: "Boletas honorario",
      url: "/boletas-honorario",
      icon: "account_box"},
      {nombre: "Boletas de venta",
      url: "/boletas-ventas",
      icon: "receipt"},
      {nombre: "Facturas de compra",
      url: "/facturas-compras",
      icon: "transit_enterexit"},
      {nombre: "Facturas de venta",
      url: "/facturas-ventas",
      icon: "trending_up"},
  
      {
        nombre: "Caja chica",
        url: "/caja-chica",
        icon: "swap_vert"
      },
      {
        nombre: "Voucher-contable",
        url: "/voucher-contable",
        icon: "exposure"
      },
      {
        nombre: "Administrador",
        url: "/administrador",
        icon: "settings"
      }]
      const slug = window.location.pathname;
      const url_actual = menu.filter(path => path.url === slug);
      console.log({...url_actual}, "ESTE ES SLUG")
      return url_actual[0]

    }
    const [breadcrum, setBreadcrum] = React.useState({nombre: "Principal",
    url: "/",
    icon:"home"}, )

    const location = useLocation();
    React.useEffect(()=>{
      setBreadcrum(show_breadcrums())
    },[location])



  return (
    <Container>
      <Card className={classes.breadcrumbs}>

        <Grid container
          direction="row"
          justify="flex-end"
          alignItems="center" pacing={1}>
          <Grid item xs={12} sm={6} md={3}>
          <p className={classes.span}> <span><Icon className={classes.iconBreadCrums}>home</Icon>   <Link className={classes.lessAnchorUnderLine} to="/">PRINCIPAL</Link> /</span> 
      <span className={classes.slug}><Icon className={classes.iconBreadCrums}>{breadcrum.icon}</Icon> {breadcrum.nombre}</span></p>

          </Grid>
          <Grid className={classes.colButtonSii} item xs={12} sm={12} md={3}>
         
         {(closed === true)? <Chip
        avatar={<Avatar>{<DoneIcon />}</Avatar>}
        label="Mes cerrado"
        className={classes.mescerrado_chip}
        clickable
        color="primary"
        onDelete=""
        deleteIcon={<DoneIcon />}
        variant="outlined"
      /> :
            <Button variant="outlined" onClick={((e) => pull_rpa({ setMessagemodal, setTitlemodal, date, setLoading, rutempresa, setRutempresa }))} className={classes.butonSii} color="primary">
              Actualizar desde sii
</Button>}
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            {(empresalist !== "") ? <ComboBox empresalist={empresalist} setRutempresa={setRutempresa} setEmpresa={setEmpresa} /> : <div></div>}

          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <YearMonthPicker date={date} setDate={setDate} className={classes.periodo} />
          </Grid>

        </Grid>

      </Card>
    </Container>
  );
}