import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

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

export default function ImpuestosManuales() {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="PPM" variant="outlined" />
                <TextField className={classes.field}  id="outlined-basic" label="I. Único trabajador" variant="outlined" />
                <Button className={classes.field}  variant="outlined" color="primary">
                    Guardar
      </Button>
            </form>
        </Card>
    );
}
