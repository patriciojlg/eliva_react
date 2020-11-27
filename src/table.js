import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import get_facturas_compra from './providers/obtener_facturas_compras.js';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TableFacturaCompra({rutempresa, date}) {
 
  const [facturacompralist, setFacturacompralist] = React.useState([])
  React.useEffect(() => {
    get_facturas_compra({rutempresa, date, setFacturacompralist})
 console.log("boleta list", facturacompralist)
 console.log("Esto es rut-empresa", rutempresa)

    },[rutempresa, date])



  const classes = useStyles();
 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>

            <TableCell align="right">Tipo Doc</TableCell>
            <TableCell align="right">Tipo Compra</TableCell>
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
          {facturacompralist.map((row) => (
            <TableRow key={row._id}>
              <TableCell align="right">{row.TipoDoc}</TableCell>
              <TableCell align="right">{row.TipoCompra}</TableCell>
              <TableCell align="right">{row.RUTProveedor}</TableCell>
              <TableCell align="right">{row.RazonSocial}</TableCell>
              <TableCell align="right">{row.FechaDocto}</TableCell>
              <TableCell align="right">{row.MontoExento}</TableCell>
              <TableCell align="right">{row.MontoNeto}</TableCell>
              <TableCell align="right">{row.MontoIVARecuperable}</TableCell>
              <TableCell align="right">{row.MontoTotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}