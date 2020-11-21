import React from "react";

import Axios from "axios";

export default function useDashboard() {


  const valores = {
    empresas: [
      {
        nombre: "",
        rut: ""
      }
    ],
    periodo: {
      mes: 0,
      ano: 2020
    },
    impuestos: {
      boletas_ventas: 300,
      facturas_ventas: 0,
      facturas_compras: 300,
      boletas_honorario: 0,
      caja_chica: 0,
      ppm: 0,
      iut: 0,
      iva: 0,

      iva_anterior: 0
    },
    historicos: {
      caja_chica: {
        actual_ingreso: 0,
        actual_egreso: 0,
        uno_anterior_ingresos: 0,
        uno_anterior_egresos: 0,
        dos_anterior_ingresos: 0,
        dos_anterior_egresos: 0,
        tres_anterior_ingresos: 0,
        tres_anterior_egresos: 0,
        cuatro_anterior_ingresos: 0,
        cuatro_anterior_egresos: 0,
        cinco_anterior_ingresos: 0,
        cinco_anterior_egresos: 0,
        seis_anterior_ingresos: 0,
        seis_anterior_egresos: 0
      },
      boletas_ventas: {
        actual: 0,
        uno_anterior: 0,
        dos_anterior: 0,
        tres_anterior: 0,
        cuatro_anterior: 0,
        cinco_anterior: 0,
        seis_anterior: 0
      },
      facturas_ventas: {
        actual: 0,
        uno_anterior: 0,
        dos_anterior: 0,
        tres_anterior: 0,
        cuatro_anterior: 0,
        cinco_anterior: 0,
        seis_anterior: 0
      },
      facturas_compras: {
        actual: 0,
        uno_anterior: 0,
        dos_anterior: 0,
        tres_anterior: 0,
        cuatro_anterior: 0,
        cinco_anterior: 0,
        seis_anterior: 0
      },
      boletas_honorario: {
        actual: 0,
        uno_anterior: 0,
        dos_anterior: 0,
        tres_anterior: 0,
        cuatro_anterior: 0,
        cinco_anterior: 0,
        seis_anterior: 0
      }
    }
  };

  const [estado, setEstado] = React.useState({ ...valores });

  function get_valores() {
    const token = localStorage.getItem('token');
    var data = '';

    var config = {
      method: 'get',
      url: 'http://18.228.152.164/api/dashboard/2020/11/158389460',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    Axios(config)
      .then(function (response) {
        const data = response.data
        console.log(data)
        setEstado(data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  React.useEffect(() => {
    get_valores()
  }, [true]
  );
  function setData(clave, segunda_clave, dato) {
    if (segunda_clave == null) {
      setEstado({ ...estado, [clave]: dato });
    } else {

      setEstado({
        ...estado,
        [clave]: { ...estado.clave, [segunda_clave]: dato }
      });
    }
  }
  function getData(clave, segunda_clave = null) {
    const _json = { ...estado[clave] };
    if (segunda_clave == null) {
      const _json = estado[clave];
      return _json;
    } else {
      const data = _json[segunda_clave];
      return data;
    }
  }
  return [getData, setData]
}
