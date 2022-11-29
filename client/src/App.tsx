import {useState, useEffect} from 'react';
import './App.css';
import {Login} from './pages/login';

function App() {

  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setData(data.message));
  }, [data]);

  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
