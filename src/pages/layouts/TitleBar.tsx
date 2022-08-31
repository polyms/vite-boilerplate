import {
  faArrowsLeftRightToLine,
  faDownLeftAndUpRightToCenter,
  faMinusCircle,
  faPlusCircle,
  faTerminal,
  faUpRightAndDownLeftFromCenter,
  faWindowMinimize,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavLinkProps } from 'react-bootstrap';

function useToggle(callback?: null | (() => boolean), initial = false) {
  const [val, setVal] = useState(initial);
  const handleToggle = useCallback(
    () => setVal((oldVal) => (callback ? callback() : !oldVal)),
    [callback]
  );

  return [val, handleToggle, setVal] as [
    value: boolean,
    onToggle: typeof handleToggle,
    setValue: typeof setVal
  ];
}

function ActionButton({ variant = 'secondary', icon, onClick }: ActionButtonProps) {
  return (
    <Nav.Link onClick={onClick} className={`py-0 link-${variant}`}>
      <FontAwesomeIcon icon={icon} size="sm" />
    </Nav.Link>
  );
}

export function TitleBar() {
  const title = 'Polyms';
  const { DEV } = import.meta.env;
  const [isMaximized, , setMaximize] = useToggle(null, window.electron.isMaximized());
  // const [menu, setMenu] = useState();

  useEffect(() => {
    electron.onWindowMaximize(setMaximize);
    // electron.getMenu().then(console.log);
    return () => {
      electron.offWindowMaximize(setMaximize);
    };
  }, []);

  return (
    <Navbar bg="white" className="pb-0 pt-1 app-drag" sticky="top">
      <Container fluid className="ps-1 pe-2">
        <img src="./favicon/favicon.png" alt="logo" height={35} />
        <Navbar.Brand className="mx-auto py-0">{title}</Navbar.Brand>
        {DEV && (
          <Nav className="align-items-center border rounded-2 app-no-drag">
            <ActionButton
              variant="secondary"
              icon={faPlusCircle}
              onClick={window.electron.zoomIn}
            />
            <ActionButton
              icon={faArrowsLeftRightToLine}
              onClick={window.electron.actualSize}
            />
            <ActionButton icon={faMinusCircle} onClick={window.electron.zoomOut} />
          </Nav>
        )}
        <Nav className="align-items-center gap-2 ms-4 app-no-drag">
          {DEV && (
            <ActionButton icon={faTerminal} onClick={window.electron.toggleDevTools} />
          )}
          <ActionButton
            variant="dark"
            icon={faWindowMinimize}
            onClick={window.electron.minimize}
          />
          <ActionButton
            variant="dark"
            icon={
              isMaximized ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter
            }
            onClick={window.electron.maximize}
          />
          <ActionButton variant="dark" icon={faXmark} onClick={window.electron.close} />
        </Nav>
      </Container>
    </Navbar>
  );
}

// ======================================================================================

type ActionButtonProps = Pick<NavLinkProps, 'onClick'> &
  Pick<FontAwesomeIconProps, 'icon'> & {
    variant?:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'dark'
      | 'light';
  };
