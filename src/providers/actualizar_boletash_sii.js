import Axios from 'axios';

export default function actualizar_boletas_h_sii({rutempresa, date}){ 
    const date_iso =`${date.getDay()}/${date.getMonth()+1}/${date.getFullYear()}`
    const data_params = {"fecha":date_iso,"rut":rutempresa}
    Axios.post(`http://54.232.8.231/api/bh-ano/`,  {data:data_params})
    .then(response => {
        console.log(response)
        if (response.status === 200){
        console.log(response.data)}
  else{
      //notificacion erro al solicitar las boletas para este periodo
  }
  })
  .catch(error => {
  console.error('There was an error!', error);
   });
  }