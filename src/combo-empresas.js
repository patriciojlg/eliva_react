/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox({
  setEmpresa, empresalist
}) {
;
  const defaultProps = {
    options: empresalist,
    getOptionLabel: (option) => option.value,
  };

  const flatProps = {
    options: empresalist.map((option) => option.value),
  };

  function cambiaElValor(e) {
    setEmpresa(e.target.textContent);
    console.log(e.target.textContent);
    return
  }
  const [value, setValue] = React.useState(null);

  return (<Autocomplete {...defaultProps}
    id="Empresa"
    onChange={(e) => cambiaElValor(e)}
    debug renderInput={(params) => <TextField {...params}
        label="Empresa"
        margin="normal" />
    }
  />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
