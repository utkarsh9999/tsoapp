import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/Dashboard';
import Feed from './components/Feed';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={
                !isAuthenticated ? 
                <Login setIsAuthenticated={setIsAuthenticated} /> : 
                <Navigate to="/dashboard" />
              } />
              <Route path="/register" element={
                !isAuthenticated ? 
                <Register setIsAuthenticated={setIsAuthenticated} /> : 
                <Navigate to="/dashboard" />
              } />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={
                isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" />
              } />
              <Route path="/feed" element={
                isAuthenticated ? 
                <Feed /> : 
                <Navigate to="/login" />
              } />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
