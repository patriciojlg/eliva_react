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
import useDashboard from './hooks/useDashboard'
import SyncTable from './components/synctable'
import Administrador from './pages/administrador'

function App() {

  //General state dashboard
  const [getData, setData] = useDashboard();
  //Periodo hooks
  const [date, setDate] = React.useState(new Date());
  //Impuestos manuales
  const [ppm, setPpm] = React.useState("0")
  const [iut, setIut] = React.useState("0")

  //Empresa hooks

  const [detalle, setDetalle] = React.useState("PRINCIPAL");
  const [empresa, setEmpresa] = React.useState("empresa1");
  const [valores, setValores] = React.useState("");
  const [empresalist, setEmpresalist] = React.useState("");
  const [rutempresa, setRutempresa] = React.useState("");
  function controlSession() {

    console.log(valores, "ESTO ES VALORES")
    const token = localStorage.getItem('token');
    var data = '';

    var config = {
      method: 'get',
      url: 'http://18.228.152.164/api/auth',
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
        //localStorage.removeItem('token');
        console.log(error);
      });
    }

    


  React.useEffect(() => {
    const data =  {"propietario":"gerencia@ciden.cl"}
    controlSession()
    const getEmpresas = async (setEmpresalist, empresalist) => {
      var data = JSON.stringify( {"propietario":"gerencia@ciden.cl"});
    var config = {
      method: 'get',
      url: 'http://localhost:8080/example-endpoint',
      headers: {
        "Content-Type": "application/json",

      },
      data: { params: data}
    };

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        //localStorage.removeItem('token');
        console.log(error);
      });
    
  
     // setEmpresalist(empresas);
     // console.log(empresa)
     // const data_empresa = empresas.find(emp => emp.nombre === empresa["nombre"]);
     // setRutempresa(empresa["rut"]);
     // console.log(rutempresa)
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
  const token = localStorage.getItem('access_token');

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
                  <Widgets getData={getData} setData={setData} ppm={ppm} setPpm={setPpm} iut={iut} setIut={setIut} setDetalle={setDetalle} />
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
                <Route path="/administrador" >
                  <Administrador date={date} rutempresa={rutempresa}   />
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