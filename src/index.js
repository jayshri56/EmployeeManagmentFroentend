import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your global styles
import App from './App'; // Main App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling
import { Provider } from 'react-redux'; // Redux Provider for state management
import store from './redux/store'; // Import the Redux store
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provide the Redux store and Router context to the App */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
