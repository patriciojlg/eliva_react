import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import Grid from '@material-ui/core/Grid';
import BotoneraVaucher from './botonera_vaucher';
import { Icon, IconButton } from '@material-ui/core';
import Axios from 'axios';
const columns = [
  { field: 'idVoucher', headerName: 'Id Voucher', width: 180 },
  { field: 'cuentaContable', headerName: 'Cuenta contable', width: 230 },
  { field: 'glosa', headerName: 'Glosa', width: 230 },
  { field: 'debe', headerName: 'Debe', width: 230 },
  { field: 'haber', headerName: 'Haber', width: 230 },
];

const rows = [
  { id: 1, idVoucher: '330-2', cuentaContable: 'Compras y gastos', glosa: 'Artículos de oficina', debe: 200.000, haber: 0 },
];
const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  },
  root: {
    marginTop: "15px",

  },
  wrap_voucher: {
    marginTop: "10px",
    padding: "15px",
  },
  botoneraIcon: {
    textAlign: "right",

  }
}));
export default function DetalleVoucher({voucherid, rutempresa}) {
  const [detail, setDetail] = React.useState(null)
  const [rowsdetail, setRowsdetail] = React.useState(rows)
  //onChanges
  const [glosa, setGlosa] = React.useState()
  const [cuentacontable, setCuentacontable] = React.useState()
  const [debe, setDebe] = React.useState()
  const [haber, setHaber] = React.useState()
  const [refresh, setRefresh] = React.useState()
  //Utils
  function new_id(list_rows) {
    if (list_rows == null) {
      return 1

    }
    var list_id = []
    list_rows.forEach(element => {
      list_id.push(element.id)
    })
    const max_id = Math.max(...list_id)
    console.log(list_id, "ESTO ES MAX")
    return max_id + 1
  }
  function select_detail(row_data){
    setDetail(null);
    setDetail(...row_data);
    setGlosa(row_data.glosa)
    setCuentacontable(row_data.cuentaContable)
    setDebe(row_data.debe)
    setHaber(row_data.haber)
    console.log(row_data)

  }
  //CRUD
  function agregar_detail_row(e) {
    const new_row_detail = {
      id: new_id(rowsdetail),
      idVoucher: '330-2',
      cuentaContable: '',
      glosa: '',
      debe: 0,
      haber: 0
    }
    const newListRows = rowsdetail.concat({ ...new_row_detail })
    setRowsdetail(newListRows)
    console.log(newListRows)
  }
  function actualizar_detail_row(e) {
    return null
  }
  function eliminar_detail_row(e) {
    if (detail == null) {
      return null
    }
    const all_rows = rowsdetail;
    const less_deleted = all_rows.filter(function (ele) {
      return ele !== detail
    })

    setRowsdetail(less_deleted)

  }

  // CRUD
  
  // C
  const postVoucherDetail = async () => {
    const date = new Date()
    const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const data = { "fecha": date_iso, "rut": rutempresa, "id": voucherid }
    const api = await Axios.post("http://54.232.8.231/api/voucher-detail/", data);
    console.log(api.data,"RESP POST" )
    setRefresh(!refresh)
  }
  // R
  const getVoucherDetail = async () => {
    console.log("esto es voucherid", voucherid)
    const data_params = { "id": voucherid, "rut": rutempresa }
    const api = await Axios.get("http://54.232.8.231/api/voucher-detail/", { params: data_params });
    const data = api.data;
    console.log(data, "data vou detail")
    data.forEach(function(element){
      element.id = element.voucherId["$oid"]
      delete element.voucherId
    })
    setRowsdetail(data)
}
  // Update
const updateVoucherDetail = async () => {
  const data =  { "id": voucherid, "id_detail": detailid, "debe": debe, "haber":haber, "glosa":glosa, "cuentaContable":cuentacontable}
  const api = await Axios.put("http://54.232.8.231/api/voucher-detail/", data);
  console.log(api.data,"RESP POST" )
  setRefresh(!refresh)
}
  //Effect

  React.useEffect(() => {
    getVoucherDetail();
}, [voucherid, refresh])

  const classes = useStyles();
  return (
    <React.Fragment>
      <div style={{ padding: "10px", position: "relative", textAlign: "left" }}>
        <IconButton aria-label="crear" className={classes.margin} size="small">
          <Icon onClick={(e) => postVoucherDetail()} clickable color="primary">add_circle</Icon>
        </IconButton>
        <IconButton aria-label="borrar" className={classes.margin} size="small">
          <Icon onClick={(e) => eliminar_detail_row(e)} clickable color="primary">delete_circle</Icon>
        </IconButton>
      </div>

      <div style={{ height: 420, width: '94.7%' }}>
        <DataGrid disableMultipleSelection={true} rows={rowsdetail} columns={columns} pageSize={5}
          onSelectionChange={(newSelection) => {
            const row_data = rowsdetail.filter(row => row.id == newSelection.rowIds)
            select_detail(row_data)

          }} />
      </div>
      {(detail !== null) ?
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={2}>
            <TextField
              id="rut_empresa"
              defaultValue={detail.idVoucher}
              //onChange={}
              label="Rut empresa"
              className={classes.textField}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="folio"
              //onChange={}
              label="Folio"
              defaultValue={detail.cuentaContable}
              className={classes.textField}
              fullWidth
              margin="normal"
            /></Grid>
          <Grid item xs={2}>
            <TextField

              defaultValue={detail.glosa}
              id="fecha"
              //onChange={}
              label="Fecha"
              className={classes.textField}
              fullWidth
              margin="normal"
            /></Grid>
          <Grid item xs={2}>
            <TextField
              defaultValue={detail.debe}

              id="debe"
              label="Debe"
              //onChange={}
              className={classes.textField}
              fullWidth
              margin="normal"
            /></Grid>
          <Grid item xs={2}>
            <TextField

              defaultValue={detail.haber}
              id="haber"
              label="Haber"
              //onChange={}
              className={classes.textField}

              fullWidth
              margin="normal"
            /></Grid>
          <Grid item xs={2}>
            <TextField

              id="cerrado"
              label="Cerrado"
              defaultValue={detail.cerrado}
              //onChange={}
              className={classes.textField}

              fullWidth
              margin="normal"
            />
          </Grid>
          <Button onClick={(e)=>(updateVoucherDetail())}>Guardar </Button>
        </Grid>
        : <div></div>}
    </React.Fragment>
  );
}