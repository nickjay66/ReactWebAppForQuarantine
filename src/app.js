//install -> import -> use
//import validate, react, react-dom, babel-core, babel-loader
import React from 'react';
import ReactDOM from 'react-dom';
import QuarantineApp from './components/QuarantineApp';
import 'normalize.css/normalize.css'; 
import './styles/styles.scss';


ReactDOM.render(<QuarantineApp />, document.getElementById('app'));




