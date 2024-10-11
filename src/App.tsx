import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AudioRecorder from './components/AudioRecorder';
import ProtectedRoute from './components/ProtectedRoute';
import Background from './components/Background';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Background />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AudioRecorder />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;