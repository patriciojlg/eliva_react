
import Axios from 'axios';

export default function get_impuestos_manuales({setPpm, setIut, date, rutempresa}){ 
    if (rutempresa == null){
        return null
    }
    
    const date_iso =`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    const data_params = {"fecha":date_iso,"rut":rutempresa}
    Axios.get(`http://54.232.8.231/api/impuestos-manuales/`, {params: data_params})
    .then(response => {
        console.log(response)
        if (response.status === 200)
        {
            setPpm(response.data.ppm)
            setIut(response.data.iut)
        }
  else{
      //notificacion erro al solicitar las boletas para este periodo
  }
  })
  .catch(error => {
  console.error('There was an error!', error);
   });
  }