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
import get_facturas_compra from '../providers/obtener_facturas_compras';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
  h2: {
    color: "orange",
    marginLeft: "13px",

  },
  p: {
    marginLeft: "13px",
    color: "gray",
  }
});


export default function SyncTable({ iut, ppm, getData, date, rutempresa }) {
  const [complete_bh, setComplete_bh] = React.useState()
  const [complete_dte_compra, setComplete_dte_compra] = React.useState()
  const [dtecpercent, setDtecpercent] = React.useState(0);
  const [dtevpercent, setDtevpercent] = React.useState(0);
  const [actualizando, setActualizando] = React.useState(false);
  const [pendientedtec, setPendientedtec] = React.useState([]);
  React.useEffect(() => {
    function month_zero() {
      const month2mod = date.getMonth()
      if (String(month2mod).length < 2) {
        return `0${month2mod + 1}`;
      } else {
        return month2mod + 1;
      }
    }
    function percent_dtec() {
      const fecha = new Date()
      const month = month_zero(fecha);
      const date_iso = `01/${month}/${fecha.getFullYear()}`
      const data_params = { "fecha": date_iso, "rut": rutempresa, "doc": "dtec", "anual": true }
      var total_month = 0;
      Axios.get("http://54.232.8.231/api/control-rpa/", { params: data_params })
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            const data = response.data
            const total_month = data.length
            const closeds = data.filter((element) => element["cerrado"] === true)
            const percent = closeds.length * 100 / total_month
            console.log(percent, closeds.length, total_month, "percent dtec")
            setDtecpercent(percent)

            // Meses pendientes de cerrar
            const pending = data.filter((element) => element["cerrado"] === false)
            setPendientedtec(pending)
            return null
          }
          else {
            return null
          }
        })
    }

    percent_dtec()

  }, [rutempresa, actualizando])
  const actualizar_dtec = async () => {
    if (actualizando === false) {
      setActualizando(true)
      console.log(pendientedtec, "PENDIENTE")
      await pendientedtec.forEach(async element => {

        var fecha = element["fecha"]
        const solo_fecha = fecha.split("T")[0];
        const [ano, mes, dia] = solo_fecha.split("-");
        const date_iso = `${dia}/${mes}/${ano}`
        const data = { "rut": rutempresa, "fecha": date_iso, "tipo": "compra" };
        await Axios.post(`http://54.232.8.231/api/dte-mes/`, data)

      });

      setActualizando(false)

    }

  }
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
                value={dtecpercent} />
            }</TableCell>
            <TableCell>
              <button onClick={(e) => actualizar_dtec(e)}>Sync</button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <p>Facturas de ventas</p>
            </TableCell>
            <TableCell>      {
              <LinearProgress
                variant="determinate"
                value={10} />
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
                value={30} />
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
                value={30} />
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

