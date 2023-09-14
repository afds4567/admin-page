import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div>Header</div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
