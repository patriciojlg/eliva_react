import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import get_boletas_h from './providers/obtener_boletas.js';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(N, Estado, Fecha, Rut, NombreoRazonSocial, SocProf, Brutos, Retenido, Pagado) {
  return {N, Estado, Fecha, Rut, NombreoRazonSocial, SocProf, Brutos, Retenido, Pagado};}


export default function TableBoletaH({rutempresa, date}) {
 
  const [boletalist, setBoletalist] = React.useState([])



  React.useEffect(() => {

  
 get_boletas_h({setBoletalist, rutempresa, date})
 console.log("boleta list", boletalist)
 console.log("Esto es rut-empresa", rutempresa)

    },[rutempresa, date])



  const classes = useStyles();
 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nro</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Rut</TableCell>
            <TableCell align="right">Razón Social</TableCell>
            <TableCell align="right">Sociedad Profesional</TableCell>
            <TableCell align="right">Brutos</TableCell>
            <TableCell align="right">Retenido</TableCell>
            <TableCell align="right">Pagado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boletalist.map((row) => (
            <TableRow key={row.N}>
              <TableCell align="right">{row.N}</TableCell>
              <TableCell align="right">{row.Estado}</TableCell>
              <TableCell align="right">{row.Fecha}</TableCell>
              <TableCell align="right">{row.Rut}</TableCell>
              <TableCell align="right">{row.NombreoRazonSocial}</TableCell>
              <TableCell align="right">{row.SocProf}</TableCell>
              <TableCell align="right">{row.Brutos}</TableCell>
              <TableCell align="right">{row.Retenido}</TableCell>
              <TableCell align="right">{row.Pagado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}