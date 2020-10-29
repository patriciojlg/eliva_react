import React, { useContext } from "react";
import { CounterContext } from "../context/main-context";
import  Container  from '@material-ui/core/Container';

export default function CounterDisplay() {
  const [table, setTable] = useContext(CounterContext);

  return (
    <Container>
      <div>{table}</div>
    </Container>
  );
}