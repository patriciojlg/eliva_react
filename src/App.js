import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
import PrimarySearchAppBar from './appbar';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import TableBoletaH from './tableBoletasH';
import TableBoletaV from './TableBoletaV';
import Widgets from './widgets';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import SimpleBreadcrumbs from './breadcrums';
import Axios from 'axios';
import TableFactura from './table';
import TableFacturaVenta from './tableFacturaVenta';
import LinearProgress from '@material-ui/core/LinearProgress';
import CajaChica from './caja-chica';

function App() {
  //Periodo hooks
  const [date, setDate] = React.useState(new Date());

  //Empresa hooks
  const [detalle, setDetalle] = React.useState("PRINCIPAL");
  const [empresa, setEmpresa] = React.useState("empresa1");
  const [valores, setValores] = React.useState("");
  const [empresalist, setEmpresalist] = React.useState("");
  const [rutempresa, setRutempresa] = React.useState("");

  React.useEffect(() => {

    const getEmpresas = async (setEmpresalist, empresalist) => {
      const api = await Axios.get("http://15.228.82.239/api/empresas");
      const empresas = await api.data;
      setEmpresalist(empresas);
      console.log(empresa)
      const data_empresa = empresas.find(emp => emp.nombre === empresa["nombre"]);
      setRutempresa(empresa["rut"]);
      console.log(rutempresa)
    }

    getEmpresas(setEmpresalist, empresalist);

  }, [valores]);


  //React.useEffect(() => {
  //  setValores("")
  //  const mes = date.getMonth();
  //  const ano = date.getFullYear();
//
  //  const consultarApi = async (setValores, valores) => {
  //    if (rutempresa !== "") {
  //     const api = await Axios.get(`http://127.0.0.1:3030/dtec/${rutempresa}/${mes}/${ano}`);
 //       var dato = await api.data.BoletaVenta;
  //      setValores(dato);
//
  //      console.log(`Esto es valores: ${valores}`)
   //   }
  //  }
//
//   consultarApi(setValores, valores);
 //   console.log("ha cambiado empresa")
//
 // }, [empresa])

  const useStyles = makeStyles(theme => ({

    backgroundMain: {
      backgroundColor: "#ebe9ff",
    },

    breadcrumbs: {
      backgroundColor: "white",
    }


  }));


  const classes = useStyles();
  return (<React.Fragment >
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router >
        <PrimarySearchAppBar className={classes.appbar} />
        <div id="algo" className={classes.backgroundMain}>
          <SimpleBreadcrumbs detalle={detalle} className={classes.breadcrumbs} date={date} setDate={setDate} empresalist={empresalist} setRutempresa={setRutempresa} setEmpresa={setEmpresa} />
          <Container >
            <Switch >
              <Route exact path="/" >
                <Widgets setDetalle={setDetalle} />
              </Route>
              <Route path="/boletas-honorario" >
                <TableBoletaH />
              </Route>
              <Route path="/facturas-compras" >
                {(valores === "" || rutempresa === "") ? <LinearProgress /> : <TableFactura valores={valores} empresa={empresa} />}
              </Route>
              <Route path="/caja-chica" >
                <CajaChica />
              </Route>
              <Route path="/facturas-ventas" >
                <TableFacturaVenta />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  </React.Fragment>);
}

export default App;