import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const data = {
  labels: ['Enero', 'Febreo', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
  datasets: [
    {
      label: 'Ingreso',
      backgroundColor: 'rgba(54, 218, 69, 0.6)',
      borderColor: 'rgba(54, 218, 69, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 218, 69, 1)',
      hoverBorderColor: 'rgba(54, 218, 69, 0.6)',
      data: [65, 59, 80, 81, 56, 55, 40]
    },

    {
        label: 'Egreso',
        backgroundColor: 'rgba(255,00,00,0.6)',
        borderColor: 'rgba(255,00,00,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,00,00,1)',
        hoverBorderColor: 'rgba(255,00,00,0.6)',
        data: [15, 90, 10, 20, 40, 55, 30]
      }
    ]
};

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  title2: {
    marginTop: "0.3em !important",
    marginBottom: "0.0em !important",
    color: "#8f2ab3",
    marginLeft: "0.3em",
    },
    p2:{
      marginLeft: "0.5em",
      color: "gray",
      marginBottom: "0.3em !important",
    }
});
export default function ChartBar(){
  const classes = useStyles();
    return (
        <Card>
      <div>
        <h2 className={classes.title2}>Caja Chica</h2>
        <p className={classes.p2}>Recuento últimos 7 meses</p>
        <Bar
          data={data}
          width={100}
          height={245}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
      </Card>
    );
  
};