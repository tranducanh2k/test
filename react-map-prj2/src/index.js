import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./app/store";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "./translation/i18n";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import SignUpContainer from "./src/SignUpContainer"
import { MuiThemeProvider } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/store";

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </I18nextProvider>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
