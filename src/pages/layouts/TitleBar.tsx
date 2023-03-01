import {
  faCompress,
  faDownLeftAndUpRightToCenter,
  faExpand,
  faTerminal,
  faUpRightAndDownLeftFromCenter,
  faWindowMinimize,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { CSSProperties, useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavLinkProps } from 'react-bootstrap';
import { useAppConfig } from '~/stores/app.store';

// function useToggle(callback?: null | (() => boolean), initial = false) {
//   const [val, setVal] = useState(initial);
//   const handleToggle = useCallback(
//     () => setVal((oldVal) => (callback ? callback() : !oldVal)),
//     [callback]
//   );

//   return [val, handleToggle, setVal] as [
//     value: boolean,
//     onToggle: typeof handleToggle,
//     setValue: typeof setVal
//   ];
// }

function ActionButton({ icon, ...props }: ActionButtonProps) {
  return (
    <Nav.Link {...props} className="py-0">
      <FontAwesomeIcon icon={icon} size="sm" />
    </Nav.Link>
  );
}

export function TitleBar() {
  const { DEV } = import.meta.env;
  const { isMaximized, isFullscreen } = useAppConfig((s) => s);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const elem = document.getElementById('main');
    const onScroll = () => setSticky(!!elem?.scrollTop);

    elem?.addEventListener('scroll', onScroll);

    return () => {
      elem?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Navbar
      bg="white"
      className={classNames('pb-0 pt-0 app-drag border-3 border-light', {
        'border-bottom': isSticky,
      })}
      sticky="top"
    >
      <Container fluid className="ps-1 pe-2">
        <img src="./favicon/favicon.png" alt="logo" height={35} className="pe-5 me-5" />
        <Navbar.Brand className="mx-auto ps-5 py-0">{document.title}</Navbar.Brand>
        <Nav
          className="align-items-center gap-2 ms-4 app-no-drag"
          style={
            {
              '--bs-nav-link-color': 'var(--bs-gray-800)',
              '--bs-nav-link-disabled-color': 'var(--bs-gray-300)',
            } as CSSProperties
          }
        >
          {DEV && (
            <ActionButton icon={faTerminal} onClick={window.electron.toggleDevTools} />
          )}
          <ActionButton
            icon={faWindowMinimize}
            disabled={isFullscreen}
            onClick={window.electron.minimize}
          />
          <ActionButton
            icon={
              isMaximized ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter
            }
            disabled={isFullscreen}
            onClick={window.electron.maximize}
          />
          <ActionButton
            icon={isFullscreen ? faCompress : faExpand}
            onClick={window.electron.fullscreen}
          />
          <ActionButton
            icon={faXmark}
            onClick={window.electron.close}
            style={{ '--bs-nav-link-hover-color': 'var(--bs-danger)' } as CSSProperties}
          />
        </Nav>
      </Container>
    </Navbar>
  );
}

// ======================================================================================

type ActionButtonProps = Pick<NavLinkProps, 'onClick' | 'disabled' | 'style'> &
  Pick<FontAwesomeIconProps, 'icon'>;
