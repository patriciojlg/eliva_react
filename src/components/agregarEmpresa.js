import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Axios from 'axios';
const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  }
}));

const AgregarEmpresa = () => {
const [nombre_empresa, setNombre_empresa] = React.useState("")
const [rut_tributario, setRut_tributario] = React.useState("")
const [clave_sii, setClave_sii] = React.useState("")
const [re_clave_sii, setRe_clave_sii] = React.useState("")

function postEmpresa(){

  if (nombre_empresa == "") {console.log("Error nombre empresa"); return null}
  if (rut_tributario == "") {console.log("Error rut");return null}
  if (clave_sii == "") {console.log("Error clave_sii");return null}
  if (re_clave_sii == ""){console.log("Error re_clave_sii");return null}
  if (re_clave_sii != clave_sii){console.log("Error match clave");return null}
  
  var data_empresa = {}
  data_empresa.nombre = nombre_empresa
  data_empresa.rut = rut_tributario
  data_empresa.clave_sii = clave_sii
  data_empresa.re_clave_sii = re_clave_sii

console.log(data_empresa)
Axios.post(`http://18.230.199.98 /api/empresas/`, data_empresa)
.then(response => {
  console.log(response)
  
})
.catch(error => {
console.error('There was an error!', error);
});
}
  const classes = useStyles();
  return (

          <Card>
            <CardContent>
              <form>
                <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`}
                    alt=""
                  />
                  <Typography variant="caption">
                    <h2>Agregar empresa a mi cuenta de Eliva</h2>
                  </Typography>
                </div>
                <TextField
                  id="nombre"
                  label="Nombre de la empresa"
                  className={classes.textField}
                  onChange={(e) => setNombre_empresa(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="rut"
                  label="Rut tributario"
                  className={classes.textField}
                  fullWidth
                  onChange={(e) => setRut_tributario(e.target.value)}
                  margin="normal"
                />
                <TextField
                  id="clave_sii"
                  label="Clave para SII"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  onChange={(e) => setClave_sii(e.target.value)}
                  margin="normal"
                />
                  <TextField
                  id="clave_sii"
                  label="Repita clave de SII"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  onChange={(e) => setRe_clave_sii(e.target.value)}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth

                  onClick={(e)=>postEmpresa()}
                >
                  Agregar empresa a mi cuenta
                </Button>
                <div className="pt-1 text-xs-center">

                </div>
              </form>
            </CardContent>
          </Card>
  );};
  export default AgregarEmpresa;
