import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

function MainRoutes() {
  return (
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/*" element={<h1 className='display-2'>Wrong page!</h1>} />
    </Routes>
  );
}

ReactDOM.render(
  <Router>
    <MainRoutes />
  </Router>,
  document.getElementById('root')
);
