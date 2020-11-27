
import Axios from 'axios';

export default function get_facturas_compra({rutempresa, date, setFacturacompralist}){ 
    if (rutempresa == null){
        return null
    }
    const date_iso =`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    const data_params = {"fecha":date_iso,"rut":rutempresa,"tipo":"compra"}
    Axios.get(`http://18.230.199.98/api/dte-mes/`, {params: data_params})
    .then(response => {
        console.log(response)
        if (response.status === 200){
            setFacturacompralist(response.data)}
  else{
      //notificacion erro al solicitar las boletas para este periodo
  }
  })
  .catch(error => {
  console.error('There was an error!', error);
   });
  }