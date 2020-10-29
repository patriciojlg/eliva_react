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

function App() {
  const locPath = window.location.pathname;

  const [empresa, setEmpresa] = React.useState("empresa1");
  const [valores, setValores] = React.useState("");
  const [empresalist, setEmpresalist] = React.useState("");
  const [detalle, setDetalle] = React.useState("PRINCIPAL");
  //
  //React.useEffect(()=>{
  //  const getEmpresas = async (setEmpresalist, empresalist) => {
  //    const api = await Axios.get(`http://127.0.0.1:3030/empresas`);
  //    var empresas = await api.data.empresas;
  //    setEmpresalist(empresas);
  //   console.log(empresas)
  // }
  // getEmpresas(setEmpresalist, empresalist);
  //},[valores]);
  //React.useEffect(() => {
  // const consultarApi = async (setValores, valores) => {
  //    const api = await Axios.get(`http://127.0.0.1:3030/${empresa.toLowerCase()}/agosto`);
  //    var dato = await api.data.BoletaVenta;
  //   setValores(dato);
  //   console.log(valores)
  // }
  //
  //  consultarApi(setValores, valores);
  //  console.log("ha cambiado empresa")
  //
  //}, [empresa])


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
          <SimpleBreadcrumbs detalle={detalle} className={classes.breadcrumbs} empresalist={empresalist} setEmpresa={setEmpresa} />
          <Container >
            
            <Switch >
    
              <Route exact path="/" >
              <Widgets setDetalle={setDetalle} /> 
              </Route>
              <Route path="/boletas-honorario" >
                <TableBoletaH />
              </Route>
              <Route path="/facturas-compras" >
                <TableFactura />
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