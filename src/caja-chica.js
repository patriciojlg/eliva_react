import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import useSnackbar from './hooks/useSnackbar'
import { Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import mask_cl_peso from './util/chileanpesomask';
export default function CajaChica({ date, rutempresa }) {
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
      { title: 'Fecha', align: "left", field: 'fecha', type: 'date', },
      { title: 'Glosa', align: "left", field: 'glosa' },
      { title: 'Ingreso', align: "left", field: 'ingreso', type: 'numeric' },

      { title: 'Egreso', align: "left", field: 'egreso', type: 'numeric' },
      {
        title: 'Clasificacion', align: "left", cellStyle: { width: "38%" }, field: 'clasificacion', editComponent: props => (
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
            }} onChange={e => props.onChange(e.target.innerText)}
          />
        )
      }

    ],
    data: [
    ],
  }

  // HOOKS

  const [refresh, setRefresh] = React.useState(false);
  const [saldoalmes, setSaldoalmes] = React.useState(0);
  const [state, setState] = React.useState(stado);
  const [saldoanterior, setSaldoanterior] = React.useState();
  const [saldofinal, setSaldofinal] = React.useState();
  const [open, setOpen] = React.useState(false);

  // UTILS

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

  // CRUDS

  // C R E A T E

  function postAddRow(data) {
    const fecha_row = data["fecha"]
    if (typeof fecha_row.getDay === "function") {
      data["rut"] = rutempresa;
      console.log("ESTO ES FECHA", fecha_row)
      var date_parser
      date_parser = `0${fecha_row.getDay()}/${fecha_row.getMonth() + 1}/${fecha_row.getFullYear()}`;
      console.log("Fecha Prser=", date_parser)
      data["fecha"] = date_parser
      if (data.ingreso == null) {
        data.ingres = 0;
      }
      if (data.egreso == null) {
        data.ingreso = 0;
      }

      Axios.post("http://54.232.8.231/api/cajachica", data)
        .then(response => {
          setRefresh(!refresh)
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }

  // R E A D
  const getData = async () => {
    const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const data_params = { "fecha": date_iso, "rut": rutempresa }
    const api = await Axios.get("http://54.232.8.231/api/cajachica", { params: data_params });
    const cajachica_from_api = await api.data.datos;
    const saldo_a_la_fecha = await api.data.saldo_a_fecha
    var ingresos_mes = 0;
    var egresos_mes = 0;
    cajachica_from_api.forEach(element => {
      ingresos_mes += element["ingreso"]
      egresos_mes += element["egreso"]
    }
    )
    const saldo_mes = ingresos_mes - egresos_mes
    const saldo_anterior = saldo_a_la_fecha - saldo_mes
    setSaldoanterior(mask_cl_peso(saldo_anterior))
    setSaldofinal(mask_cl_peso(saldo_a_la_fecha))
    cajachica_from_api.forEach(element => {
      var ingreso = mask_cl_peso(element["ingreso"])
      var egreso = mask_cl_peso(element["egreso"])
      element["ingreso"] = ingreso
      element["egreso"] = egreso

    });

    setState({ ...state, data: cajachica_from_api });
  }

  React.useEffect(() => {

    getData(setState, state);

  }, [rutempresa, date, refresh]);


  // U P D A T E
  function postUpdateRow(data) {
    console.log(data, "DATA A ACTUALIZAR")
    if (typeof data.ingreso === "string") {
      var rt_ingreso = data.ingreso.replaceAll(".", "")
      data.ingreso = parseInt(rt_ingreso, 0)

    }
    if (typeof data.egreso === "string") {
      var rt_egreso = data.egreso.replaceAll(".", "")
      data.egreso = parseInt(rt_egreso, 0)
    }

    if (data.ingreso === "") {
      data.ingreso = 0
    }
    if (data.egreso === "") {
      data.egreso = 0
    }
    Axios.put(`http://54.232.8.231/api/cajachica`, data)
      .then(response => {
        console.log(response, "ESTO ES UPDATE")
        if (response.status === 200) {

          setRefresh(!refresh)
        }
        else {
          //notificacion erro al solicitar las boletas para este periodo
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }


  // D E L E T E
  function postDeleteRow(data) {
    const data_params = { "_id": data["_id"] }
    Axios.delete("http://54.232.8.231/api/cajachica", { params: data_params })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setRefresh(!refresh)

        }
        else {
          //notificacion erro al solicitar las boletas para este periodo
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };


  function snack_ok(message) {
    showsnack(message, "success")
  }



  const saldo_mes = `Saldo anterior: ${saldoanterior} 
                     - Saldo Final ${saldofinal}`


  //SNACK BAR
  const [messagesnack, setMessagesnack] = React.useState("")
  const [severitysnack, setSeveritysnack] = React.useState("info")
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
  const classes = useStyles();
  return (
    <div>

      <MaterialTable
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
        title={saldo_mes}
        columns={stado.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (control_ing_egr(newData) == false) { return null }

                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  console.log("add", newData)
                  postAddRow(newData)
                  snack_ok("Registro agregado con éxito")
                  return { ...prevState, data };

                },


                );
              }, 800);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (control_ing_egr(newData) == false) { return null }
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    postUpdateRow(newData)
                    console.log(newData)
                    snack_ok("Registro actualizado")

                    return { ...prevState, data };
                  });
                }
              }, 800);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                console.log("se borra una fila")
                setState((prevState) => {
                  const data = [...prevState.data];
                  var removed = data.splice(data.indexOf(oldData), 1);
                  console.log(removed[0])
                  postDeleteRow(removed[0])
                  snack_ok("Registro eliminado")

                  return { ...prevState, data };
                });
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