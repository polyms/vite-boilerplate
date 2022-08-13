import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container text-center my-auto">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/imgs/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src="/imgs/react.svg" className="logo react spin-slow" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card body>
        <Button data-testid="btnCount" variant="primary" onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
