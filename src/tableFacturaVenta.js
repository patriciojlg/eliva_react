import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

export default function TableFacturaVenta() {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
      }
  }));
  const stado = {
    columns: [
      { title: 'Fecha', field: 'Fecha' },
      { title: 'Tipo Doc', field: 'TipoDoc' },
      { title: 'Nro. Doc.', field: 'NroDoc', },
      { title: 'Tipo Venta', field: 'TipoVent', },
      { title: 'Rut Cliente', field: 'RutCliente'},
      { title: 'Monto Neto', field: 'MontoNeto'},
      { title: 'IVA', field: 'IVA'},
      { title: 'Monto Excento',field: 'MontoExcento'},
      { title: 'Monto Total', field: 'MontoTotal'},
     
    ],
    data: [
      { Fecha: "29/7/2020", TipoDoc: "33", NroDoc: "459", TipoVent: "Crédito", RutCliente: "19253265-2", MontoNeto: "100.000", IVA: "19.000", MontoExcento: "0", MontoTotal:"91.000"},
      { Fecha: "30/7/2020", TipoDoc: "33", NroDoc: "460", TipoVent: "Crédito", RutCliente: "12345767-2", MontoNeto: "100.000", IVA: "19.000", MontoExcento: "0", MontoTotal:"91.000"},
     
    ],
  }
  const [state, setState] = React.useState(stado);
  const classes = useStyles();
  return (
    <MaterialTable 
      title="Facturas de venta"
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