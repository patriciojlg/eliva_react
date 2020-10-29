import React from 'react';
import {Line} from 'react-chartjs-2';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const boletas_venta = "rgb(63, 81, 181)";
const facturas_venta = 'rgb(156, 39, 176)';
const facturas_compra = 'rgb(244, 67, 54)';
const boletas_honorario = 'rgb(255, 215, 64)';

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
        data: [65, 59, 80, 81, 56, 55, 40]
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
        data: [65, 59, 80, 83, 56, 55, 40].reverse()
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
        data: [35, 29, 40, 43, 26, 25, 20]
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
        data: [35, 29, 40, 43, 26, 25, 20].reverse()
      },
     
    ]
      
};

export default function History(){
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