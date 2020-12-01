import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

export default function CajaChica({date, rutempresa}) {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
    }
  }));


  const stado = {
    columns: [
      { title: 'Fecha', field: 'fecha' },
      { title: 'Glosa', field: 'clasificacion' },
      { title: 'Ingreso', field: 'ingreso', },
      { title: 'Egreso', field: 'egreso', },
      { title: 'Saldo', field: 'Saldo' },
      { title: 'Clasificación', field: 'clasificacion' },

    ],
    data: [
    ],
  }
  const [state, setState] = React.useState(stado);
  React.useEffect(() => {
    const getData = async (setState, state) => {
      const date_iso =`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
      const data_params = {"fecha":date_iso,"rut":rutempresa}

      const api = await Axios.get("http://18.230.199.98/api/cajachica", {params:data_params});
      const cajachica_from_api = await api.data;

      setState({ ...state, data: cajachica_from_api });
      console.log(state)
    }
    getData(setState, state);
  }, [rutempresa]);

  function postAddRow(data) {
    data["rut"] = rutempresa;
    Axios.post("http://18.230.199.98/api/cajachica", data)
      .then(response => null)
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  function postUpdateRow(data){
    Axios.put(`http://18.230.199.98/api/cajachica`, data)
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
    const data_params = {"_id": data["_id"]}
    Axios.delete("http://18.230.199.98/api/cajachica", {params:data_params})
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



  const classes = useStyles();
  return (
    <MaterialTable
      title="Caja chica"
      columns={stado.columns}
      data={state.data}

      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                postAddRow(newData)
                return { ...prevState, data };
              });
            }, 800);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  postUpdateRow(newData)
                  console.log(newData)
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
                return { ...prevState, data };
              });
            }, 800);
          }),
      }}
      className={classes.themeMarginTop} />
  );
}