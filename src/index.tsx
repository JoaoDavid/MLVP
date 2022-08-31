import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

if(process.env.NODE_ENV === 'production'){
    console.log = ()=>{}
    axios.defaults.baseURL = 'http://194.117.20.237:443';
}

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
