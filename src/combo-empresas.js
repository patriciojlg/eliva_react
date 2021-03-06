/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({
  setEmpresa, empresalist, setRutempresa
}) {
  
  const defaultProps = {
    options: empresalist,
    getOptionLabel: (option) => option.nombre,
  };

  const flatProps = {
    options: empresalist.map((option) => option.nombre),
  };

  function cambiaElValor(e) {
    setEmpresa(e.target.textContent);
    const empresa_json = empresalist.find(element => element["nombre"] === e.target.textContent)
    setRutempresa(empresa_json["rut"])
    console.log(empresa_json["rut"], "e target");

  }
  function defaultValor(){
    const nombre = empresalist[0].nombre
    const rut = empresalist[0].rut
    const data_detault = {"nombre":nombre, "rut":rut}
    setRutempresa(rut)
    return data_detault
  }
  const [value, setValue] = React.useState(null);

  return (<Autocomplete {...defaultProps}
    id="Empresa"
    defaultValue={defaultValor}
    onChange={(e) => cambiaElValor(e)}
    debug renderInput={(params) => <TextField {...params}
      label="Empresa"
      margin="normal" />
    }
  />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
