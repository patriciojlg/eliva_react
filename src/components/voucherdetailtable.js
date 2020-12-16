import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
export default function DetalleVoucher({ voucherid, rutempresa }) {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
    }
  }));

  const [cuentascontables, setCuentascontables] = React.useState([])

  const postVoucher = () => {
    Axios.get("http://54.232.8.231/api/cuentas-contables/")
      .then(response => {
        setCuentascontables(response.data)
      })
  }
  React.useEffect(() => {
    postVoucher()
    console.log("ESTO ES POSTVOUCHER", cuentascontables)
  }, [])


  const stado = {
    columns: [
      {
        title: 'Debe', align: "left", field: 'debe', type: 'numeric', cellStyle: {
          width: 20,
          maxWidth: 20
        },
      },
      {
        title: 'Haber', align: "left", field: 'haber', type: 'numeric', cellStyle: {
          width: "10px",
          maxWidth: 10
        },
      },
      {
        title: 'Glosa', align: "left", field: 'glosa', cellStyle: {
          width: 20,
          maxWidth: 20
        },
      },
      {
        title: 'Cuenta contable', align: "left", field: 'cuentaContable', cellStyle: {
          width: 20,
          maxWidth: 20
        },
        editComponent: props => (
          <Autocomplete
            id="Agent Emails"
            size="small"
            options={cuentascontables}
            getOptionLabel={option => option.nombre}
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  label={props.value}
                  fullWidth
                />
              );
            }}
            onChange={e => props.onChange(e.target.innerText)}
          />
        )
        
      },
    ],
    data: [
    ],
  }

  //HOOKS

  const [detail_id, setDetail_id] = React.useState()
  const [detail, setDetail] = React.useState()
  const [rowsdetail, setRowsdetail] = React.useState(stado)
  const [saldo, setSaldo] = React.useState()
  //onChanges
  const [glosa, setGlosa] = React.useState()
  const [cuentacontable, setCuentacontable] = React.useState()
  const [debe, setDebe] = React.useState()
  const [haber, setHaber] = React.useState()
  const [refresh, setRefresh] = React.useState()
  //SNACK BAR
  const [messagesnack, setMessagesnack] = React.useState("")
  const [severitysnack, setSeveritysnack] = React.useState("info");
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    getVoucherDetail()
  }, [refresh, rutempresa, voucherid]);


  // CRUDS
  // C
  const postVoucherDetail = async (newData) => {
    const glosa = newData.glosa
    const debe = newData.debe
    const haber = newData.haber
    const cuentaContable = newData.cuentaContable
    const date = new Date()
    const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const data = {
      "fecha": date_iso,
      "rut": rutempresa,
      "id": voucherid,
      "debe": debe,
      "haber": haber,
      "glosa": glosa,
      "cuentaContable": cuentaContable
    }
    const api = await Axios.post("http://54.232.8.231/api/voucher-detail/", data);
    console.log(api.data, "RESP POST")
    setRefresh(!refresh)
  }
  // R
  const getVoucherDetail = async () => {
    console.log("esto es voucherid", voucherid)
    const data_params = { "id": voucherid, "rut": rutempresa }
    const api = await Axios.get("http://54.232.8.231/api/voucher-detail/", { params: data_params });
    const data = api.data;
    console.log(data, "data vou detail")
    data.forEach(function (element) {
      element.id = element.voucherId["$oid"]
      delete element.voucherId
    })
    setRowsdetail({ ...rowsdetail, data: data });
    //Calculando Saldo
    var debe = 0
    var haber = 0

    data.forEach(function(element){
      debe += element.debe
      haber += element.haber
    })
    setSaldo(haber - debe)
  }
  // U
  const updateVoucherDetail = async (newData) => {
    const detail_id = newData.id
    const debe = newData.debe
    const haber = newData.haber
    const glosa = newData.glosa
    const cuentacontable = newData.cuentaContable

    console.log("debe", debe)
    const data = { "id": voucherid, "id_detail": detail_id, "debe": debe, "haber": haber, "glosa": glosa, "cuentaContable": cuentacontable }
    const api = await Axios.put("http://54.232.8.231/api/voucher-detail/", data);
    console.log(api.data, "RESP PUT")
    setRefresh(!refresh)
  }
  // D
  const deleteVoucherDetail = async (oldData) => {
    console.log(oldData, "PARA ID DETAIL")
    const data_params = { "id": voucherid, "id_detail": oldData.id }
    const api = await Axios.delete("http://54.232.8.231/api/voucher-detail/", { params: data_params });
    const data = api.data;
    setRefresh(!refresh)
  }
  function control_ing_egr(newData) {
    if (newData["ingreso"] == null && newData["egreso"] == null) {
      showsnack("Debe registrar Ingreso o Egreso, no ambos", "error")
      return false
    }
    if (newData["ingreso"] > 0 && newData["egreso"] > 0) {
      showsnack("Es ingreso o egreso, no los dos", "error")
      return false
    }
    if (newData["ingreso"] < 0 || newData["egreso"] < 0) {
      // Piensa en positivo
      showsnack("Acá no se aceptar numeros negativos", "error")
      return false
    }

  }
  function snack_ok(message) {
    showsnack(message, "success")
  }



  function showsnack(message, severity) {
    //severities: error, warning, info, success
    setMessagesnack(message)
    setSeveritysnack(severity)
    setOpen(true)

  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const muestra_saldo = `Detalle del Voucher - Saldo ${saldo}`
  const classes = useStyles();
  return (
    <div>

      <MaterialTable style={{ width: "94.8%" }}
        title={muestra_saldo}
        columns={stado.columns}
        data={rowsdetail.data}

        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setRowsdetail((prevState) => {

                  const data = [...prevState.data];

                  data.push(newData);

                  console.log("add", newData)
                 
                  snack_ok("Registro agregado con éxito")
                  return { ...prevState, data };
                }, postVoucherDetail(newData));
              }, 800);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setRowsdetail((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    
                    console.log(newData)
                    snack_ok("Registro actualizado")
                    return { ...prevState, data };

                  },updateVoucherDetail(newData));
                }
              }, 800);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                console.log("se borra una fila")
                setRowsdetail((prevState) => {
                  const data = [...prevState.data];
                  var removed = data.splice(data.indexOf(oldData), 1);
                  console.log(removed[0])
                  snack_ok("Registro eliminado")
                  return { ...prevState, data };
                },deleteVoucherDetail(oldData));
              }, 800);
            }),
        }}
        className={classes.themeMarginTop} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severitysnack}>
          {messagesnack}
        </Alert>
      </Snackbar>
    </div>
  );
}