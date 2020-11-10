import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
padding:"10px",
    },
    field:{
        marginTop: "5px",
    },
    card: {
        marginBottom: "15px",
    }
}));

export default function ImpuestosManuales({setIut, ppm, setPpm, iut}) {

    function set_impuestos_manuales() {
        const token = localStorage.getItem('token');
        var data = '';
    
        var config = {
          method: 'get',
          url: 'http://52.67.32.82/api/impuestos-manuales',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: data
        };
    
        Axios(config)
          .then(function (response) {
            const data = response.data
    
    
            console.log(response)
            setPpm(data.ppm.ppm)
            setIut(data.iut.iut)
            
      
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        
    function guardar_impuestos_manuales_en_api(){
        const data = {
            _ppm: {ppm},
            _iut: {iut},
        }
        const token = localStorage.getItem('token');
        Axios.post(`http://52.67.32.82/api/impuestos-manuales`, data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {window.location.reload()})
        .catch(error => {
        console.error('There was an error!', error);
         });
      }
if (ppm==0 && iut== 0){
    set_impuestos_manuales()
}

    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField onChange={(e)=>{setPpm(e.target.value)}} id="outlined-basic" label="PPM" variant="outlined" />
                <TextField onChange={(e)=>{setIut(e.target.value)}} className={classes.field}  id="outlined-basic" label="I. Único trabajador" variant="outlined" />
                <Button className={classes.field} onClick={(e)=>{guardar_impuestos_manuales_en_api()}}  variant="outlined" color="primary">
                    Guardar
      </Button>
            </form>
        </Card>
    );
}
