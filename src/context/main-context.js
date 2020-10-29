import React, { useState, createContext } from "react";
import TableBoletaH from '../tableBoletasH';
import Mui_table from '../muiTable';

// Create Context Object
export const CounterContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {
  const [table, setTable] = useState(TableBoletaH);
  
  return (
    <CounterContext.Provider value={[table, setTable]}>
      {props.children}
    </CounterContext.Provider>
  );
};
