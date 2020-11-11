import React from 'react';
import {Line} from 'react-chartjs-2';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const boletas_venta = "rgb(63, 81, 181)";
const facturas_venta = 'rgb(156, 39, 176)';
const facturas_compra = 'rgb(244, 67, 54)';
const boletas_honorario = 'rgb(255, 215, 64)';

export default function History({getData}){
  const useStyles = makeStyles(theme => ({
    title2: {
      marginTop: "0.3em !important",
      marginBottom: "0.3em !important",
      color: "#2ab3a6",
      marginLeft: "0.3em",
      },
      p2:{
        marginLeft: "0.5em",
        color: "gray",
        marginBottom: "0.3em !important",
      }
 
  }));
  const h_boletas_honorario = getData("historicos", "boletas_honorario")
  const facturas_venta = getData("historicos", "facturas_ventas")
  const facturas_compras = getData("historicos", "facturas_compras")
  const boletas_ventas = getData("historicos", "boletas_ventas")
  
  const data = 
  {labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
  datasets: [
    {
      label: 'Boletas honorario',
      fill: false,
      lineTension: 0.3,
      backgroundColor: '#ffd740',
      borderColor: '#ffd740',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.5,
      borderJoinStyle: 'miter',
      pointBorderColor: '#ffd740',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ffd740',
      pointHoverBorderColor: '#ffd740',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      //getData("historicos", "boletas_honorario")
      data: [h_boletas_honorario.actual,
             h_boletas_honorario.uno_anterior,
             h_boletas_honorario.dos_anterior,
             h_boletas_honorario.tres_anterior,
             h_boletas_honorario.cuatro_anterior,
             h_boletas_honorario.cinco_anterior,
             h_boletas_honorario.seis_anterior]
    },
    {
      label: 'Facturas de ventas',
      fill: false,
      lineTension: 0.2,
      
      backgroundColor: facturas_venta,
      borderColor: facturas_venta,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: facturas_venta,
      pointBackgroundColor: facturas_venta,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: facturas_venta,
      pointHoverBorderColor: facturas_venta,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [facturas_venta.actual,
        facturas_venta.uno_anterior,
        facturas_venta.dos_anterior,
        facturas_venta.tres_anterior,
        facturas_venta.cuatro_anterior,
        facturas_venta.cinco_anterior,
        facturas_venta.seis_anterior]
    },
    {
      label: 'Facturas de compra',
      fill: false,
      lineTension: 0.3 ,
      
      backgroundColor: facturas_compra,
      borderColor: facturas_compra,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: facturas_compra,
      pointBackgroundColor: facturas_compra,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: facturas_compra,
      pointHoverBorderColor: facturas_compra,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        facturas_compras.actual,
        facturas_compras.uno_anterior,
        facturas_compras.dos_anterior,
        facturas_compras.tres_anterior,
        facturas_compras.cuatro_anterior,
        facturas_compras.cinco_anterior,
        facturas_compras.seis_anterior]
    },
    {
      label: 'Boletas de venta',
      fill: false,
      lineTension: 0.3,
      
      backgroundColor: boletas_venta,
      borderColor: boletas_venta,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: boletas_venta,
      pointBackgroundColor: boletas_venta,
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: boletas_venta,
      pointHoverBorderColor: boletas_venta,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        boletas_ventas.actual,
        boletas_ventas.uno_anterior,
        boletas_ventas.dos_anterior,
        boletas_ventas.tres_anterior,
        boletas_ventas.cuatro_anterior,
        boletas_ventas.cinco_anterior,
        boletas_ventas.seis_anterior]
    },
   
  ]
    
};
  const classes = useStyles();
    return (
        <Card> 
          <h2 className={classes.title2}>Resumen documentos tributarios</h2>
          <p className={classes.p2}>Últimos 7 meses</p>
        <Line  width={100}
   height={20}
   
   data={data} />
   </Card>
    );
  
};