import React from 'react';
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import HomePage from './Pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
