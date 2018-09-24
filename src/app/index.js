import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import "../styles/main.scss";

import App from "./containers/App";
import store from "./store";

import {
  concatNumberDisplay,
  concatOperatorDisplay,
  concatDecimalDisplay,
  concatEqualDisplay,
  delKeyAction,
  clearAllAction
} from "./actions/KeyActions";

const mapStateToProps = (state) => ({
  keys: state.keys,
  inputs: state.inputs
})

const mapDispatchToProps = (dispatch) => ({
  keyAction: {
    concatNumberDisplay: (payload) => dispatch(concatNumberDisplay(payload)),
    concatOperatorDisplay: (payload) => dispatch(concatOperatorDisplay(payload)),
    concatDecimalDisplay: (payload) => dispatch(concatDecimalDisplay(payload)),
    concatEqualDisplay: () => dispatch(concatEqualDisplay()),
    delKeyAction: () => dispatch(delKeyAction()),
    clearAllAction: () => dispatch(clearAllAction()),
  },
})

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
