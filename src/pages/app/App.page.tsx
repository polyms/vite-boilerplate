import './App.scss';
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap';
import shallow from 'zustand/shallow';
import { useCounter } from '~/stores/counter.store';

export default function AppPage() {
  const { count, dec, inc } = useCounter((s) => s, shallow);

  return (
    <Container className="d-flex flex-column text-center my-auto pb-5">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="./imgs/vite.svg" className="logo p-4" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src="./imgs/react.svg"
            className="logo p-4 react spin-slow"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Card className="my-4 mx-auto">
        <Card.Header
          className="h4 text-primary bg-primary bg-opacity-10"
          data-testid="title"
        >
          count is {count}
        </Card.Header>
        <Card.Body>
          <ButtonGroup className="w-100">
            <Button variant="primary" onClick={inc} data-testid="increment">
              increment
            </Button>

            <Button variant="outline-danger" onClick={dec} data-testid="reduce">
              reduce
            </Button>
          </ButtonGroup>
        </Card.Body>
        <Card.Footer>
          Edit <code>src/app/App.page.tsx</code> and save to test HMR
        </Card.Footer>
      </Card>
      <p className="text-muted">Click on the Vite and React logos to learn more</p>
    </Container>
  );
}
