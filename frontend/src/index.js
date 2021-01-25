import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import history from './utils/history';
import { UserProvider } from './context/user-context';

import authReducer from './store/reducers/auth';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(authReducer, composeEnhances(
    applyMiddleware(thunk)
));

const user = {
  token: localStorage.getItem('token'),
  user: {
    name: null, 
    isAuthenticated: !!localStorage.getItem('token')
  }
};

//using react-redux
// ReactDOM.render(
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>,
//   document.getElementById('root')
// );

//using react context
ReactDOM.render(
    <UserProvider value={user}>
      <Router>
        <App />
      </Router>
    </UserProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();