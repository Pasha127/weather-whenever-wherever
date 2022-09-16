
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import FourOFour from './Components/404';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />      
      <Route path="*" element={<FourOFour/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
