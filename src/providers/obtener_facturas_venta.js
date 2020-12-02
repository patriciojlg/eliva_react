
import Axios from 'axios';

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
    
    const month = month_zero(date);
    const date_iso =`01/${date.getMonth()+1}/${date.getFullYear()}`
    const data_params = {"fecha":date_iso,"rut":rutempresa,"tipo":"venta"}
    Axios.get(`http://18.230.199.98/api/dte-mes/`, {params: data_params})
    .then(response => {
        console.log(response)
        if (response.status === 200){
            setFacturaventalist(response.data)}
  else{
      //notificacion erro al solicitar las boletas para este periodo
  }
  })
  .catch(error => {
  console.error('There was an error!', error);
   });
  }