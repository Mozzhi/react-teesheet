import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'flex.css/dist/data-flex.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import 'lib-flexible';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
