import { Component, PropsWithChildren } from 'react';
import { Badge, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function ErrorRender({ error }: { error: Error }) {
  return (
    <>
      <li className="h5 d-flex align-items-center">
        <Badge bg="danger" className="me-2">
          {error.name}
        </Badge>
        {error.message}
      </li>
      {error.cause && <ErrorRender error={error.cause} />}
    </>
  );
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   console.log('componentDidCatch', JSON.stringify(error), errorInfo);
  // }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      // You can render any custom fallback UI
      return (
        <Container className="my-auto pb-5 d-flex" data-testid="error-boundary">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="me-5 display-1 fw-bold text-danger"
          />
          <div>
            <div className="display-3 fw-bold text-danger mb-5">Oops!</div>
            <h1>Something went wrong!</h1>
            <ErrorRender error={error} />
          </div>
        </Container>
      );
    }

    return children;
  }
}

// ======================================================================================

type ErrorBoundaryState = { error?: Error };
