import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index'
import middleware from './middleware'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'


const store = createStore(reducer, middleware)
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , document.getElementById('root'));
