import React from 'react';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

import test_session from '../providers/refresh';
import Axios from 'axios';
function createData(nombre, rut) {
  return { nombre, rut };
}
var data = '';
var config = {
  method: 'get',
  url: 'http://54.232.8.231/api/empresas/',
  headers: {
  },
  data: data
};
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  export default function MisEmpresas() {
    const [rows, setRows] = React.useState([])
React.useEffect(() => {
  Axios(config)
    .then(function (response) {
      const empresas = response.data
      const row_empresas = empresas.map(
        (empresa) => createData(empresa.nombre, empresa.rut)
      );
      setRows(row_empresas)
      console.log(rows, "aca rows");
    })
    .catch(function (error) {
      test_session() 
      console.log(error);
    });
  },MisEmpresas)
    const classes = useStyles();
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="left">Rut</TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.rut}>
                <TableCell  scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="left">{row.rut}</TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }