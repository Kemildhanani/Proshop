import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css'//use for icon settings 

//redux

import {createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import { Provider } from "react-redux";
import { rootReducer } from './reducers/index';
import { ToastContainer } from 'react-toastify';
//store

const store=createStore(rootReducer,composeWithDevTools());


ReactDOM.render(

  <Provider store={store}>
  <BrowserRouter>
    <App />
    <ToastContainer/>
  </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);



