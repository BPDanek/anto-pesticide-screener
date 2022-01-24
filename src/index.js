import React from 'react';
import ReactDOM from 'react-dom';
import PrettyForm from "./Form/PrettyForm/PrettyForm";
import AutoCompleteForm from "./Form/Autocomplete/AutocompleteForm";

// import TestBackend from "./TestBackend";

ReactDOM.render(
  <React.StrictMode>
      <AutoCompleteForm />
  </React.StrictMode>,
  document.getElementById('root')
);