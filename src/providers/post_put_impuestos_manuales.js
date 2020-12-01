import Axios from 'axios';



export default function post_put_impuestos(ppm, iut, date, rutempresa, setPpm, setIut) {
    function handleClick(e) {    e.preventDefault();    console.log('The link was clicked.');  }

    const fehca = date;

    function post_impuestos(date, rutempresa, setPpm, setIut) {
        const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
        const body_json = { "fecha": date_iso, "rut": rutempresa, "ppm": ppm, "iut": iut }
        Axios.post(`http://18.230.199.98/api/impuestos-manuales/`, body_json)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
        
                }

                else {
                    //notificacion erro al solicitar las boletas para este periodo
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    function put_impuestos(date, rutempresa, setPpm, setIut) {
        console.log("Esto es rut empresa", rutempresa)
        const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
        const body_json = { "fecha": date_iso, "rut": rutempresa, "ppm": ppm, "iut": iut }
        Axios.put(`http://18.230.199.98/api/impuestos-manuales/`, body_json)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
         
                }
                else {
                    //notificacion erro al solicitar las boletas para este periodo
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    function check_impuestos(date, rutempresa) {
        const date_iso = `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`
        const data_params = { "fecha": date_iso, "rut": rutempresa }
        Axios.get(`http://18.230.199.98/api/impuestos-manuales/`, { params: data_params })
            .then(response => {
                if (response.status == 200){
                    put_impuestos(date, rutempresa)
                };
                if (response.status == 204){
                    post_impuestos(date, rutempresa);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    console.log("Activandose funcion")
    if (rutempresa === null) {
        return null
    };
    
    const status_impuestos = check_impuestos(date=date, rutempresa=rutempresa);
    if (status_impuestos === 204) {
        post_impuestos(date=date, rutempresa=rutempresa, setPpm={setPpm}, setIut={setIut})
    }
    if (status_impuestos == 200) {
        put_impuestos(date=date, rutempresa=rutempresa, setPpm={setPpm}, setIut={setIut})
    }

}