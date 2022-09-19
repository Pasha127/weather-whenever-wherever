import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from "./Redux/Store";
import { Provider } from "react-redux";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);