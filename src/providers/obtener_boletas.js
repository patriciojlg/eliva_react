

import Axios from 'axios';

export default function get_boletas_h ({rutempresa, date, setBoletalist}){ 
    const date_iso =`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    const data_params = {"fecha":date_iso,"rut":rutempresa}
    Axios.get(`http://54.232.8.231/api/bh-mes/`, {params: data_params})
    .then(response => {
        console.log(response)
        if (response.status === 200){
        setBoletalist(response.data)}
  else{
      //notificacion erro al solicitar las boletas para este periodo
  }
  })
  .catch(error => {
  console.error('There was an error!', error);
   });
  }