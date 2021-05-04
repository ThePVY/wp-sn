import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store-redux";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        color: rgb(122, 134, 134);
    }
    html,
    body,
    #root {
        height: 100vh;
    }
    a {
      color: rgb(122, 134, 134);
      text-decoration: none;
    }
    a.active {
      color: rgb(148, 160, 160);
    }
`;

ReactDOM.render(
  <React.StrictMode>
    <HashRouter hashType="slash">
      <Provider store={store}>
        <App />
        <GlobalStyles />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
