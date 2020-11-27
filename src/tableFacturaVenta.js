import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import get_facturas_venta from './providers/obtener_facturas_venta.js';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableFacturaVenta({rutempresa, date}) {
 
  const [facturaventalist, setFacturaventalist] = React.useState([])
  React.useEffect(() => {
    get_facturas_venta({rutempresa, date, setFacturaventalist})
 console.log("boleta list", facturaventalist)
 console.log("Esto es rut-empresa", rutempresa)

    },[rutempresa, date])



  const classes = useStyles();
 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>

            <TableCell align="right">Tipo Doc</TableCell>
            <TableCell align="right">Tipo Venta</TableCell>
            <TableCell align="right">Rut Cliente</TableCell>
            <TableCell align="right">Razón Social</TableCell>
            <TableCell align="right">Fecha Doc</TableCell>
            <TableCell align="right">Monto Exento</TableCell>
            <TableCell align="right">Monto Neto</TableCell>
            <TableCell align="right">Iva Recuperable</TableCell>
            <TableCell align="right">Monto Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facturaventalist.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="right">{row.TipoDoc}</TableCell>
              <TableCell align="right">{row.TipoVenta}</TableCell>
              <TableCell align="right">{row.Rutcliente}</TableCell>
              <TableCell align="right">{row.RazonSocial}</TableCell>
              <TableCell align="right">{row.FechaDocto}</TableCell>
              <TableCell align="right">{row.MontoExento}</TableCell>
              <TableCell align="right">{row.MontoNeto}</TableCell>
              <TableCell align="right">{row.MontoIVA}</TableCell>
              <TableCell align="right">{row.Montototal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}