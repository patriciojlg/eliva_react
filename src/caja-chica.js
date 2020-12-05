import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import useSnackbar from './hooks/useSnackbar'
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
export default function CajaChica({ date, rutempresa }) {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
    }
  }));
  const stado = {
    columns: [
      { title: 'Fecha', align: "left", field: 'fecha', type: 'date' },
      { title: 'Glosa', align: "left", field: 'glosa' },
      { title: 'Ingreso', align: "left", field: 'ingreso', type: 'numeric' },

      { title: 'Egreso', align: "left", field: 'egreso', type: 'numeric' },
      { title: 'Clasificacion', align: "left", field: 'clasificacion' }
      
    ],
    data: [
    ],
  }
  const [refresh, setRefresh] = React.useState(false);
  const [saldoalmes, setSaldoalmes] = React.useState(0);
  const [state, setState] = React.useState(stado);
  const [saldoanterior, setSaldoanterior] = React.useState();
  const [saldofinal, setSaldofinal] = React.useState();
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    const getData = async (setState, state) => {
      const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
      const data_params = { "fecha": date_iso, "rut": rutempresa }

      const api = await Axios.get("http://54.232.8.231/api/cajachica", { params: data_params });
      const cajachica_from_api = await api.data.datos;
      const saldo_a_la_fecha = await api.data.saldo_a_fecha


      console.log("api", api)


      setState({ ...state, data: cajachica_from_api });
      console.log(state)

      var ingresos_mes = 0;
      var egresos_mes = 0;
      cajachica_from_api.forEach(element => {
        ingresos_mes += element["ingreso"]
        egresos_mes += element["egreso"]
      }
      )
      const saldo_mes = ingresos_mes - egresos_mes
      setSaldoanterior(saldo_a_la_fecha - saldo_mes)
      setSaldofinal(saldo_a_la_fecha)
    }

    getData(setState, state);
  }, [rutempresa, date]);

  function postAddRow(data) {
    const fecha_row = data["fecha"]
    if (typeof fecha_row.getDay === "function"){
    data["rut"] = rutempresa;
    
    console.log("ESTO ES FECHA", fecha_row)
    var date_parser 
   
    date_parser = `0${fecha_row.getDay() -1}/${fecha_row.getMonth() + 1}/${fecha_row.getFullYear()}`;

    console.log("Fecha Prser=", date_parser)
    
    data["fecha"] = date_parser
    Axios.post("http://54.232.8.231/api/cajachica", data)
      .then(response => null)
      .catch(error => {
        console.error('There was an error!', error);
      });
    }
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
  function postUpdateRow(data) {
    Axios.put(`http://54.232.8.231/api/cajachica`, data)
      .then(response => {
        console.log(response)
        if (response.status === 200) {

        }
        else {
          //notificacion erro al solicitar las boletas para este periodo
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  function postDeleteRow(data) {
    const data_params = { "_id": data["_id"] }
    Axios.delete("http://54.232.8.231/api/cajachica", { params: data_params })
      .then(response => {
        console.log(response)
        if (response.status === 200) {

        }
        else {
          //notificacion erro al solicitar las boletas para este periodo
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
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
                });
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