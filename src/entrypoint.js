import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react"

import App from "./App";

const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);

registerRootComponent(Root);