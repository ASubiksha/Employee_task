import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chumma from './Chumma';
import View from './View';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route to the Chumma component */}
        <Route path="/" element={<Chumma />} />
        <Route path="/display" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
