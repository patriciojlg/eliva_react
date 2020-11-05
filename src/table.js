import React from 'react';
import MaterialTable from 'material-table';
import {
  makeStyles
} from '@material-ui/core/styles';

export default function TableFactura({
  empresa,
  valores
}) {

  React.useEffect(() => {
      console.log("cargando datos");
    },
    [empresa]);

  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em !important"
    }
  }));


  var stado = {
    columns: [{
        title: 'Fecha',
        field: 'Fecha'
      },
      {
        title: 'Nro. Boleta desde',
        field: 'NroBoletaDesde'
      },
      {
        title: 'Nro. Boleta hasta',
        field: 'NroBoletaHasta',
      },
      {
        title: 'Tipo Doc.',
        field: 'TipoDoc',
      },
      {
        title: 'Cantidad Transbank',
        field: 'CantidadTransbank'
      },
      {
        title: 'Monto Neto',
        field: 'MontoNeto'
      },
      {
        title: 'IVA',
        field: 'IVA'
      },
      {
        title: 'Monto Total',
        field: 'MontoTotal'
      },
    ],
    data: valores
    
    ,
  }
  const [state, setState] = React.useState(stado);


  const classes = useStyles();
  return ( <
    MaterialTable title = {
      empresa
    }
    columns = {
      stado.columns
    }
    data = {
      stado.data
    }
    editable = {
      {
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return {
                  ...prevState,
                  data
                };
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
                  return {
                    ...prevState,
                    data
                  };
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
                return {
                  ...prevState,
                  data
                };
              });
            }, 600);
          }),
      }
    }
    className = {
      classes.themeMarginTop
    }/>);}