import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation';
import Home from './routes/home/home';
import Graph from './routes/graph/graph';
import Pay from './routes/pay/pay';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="graph" element={<Graph />} />
          <Route path="pay" element={<Pay />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
