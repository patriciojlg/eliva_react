import React from 'react';
import MaterialTable, { MTableEditRow, MTableToolbar } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { Chip, Input, Snackbar, Switch, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import mask_cl_peso from '../util/chileanpesomask';

import Icon from '@material-ui/core/Icon';
import string_to_date from '../util/stringtofecha';
export default function DetalleVoucher({ voucherid, rutempresa }) {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
    },
    toolbar: {
      padding: "17px 0px 0px 16px",
    },
    chips: {
      color: "#596986",
      border: "1px solid #596986",
      marginRight: "10px",
    },
    panelchips: {
      margin: "-50px 10px 22px 10px",
    }
  })
  );

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation()
    }
  }

  const [calculardebe, setCalculardebe] = React.useState()
  const [calcularhaber, setCalcularhaber] = React.useState()
  const [debeError, setDebeerror] = React.useState({
    error: false,
    label: "",
    helperText: "Ta malo po",
    validateInput: false
  });
  const [errorhaber, setErrorhaber] = React.useState({
    error: false,
    label: "",
    helperText: "Ta malo po",
    validateInput: false
  });
  function validador_debe(data) {

    if (data.debe == undefined) {
      return { isValid: false, helperText: 'Error en blanco' }
    }
    if (isNaN(data.debe)) {
      return { isValid: false, helperText: 'Error en blanco' }
    }
    if (data.debe == null) {
      return { isValid: false, helperText: 'Valor mínimo es 0' }
    }
    if (data.debe > 0 && data.haber > 0) {
      return { isValid: false, helperText: 'Debe o haber, no ambos' }
    }
    if (data.debe === 0 && data.haber === 0) {
      return { isValid: false, helperText: 'Debe o haber, debe contener algun valor' }
    }
    if (data.debe === null && data.haber === null) {
      return { isValid: false, helperText: 'Debe o haber, debe contener algun valor' }
    }
    if (data.debe < 0) {
      return { isValid: false, helperText: 'Solo valores de 0 en adelante' }
    }
    return true
  }
  function validador_haber(data) {
    if (data.debe == undefined) {
      return { isValid: false, helperText: 'Error en blanco' }
    }
    if (data.haber == undefined) {
      return { isValid: false, helperText: 'Error en blanco' }
    }
    if (isNaN(data.haber)) {
      return { isValid: false, helperText: 'Error en blanco' }
    }
    if (data.haber == null) {
      return { isValid: false, helperText: 'Valor mínimo es 0' }
    }
    if (data.debe === 0 && data.haber === 0) {
      return { isValid: false, helperText: 'Debe o haber, debe contener algun valor' }
    }
    if (data.haber == null) {
      return { isValid: false, helperText: 'Valor mínimo es 0' }
    }
    if (data.debe > 0 && data.haber > 0) {
      return { isValid: false, helperText: 'Debe o haber, no ambos' }
    }
    if (data.haber < 0) {
      return { isValid: false, helperText: 'Solo valores de 0 en adelante' }
    }
    return true
  }
  function validador_glosa(data) {

    if (data.glosa === "") {
      return { isValid: false, helperText: 'Falta rellenar el campo glosa' }
    }
    if (data.glosa == null) {
      return { isValid: false, helperText: 'Falta rellenar el campo glosa' }
    }
    return true
  }


  const stado = {
    columns: [
      {
        title: 'Debe', align: "left",
        field: 'debe', initialEditValue: calculardebe, type: 'numeric', cellStyle: {
          width: 20,
          maxWidth: 20
        },

        validate: rowData => validador_debe(rowData),
        render: rowData => mask_cl_peso(rowData.debe),
      },
      {
        title: 'Haber', align: "left", field: 'haber', type: 'numeric', initialEditValue: calcularhaber, cellStyle: {
          width: "10px",
          maxWidth: 10,
        },
        render: rowData => mask_cl_peso(rowData.haber),
        validate: rowData => validador_haber(rowData),
      },
      {
        title: 'Glosa', align: "left", field: 'glosa', cellStyle: {
          width: 20,
          maxWidth: 20
        },
        validate: rowData => validador_glosa(rowData),
      },
      {
        title: 'Cuenta contable',
        align: "left", field: 'cuentaContable', cellStyle: { width: "38%" },

        editComponent: props => (
          <Autocomplete
            id="Agent Emails"
            size="small"
            options={cuentascontables}
            getOptionLabel={option => option.nombre}
            renderInput={params => {
              if (props.value == null || props.value === undefined || props.value === "") {
                return <TextField    {...params}
                  variant="outlined"
                  label={props.value}
                  fullWidth error />
              }
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

  // VARIABLES

  //HOOKS


  const [rowsdetail, setRowsdetail] = React.useState(stado)
  const [saldo, setSaldo] = React.useState()
  const [debetotal, setDebetotal] = React.useState()
  const [habertotal, setHabertotal] = React.useState()
  //onChanges

  const [refresh, setRefresh] = React.useState()
  const [cerrado, setCerrado] = React.useState(null)
  const [fecha, setFecha] = React.useState()





  // CRUDS

  // CREATE

  const postVoucherDetail = async (newData) => {
    const glosa = newData.glosa
    const debe = newData.debe
    const haber = newData.haber
    const cuentaContable = newData.cuentaContable
    const date = new Date()
    const date_iso = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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

  // READ

  const getVoucherDetail = async () => {
    console.log("esto es voucherid", voucherid)
    const data_params = { "id": voucherid, "rut": rutempresa }
    const api = await Axios.get("http://54.232.8.231/api/voucher-detail/", { params: data_params });
    const data = await api.data[0].detail;
    const status_cerrado = await api.data[0].cerrado;
    const fecha = await api.data[0].timestamp;

    setCerrado(status_cerrado)
    setFecha(string_to_date(fecha))
    console.log(data, "data vou detail")


    calculartotales(data)

    // Enmascarando valores

    data.forEach(function (element) {
      console.log(element, "TIENE ID?")
      element.id = element.voucherId
      delete element.voucherId


    })
    setRowsdetail({ ...rowsdetail, data: data });
  }

  // UPDATE

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

  // DELETE

  const deleteVoucherDetail = async (oldData) => {
    console.log(oldData, "PARA ID DETAIL")
    const data_params = { "id": voucherid, "id_detail": oldData.id }
    const api = await Axios.delete("http://54.232.8.231/api/voucher-detail/", { params: data_params });
    const data = api.data;
    setRefresh(!refresh)
  }




  // UTILS
  const muestra_saldo = `Saldo ${saldo}`
  const muestra_debe_total = `Total debe: ${debetotal}`
  const muestra_haber_total = `Total haber: ${habertotal}`
  const muestra_fecha = `Fecha Voucher: ${fecha}`
  const calculartotales = (data_asientos) => {

    var debe = 0;
    var haber = 0;
    if (data_asientos) {
      data_asientos.forEach((elemento) => {
        if (elemento.debe == null) { elemento.debe = 0 }
        if (elemento.haber == null) { elemento.debe = 0 }
        debe += parseInt(elemento.debe)
        haber += parseInt(elemento.haber)
      })
    }
    setDebetotal(mask_cl_peso(debe))
    setHabertotal(mask_cl_peso(haber))
    var pendiente = parseInt(haber) - parseInt(debe)
    console.log(debe, "haber")
    setSaldo(mask_cl_peso(haber - debe))

    if (pendiente >= 0) {
      setCalculardebe(Math.abs(pendiente))
      setCalcularhaber(0)
    }
    else {
      setCalculardebe(0)
      setCalcularhaber(Math.abs(pendiente))
    }
  }

  const [cuentascontables, setCuentascontables] = React.useState([])

  const getVoucher = () => {
    Axios.get("http://54.232.8.231/api/cuentas-contables/")
      .then(response => {
        setCuentascontables(response.data)
      })
  }


  React.useEffect(() => {

    getVoucher()
    console.log("ESTO ES POSTVOUCHER", cuentascontables)
  }, [])





  //SNACK BAR
  const [messagesnack, setMessagesnack] = React.useState("")
  const [severitysnack, setSeveritysnack] = React.useState("info");
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    getVoucherDetail()

  }, [refresh, rutempresa, voucherid]);


  const updateCerrado = async (event) => {

    event.preventDefault()
    if (cerrado === false && saldo != "0") {
      return
    }
    if (debetotal == 0 || habertotal == 0) {
      return

    }
    setCerrado(event.target.checked)
    const id = voucherid
    console.log(event.target.checked, "esto es event switch")
    const data = { "id": id, "cerrado": event.target.checked }
    const api = await Axios.put("http://54.232.8.231/api/vouchers/", data);
    setRefresh(!refresh)
    return null
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
  // Validadores

  const validadorDebe = (data_row) => {
    if (!data_row.debe) {
      console.log(data_row.debe, "Errror sin debe")
      setDebeerror({
        error: true,
        label: "Requerido",
        helperText: "Faltó rellenar este campo",
        validateInput: true
      });
      return false
    }
    if (typeof data_row.debe !== "number" && data_row.debe !== "0") {
      console.log(data_row.debe, "No numerico")
      setDebeerror({
        error: true,
        label: "Requerido",
        helperText: "Debe ser un número",
        validateInput: true
      });
      return false
    }
    if (typeof data_row.debe > 0 && data_row.haber > 0) {
      console.log(data_row.debe, "Ambos mayores a 0")
      setDebeerror({
        error: true,
        label: "Requerido",
        helperText: "Debe o haber, no ambos.",
        validateInput: true
      });
      return false
    }
    setDebeerror({
      error: false,
      label: "",
      helperText: "",
      validateInput: false
    });
    return true
  }


  const classes = useStyles();
  return (
    <div>
      <span>Cerrar Voucher  </span>
      <Switch
        onChange={(e) => updateCerrado(e)}
        checked={cerrado}
        name="checkedB"
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />

      <MaterialTable
        onKeyDown={e => handleKey(e)}
        options={{
          headerStyle: { position: 'sticky', top: 0 },
          maxBodyHeight: 500,
          showTitle: false,
          search: false,
        }}
        style={{ width: "94.8%" }}
        title={muestra_saldo}
        columns={stado.columns}
        data={rowsdetail.data}
        components={{

          EditRow: (props) => <MTableEditRow {...props} onKeyDown={(e) => {
            if (e.keyCode === 27) {
              props.onEditingCanceled(props.mode, props.data)
            }
          }} />,

          Toolbar: props => (<div><div className={classes.toolbar}>
            <MTableToolbar {...props} /></div>
            <div className={classes.panelchips}>
              <Chip className={classes.chips} variant="outlined" label={muestra_fecha} color="secondary" icon={<Icon>event</Icon>} />
              <Chip className={classes.chips} variant="outlined" label={muestra_saldo} color="secondary" icon={<Icon>pending</Icon>} />
              <Chip className={classes.chips} variant="outlined" label={muestra_debe_total} color="secondary" icon={<Icon>trending_down</Icon>} />
              <Chip className={classes.chips} variant="outlined" label={muestra_haber_total} color="secondary" icon={<Icon>trending_up</Icon>} />
            </div>
          </div>
          )

        }}
        localization={{
          header: {
            actions: "Acciones"
          },
          toolbar: {
            searchPlaceholder: "Buscar"
          },
          pagination: {
            labelRowsSelect: "Registros",
            labelRowsPerPage: "Registros por página",
            firstAriaLabel: "Primera página",
            firstTooltip: "Primera página",
            previousAriaLabel: "Página anterior",
            previousTooltip: "Página anterior",
            nextAriaLabel: "Siguiente página",
            nextTooltip: "Siguiente página",
            lastAriaLabel: "Última página",
            lastTooltip: "Última página",

          },

          body: {
            addTooltip: "Agregar",
            deleteTooltip: "Borrar fila",
            editTooltip: "Editar",

            editRow: {
              deleteText: "¿De verdad quieres borrar esta fila?",
              cancelTooltip: "No",
              saveTooltip: "Sí"
            }

          }
        }}

        editable={!cerrado ? {
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.submitted = true;
                if (validador_debe(newData) !== true ||
                  validador_haber(newData) !== true ||
                  validador_glosa(newData) !== true) {
                  reject()
                }

                if (newData.cuentaContable == null || newData.cuentaContable === undefined || newData.cuentaContable === "") { reject() }
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
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
                console.log(newData.debe, "debe", newData.haber, "haber")
                if (newData.debe === newData.haber) { reject() }
                if (validador_debe(newData) !== true ||
                  validador_haber(newData) !== true ||
                  validador_glosa(newData) !== true) {
                  reject()
                }

                if (newData.cuentaContable == null || newData.cuentaContable === "") { reject() }
                resolve();
                if (oldData) {
                  setRowsdetail((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;

                    console.log(newData)
                    snack_ok("Registro actualizado")
                    return { ...prevState, data };

                  }, updateVoucherDetail(newData));
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
                }, deleteVoucherDetail(oldData));
              }, 800);
            }),
        } : {}}
        className={classes.themeMarginTop} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severitysnack}>
          {messagesnack}
        </Alert>
      </Snackbar>
    </div>
  );
}