/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({
  setEmpresa, empresalist, setRutempresa
}) {
  ;
  const defaultProps = {
    options: empresalist,
    getOptionLabel: (option) => option.nombre,
  };

  const flatProps = {
    options: empresalist.map((option) => option.nombre),
  };

  function cambiaElValor(e) {
    setEmpresa(e.target.textContent);
    console.log(e.target.textContent, "e target");
    return
  }
  const [value, setValue] = React.useState(null);
  console.log(flatProps, "flatProps")
  return (<Autocomplete {...defaultProps}
    id="Empresa"
    defaultValue={[flatProps[0]]}
    onChange={(e) => cambiaElValor(e)}
    debug renderInput={(params) => <TextField {...params}
      label="Empresa"
      margin="normal" />
    }
  />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
