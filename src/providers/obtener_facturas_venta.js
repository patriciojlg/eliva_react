
import Axios from 'axios';
import mask_cl_peso from '../util/chileanpesomask'
export default function get_facturas_venta({rutempresa, date, setFacturaventalist}){ 
    if (rutempresa == null){
        return null
    }

    function month_zero() {
        const month2mod = date.getMonth() 
        if (String(month2mod).length < 2) {
          return `0${month2mod + 1}`;
        } else {
          return month2mod+1;
        }
      }
      function string_to_date_iso(date_api){
        var mydate = new Date(date_api);
        const date_iso = `${mydate.getDay()}/${mydate.getMonth() + 1}/${mydate.getFullYear()}`
        return date_iso
    }
    const month = month_zero(date);
    const date_iso =`01/${date.getMonth()+1}/${date.getFullYear()}`
    const data_params = {"fecha":date_iso,"rut":rutempresa,"tipo":"venta"}
    Axios.get(`http://54.232.8.231/api/dte-mes/`, {params: data_params})
    .then(response => {
      const data = response.data
      data.forEach(function(element, index, object) {
        var fecha_human = string_to_date_iso(element.FechaDocto)
        var monto_neto =  mask_cl_peso(element["MontoNeto"])
        var Iva = mask_cl_peso(element["MontoIVA"])
        var monto_total = mask_cl_peso(element["Montototal"])
        var monto_excento = mask_cl_peso(element["MontoExento"])
        element["FechaDocto"] = fecha_human
        element["MontoNeto"] = monto_neto
        element["MontoIVA"] = Iva
        element["Montototal"] = monto_total
        element["MontoExento"] = monto_excento
        if (element["FechaDocto"] === "NaN/NaN/NaN"){
          object.splice(index, 1);
        }
         
      });

      console.log(data, "Esto es data de facturas de ventas")
 
        console.log(response)
        if (response.status === 200){
            setFacturaventalist(data)}
  else{
      //notificacion erro al solicitar las boletas para este periodo
  }
  })
  .catch(error => {
  console.error('There was an error!', error);
   });
  }