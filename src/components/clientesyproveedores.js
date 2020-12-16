import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

export default function ClientesProveedores() {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
    }
  }));


  const stado = {
    columns: [
      { title: 'Nombre', field: 'Dia' },
      { title: 'Rut', field: 'Glosa' },
      { title: 'Teléfono', field: 'Ingreso', },
      { title: 'Email', field: 'Email', }
    ],
    data: [
    ],
  }
  const [state, setState] = React.useState(stado);
  React.useEffect(() => {
    const getData = async (setState, state) => {
      const api = await Axios.get("http://54.232.8.231/api/cajachica");
      const cajachica_from_api = await api.data;

      setState({ ...state, data: cajachica_from_api });
      console.log(state)
    }
    getData(setState, state);
  }, []);

  function postAddRow(data) {
    console.log(data)
    Axios.post("http://54.232.8.231/api/cajachica", data)
      .then(response => null)
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
  function postUpdateRow(data){const id = data["_id"]["$oid"]
    console.log(data["_id"]["$oid"])
    Axios.post(`http://54.232.8.231/api/cajachica/${id}`, data)
    .then(response => null)
    .catch(error => {
    console.error('There was an error!', error);
     });
  }
  function postDeleteRow(id) {
    Axios.delete(`http://54.232.8.231/api/cajachica/${id}`);
  };



  const classes = useStyles();
  return (
    <MaterialTable
      title="Mis Clientes y Proveedores"
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
                const removed_id = removed[0]._id["$oid"]
                postDeleteRow(removed_id) 
                return { ...prevState, data };
              });
            }, 800);
          }),
      }}
      className={classes.themeMarginTop} />
  );
}