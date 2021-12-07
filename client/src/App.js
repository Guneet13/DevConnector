import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
          <Landing />
          <Footer />
        </div>
        </Router>
      </Provider>
    )
  }
}
export default App;
