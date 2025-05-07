import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
<<<<<<< HEAD
import { ChakraProvider } from "@chakra-ui/react";
=======
import { ChakraProvider } from '@chakra-ui/react';

>>>>>>> 7e0dc2ea8a76232a807cad12bcc021aeb3673514

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
<<<<<<< HEAD
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
=======
    <PersistGate loading={null} persistor={persistor}>
    <ChakraProvider>
       <App />
    </ChakraProvider>
       

>>>>>>> 7e0dc2ea8a76232a807cad12bcc021aeb3673514
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
