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
import Signin from './components/signin';
function App() {
  //Periodo hooks
  const [date, setDate] = React.useState(new Date());

  //Empresa hooks

  const [detalle, setDetalle] = React.useState("PRINCIPAL");
  const [empresa, setEmpresa] = React.useState("empresa1");
  const [valores, setValores] = React.useState("");
  const [empresalist, setEmpresalist] = React.useState("");
  const [rutempresa, setRutempresa] = React.useState("");
  function controlSession() {
    const token = localStorage.getItem('token');
    var data = '';

    var config = {
      method: 'get',
      url: 'http://52.67.32.82/api/auth',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        localStorage.removeItem('token');
        console.log(error);
      });
    }




  React.useEffect(() => {

    controlSession()
    const getEmpresas = async (setEmpresalist, empresalist) => {
      const api = await Axios.get("http://52.67.32.82/api/empresas");
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
  // getter
  const token = localStorage.getItem('token');

  const classes = useStyles();
  return (<React.Fragment >
    {(token == null ) ? <Signin /> :
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
    }
  </React.Fragment>);
}

export default App;