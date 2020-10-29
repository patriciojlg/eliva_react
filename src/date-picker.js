import React, { Fragment, useState } from "react";
import { DatePicker } from "@material-ui/pickers";

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  datePicker: {
    top: "4px",
marginRight: "20px",
  },
}));




function YearMonthPicker() {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>

      <DatePicker className={classes.datePicker}
      label="Periodo"
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
        openTo="year"
        views={["year", "month"]}
        clearable
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Fragment>
  );
}

export default YearMonthPicker;
