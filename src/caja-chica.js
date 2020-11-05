import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

export default function CajaChica() {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
    }
  }));

  const stado = {
    columns: [
      { title: 'Día', field: 'Dia' },
      { title: 'Glosa', field: 'Glosa' },
      { title: 'Ingreso', field: 'Ingreso', },
      { title: 'Egreso', field: 'Egreso', },
      { title: 'Saldo', field: 'Saldo' },
      { title: 'Clasificación', field: 'Clasificacion' },
      { title: 'Acciones', field: 'Acciones' },
    ],
    data: [
    ],
  }
  const [state, setState] = React.useState(stado);
  React.useEffect(() => {
    const getData = async (setState, state) => {
      const api = await Axios.get("http://15.228.82.239/api/cajachica/2020/octubre");
      const cajachica_from_api = await api.data;

      setState({ ...state, data: [cajachica_from_api] });
      console.log(state)
    }
    function postState(stado, setState) {
      Axios.post("http://15.228.82.239/api/cajachica/2020/octubre", stado)
        .then(response => setState(response.data))
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
    getData(setState, state);
  }, [""]);

  const classes = useStyles();
  return (
    <MaterialTable
      title="Caja chica"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      className={classes.themeMarginTop} />
  );
}