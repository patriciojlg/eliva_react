import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Boletas Venta', 159000, ),
  createData('Facturas de Venta', 237, ),
  createData('Facturas Compra', -262),
  createData('Boletas Honorario', -305, ),
  createData('Caja Chica', 356, ),
  createData('PPM', 356, ),
  createData('Impuesto único trabajador', 356, ),
];

export default function ResumeTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <h2 className={classes.h2}>Detalle del formulario f29</h2>
      <p className={classes.p}>Resumen del mes</p>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>F29 Resumen mensual</TableCell>
            <TableCell align="right">I.V.A. a pagar</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}