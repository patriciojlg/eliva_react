import React from "react";
import CounterButtons from '../components/widgets_menu';
import CounterDisplay from '../components/table-display';
import { CounterContextProvider } from "../context/main-context";

export default function CounterView() {
  return (
    <CounterContextProvider>
    <CounterButtons />  
    <CounterDisplay />
    </CounterContextProvider>
  );
}