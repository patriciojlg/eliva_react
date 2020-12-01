import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import post_put_impuestos from '../providers/post_put_impuestos_manuales';
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

export default function ImpuestosManuales({rutempresa, date, setIut, ppm, setPpm, iut}) {
    const fecha = date;    
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField onChange={(e)=>{setPpm(e.target.value)}} id="outlined-basic" label="PPM" variant="outlined" />
                <TextField onChange={(e)=>{setIut(e.target.value)}} className={classes.field}  id="outlined-basic" label="I. Único trabajador" variant="outlined" />
                <Button className={classes.field} onClick={() => post_put_impuestos(ppm=ppm, iut=iut, date=date, rutempresa=rutempresa)}  variant="outlined" color="primary">
                    Guardar
      </Button>
            </form>
        </Card>
    );
}
