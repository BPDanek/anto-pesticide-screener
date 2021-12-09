import React from 'react';
import ReactDOM from 'react-dom';
import Form from "./Form";
import TestBackend from "./TestBackend";

ReactDOM.render(
  <React.StrictMode>
    <Form />
    {/*<TestBackend />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

