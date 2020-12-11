import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Card } from '@material-ui/core';
import Voucher from './voucher';
import DetalleVoucher from './voucherdetailtable';

function TabPanelVoucher(props) {
  const { children, value,  index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanelVoucher.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1300,
  },
}));

export default function FullWidthTabs({date, rutempresa}) {
  const [voucherid, setVoucherid] = React.useState();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
      <Card>
    <div className={classes.root}>
      <AppBar position="static" width="100%" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Vouchers" {...a11yProps(0)} />
          <Tab label="Detalle" {...a11yProps(1)} />
    
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanelVoucher value={value} index={0} dir={theme.direction}>
          <Voucher rutempresa={rutempresa} date={date} voucherid={voucherid} setVoucherid={setVoucherid} setValue={setValue}/>
        </TabPanelVoucher>
        <TabPanelVoucher value={value} index={1}  dir={theme.direction}>
        <DetalleVoucher rutempresa={rutempresa}  voucherid={voucherid} /> 
        </TabPanelVoucher>

      </SwipeableViews>
    </div>
    </Card>
  );
}