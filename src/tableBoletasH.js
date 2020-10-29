import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

export default function TableBoletaH() {
  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
      }
  }));
  const stado = {
    columns: [
      { title: 'Fecha', field: 'Fecha' },
      { title: 'Boleta Nro.', field: 'BoletaNumero' },
      { title: 'Rut del profesional', field: 'RutProfesional', },
      { title: 'Monto Bruto', field: 'MontoBruto', },
      { title: 'Retención 2a C.', field: 'RetencionSegunda'},
      { title: 'Monto Líquido', field: 'MontoLiquido'},
    ],
    data: [
      { Fecha: "29/7/2020", BoletaNumero: "236", RutProfesional: "15838941-5", MontoBruto: "100.000", RetencionSegunda: "10.000", MontoLiquido: "90.000"},
      { Fecha: "29/7/2020", BoletaNumero: "237", RutProfesional: "7102230-3", MontoBruto: "120.000", RetencionSegunda: "12.000", MontoLiquido: "98.000"},
    ],
  }
  const [state, setState] =  React.useState({stado});
  const classes = useStyles();

  return (
    <MaterialTable 
      title="Boletas a honorarios"
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