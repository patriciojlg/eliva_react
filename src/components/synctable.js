import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
  h2:{
    color: "orange",
    marginLeft: "13px",

  },
  p:{
    marginLeft: "13px",
    color: "gray",
  }
});


export default function SyncTable({iut, ppm, getData, date, rutempresa}) {
  const [complete_bh, setComplete_bh] = React.useState()
  const [complete_dte_compra, setComplete_dte_compra] = React.useState()
var data = '';
var config = {
  method: 'get',
  url: 'http://18.230.199.98/api/bh/',
  headers: {
  },
  data: data
};

console.log(date, "Esto es DATE desde syncronizador")
console.log(rutempresa, "Esto rut desde syncronizador")

React.useEffect(() => {
  Axios(config)
    .then(function (response) {
      setComplete_bh(response.data);

    })
    .catch(function (error) {
  
      console.log(error);
    });
  },ppm)

  const classes = useStyles();

  return (
<Card>
<h2>Actualizador de documentos SII</h2>
<Table>

<TableHead>
  <TableRow>
    <TableCell>Documento</TableCell>
    <TableCell>% Actualizado</TableCell>
    <TableCell>Actualizar</TableCell>
  </TableRow>
</TableHead>
<TableBody>
    <TableRow>
      <TableCell component="th" scope="row">
     <p>Facturas de compra</p>
      </TableCell>
      <TableCell>      {
          <LinearProgress
            variant="determinate"
            value={30}/>
        }</TableCell>
      <TableCell>
  <button>Sync</button>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell component="th" scope="row">
     <p>Facturas de ventas</p>
      </TableCell>
      <TableCell>      {
          <LinearProgress
            variant="determinate"
            value={10}/>
        }</TableCell>
      <TableCell>
  <button>Sync</button>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell component="th" scope="row">
     <p>Boletas de honorarios</p>
      </TableCell>
      <TableCell>      {
          <LinearProgress
            variant="determinate"
            value={30}/>
        }</TableCell>
      <TableCell>
  <button>Sync</button>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell component="th" scope="row">
     <p>Boletas de ventas</p>
      </TableCell>
      <TableCell>      {
          <LinearProgress
            variant="determinate"
            value={30}/>
        }</TableCell>
      <TableCell>
  <button>Sync</button>
      </TableCell>
    </TableRow>
</TableBody>
</Table>
</Card>
  );
}

