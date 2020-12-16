import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileCard from './profileCard';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  headingUserName: {
    color: "white !important",
  },
  fullList: {
    width: 'auto',
  },
  lessAnchorUnderLine: {
    textDecoration: "none",
    decoration: "none" ,
    "&:visited": {   
      color: "black",
    textDecoration: "none",
    decoration: "none"},
  },

});

export default function DrawerMenu() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const menu = [
          
            {nombre: "Boletas honorario",
            url: "/boletas-honorario",
            icon: "account_box"},
            {nombre: "Boletas de venta",
            url: "/boletas-ventas",
            icon: "receipt"},
            {nombre: "Facturas de compra",
            url: "/facturas-compras",
            icon: "transit_enterexit"},
            {nombre: "Facturas de venta",
            url: "/facturas-ventas",
            icon: "trending_up"},
  
            {
              nombre: "Caja chica",
              url: "/caja-chica",
              icon: "swap_vert"
            },
            {
              nombre: "Voucher contable",
              url: "/balance",
              icon: "exposure"
            },
            {
              nombre: "Administrador",
              url: "/administrador",
              icon: "settings"
            }
            
          ]

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ProfileCard className={classes.headingUserName} name="Nombre del Usuario" location="Empresa usuario" />

      <List>
        {menu.map((element, index) => (
          <Link className={classes.lessAnchorUnderLine} to={element.url}>
          <ListItem button key={element.nombre}>
            <ListItemIcon><Icon>{element.icon}</Icon></ListItemIcon>
            <ListItemText primary={element.nombre} />
          </ListItem>
</Link>
        ))}
      </List>

      <Divider />


    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}> <MenuIcon htmlColor="white" /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}