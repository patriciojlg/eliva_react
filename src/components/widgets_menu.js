import React, { useContext } from "react";

import TableBoletaV from '../TableBoletaV';
import TableFactura from '../table';
import TableBoletaH from '../tableBoletasH';
import StatCard from '../statcard';
import Grid from "@material-ui/core/Grid";
import EmailIcon from "@material-ui/icons/Email";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles } from '@material-ui/core/styles';
import { CounterContext } from '../context/main-context';
import Mui_table from "../muiTable";

export default function CounterButtons() {
    const [table, setTable] = useContext(CounterContext);

  const boletas_ventas = () => {
    setTable(TableBoletaV);
  };

  const facturas_ventas = () => {
    setTable(TableFactura);
  };

  const facturas_compras = () => {
    setTable(Mui_table);
  };

  const boletas_honorario = () => {
    setTable(TableBoletaH);
  };

  const useStyles = makeStyles(theme => ({
    themeMarginTop: {
      marginTop: "1em",
      marginBottom: "1em"
      }
  }));
  const classes = useStyles();

  return (
    <Grid container className={classes.themeMarginTop} spacing={1}>
    <Grid item xs={12} sm={6} md={3}>
    <div onClick={boletas_ventas}>
    <StatCard 
      type="fill"
      title="Boletas de venta"
      value={103}
      icon={<LocalOfferIcon />}
      color="#3f51b5"
    />
    </div>

  </Grid>
  <Grid item xs={12} sm={6} md={3}>
  <div onClick= {facturas_ventas}> 
    <StatCard
      type="fill"
      title="Facturas de venta"
      value={230}
      icon={<PhoneIcon />}
      color="#9c27b0"
    />
</div>
  </Grid>

  <Grid item xs={12} sm={6} md={3}>
  <div onClick={facturas_compras}>
    <StatCard
  
      type="fill"
      title="Facturas de compra"
      value={323}
      icon={<NotificationsIcon />}
      color="#f44336"
    />
    </div>
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
  <div onClick={boletas_honorario}> 
  <StatCard
    
      type="fill"
      title="Boletas honorario"
      value={870}
      icon={<EmailIcon />}
      color="#ffd740"
    />
    </div>
  </Grid>
 </Grid>

  );
}

