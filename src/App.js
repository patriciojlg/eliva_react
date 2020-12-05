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
import TableFacturaCompra from './table';
import TableFacturaVenta from './tableFacturaVenta';
import LinearProgress from '@material-ui/core/LinearProgress';
import CajaChica from './caja-chica';
import Signin from './components/signin';
import useDashboard from './hooks/useDashboard'
import SyncTable from './components/synctable'
import Administrador from './pages/administrador'
import test_session from './providers/refresh'
import SpringModal from './components/modal.js'
import get_impuestos_manuales from './providers/obtener_impuestosManuales'
import getEmpresas from './providers/obtener_empresas'
import Voucher from './components/voucher';
function App() {
  test_session()
  //General state dashboard
  const [getData, setData] = useDashboard();
  const [titlemodal, setTitlemodal] = React.useState("")
  const [messagemodal, setMessagemodal] = React.useState("")

  //Impuestos manuales
  const [ppm, setPpm] = React.useState("0")
  const [iut, setIut] = React.useState("0")


  //Empresa hooks
  const [date, setDate] = React.useState(new Date());
  const [detalle, setDetalle] = React.useState("PRINCIPAL");
  const [empresa, setEmpresa] = React.useState("empresa1");
  const [valores, setValores] = React.useState("");
  const [empresalist, setEmpresalist] = React.useState("");
  const [rutempresa, setRutempresa] = React.useState("");
  const [loading, setLoading] = React.useState(false);




  React.useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    const  getEmpresas = async () => {
    var config = {
      method: 'get',
      url: 'http://54.232.8.231/api/empresas/',
      headers: {
        "Authorization": `Bearer ${access_token}`,
      }
    };
    console.log("access token", access_token)
    Axios(config)
      .then(function (response) {
        const empresas = response.data
        setEmpresalist(empresas);
        const data_empresa = empresas.find(emp => emp.nombre === empresa["nombre"]);
        console.log(rutempresa)
      })
      .catch(function (error) {
 
        console.log(error);
      });
  }
    getEmpresas()
    get_impuestos_manuales(setPpm, setIut, date, rutempresa);

  }, [rutempresa]);


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
  const fecha = date;
  const classes = useStyles();
  return (<React.Fragment >
    {(token == null) ? <Signin /> :
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router >
          <SpringModal messagemodal={messagemodal} titlemodal={titlemodal} setLoading={setLoading} loading={loading}/>
          <PrimarySearchAppBar className={classes.appbar} />
          <div id="algo" className={classes.backgroundMain}>
            <SimpleBreadcrumbs setTitlemodal={setTitlemodal} setMessagemodal={setMessagemodal} setLoading={setLoading} rutempresa={rutempresa} detalle={detalle} className={classes.breadcrumbs} date={date} setDate={setDate} empresalist={empresalist} setRutempresa={setRutempresa} setEmpresa={setEmpresa} />
            <Container >
              <Switch >
                <Route exact path="/" >
                  <Widgets rutempresa={rutempresa} date={date} getData={getData} setData={setData} ppm={ppm} setPpm={setPpm} iut={iut} setIut={setIut} setDetalle={setDetalle} />
                </Route>
                <Route path="/boletas-honorario" >
                  <TableBoletaH rutempresa={rutempresa} date={date}/>
                </Route>
                <Route path="/facturas-compras" >
                 <TableFacturaCompra rutempresa={rutempresa} date={date} />
                </Route>
                <Route path="/caja-chica" >
                  <CajaChica date={date} rutempresa={rutempresa} />
                </Route>
                <Route path="/administrador" >
                  <Administrador date={date} rutempresa={rutempresa} />
                </Route>
                <Route path="/facturas-ventas" >
                  <TableFacturaVenta rutempresa={rutempresa} date={date}/>
                </Route>
                <Route path="/balance" >
                  <Voucher rutempresa={rutempresa} date={date}/>
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