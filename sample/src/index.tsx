import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import AppEx from './AppEx';
ReactDOM.render(
  <HashRouter>
    <AppEx />
  </HashRouter>,
  document.getElementById('root')
);
