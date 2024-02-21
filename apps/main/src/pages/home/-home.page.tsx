import './home.module.scss'

import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropsWithChildren } from 'react'
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { useCounter } from '../../stores/counter.store'

const ChangeLangButton = ({ lng, children }: ChangeLangButtonProps) => {
  const { i18n } = useTranslation()

  return (
    <Button
      variant="primary"
      className="px-4"
      active={i18n.language === lng}
      onClick={() => {
        i18n.reloadResources(lng, undefined, () => {
          i18n.changeLanguage(lng)
        })
      }}
    >
      {children}
    </Button>
  )
}

export function HomePage() {
  const { count, dec, inc } = useCounter((s) => s)
  const { t } = useTranslation()

  return (
    <Container className="d-flex flex-column text-center my-auto pb-5">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/imgs/vite.svg" className="logo p-4" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src="/imgs/react.svg"
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
              {t('demo.increment')}
            </Button>

            <Button variant="outline-danger" onClick={dec} data-testid="reduce">
              {t('demo.reduce')}
            </Button>
          </ButtonGroup>
        </Card.Body>
        <Card.Footer>
          Edit <code>home.page.tsx</code> and save to test HMR
        </Card.Footer>
      </Card>
      <p className="text-muted">Click on the Vite and React logos to learn more</p>
      <hr />
      <div className="d-flex align-item-center justify-content-center">
        <FontAwesomeIcon icon={faLanguage} size="2x" className="me-3" />
        <ButtonGroup aria-label="Language">
          <ChangeLangButton lng="en">EN</ChangeLangButton>
          <ChangeLangButton lng="vi">VI</ChangeLangButton>
        </ButtonGroup>
      </div>
    </Container>
  )
}

// ================================================================================================

type ChangeLangButtonProps = PropsWithChildren<{
  lng: string
}>
