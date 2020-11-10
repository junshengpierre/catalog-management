import { Navbar, Container } from 'react-bootstrap'
import Head from 'next/head'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { format } from 'date-fns'

export const MainLayout = ({ children }): JSX.Element => (
  <div className="d-flex flex-column h-100">
    <Head>
      <title>Catalog Management System</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Global
      styles={css`
        html,
        body,
        #__next {
          height: 100%;
        }
      `}
    />

    <Main>
      <Header />
      {children}
    </Main>

    <Footer className="bg-dark text-white px-0" fluid as="footer">
      <Container className="py-3 d-flex justify-content-center">
        {`${format(new Date(), 'yyyy')} Catalog Management System`}
      </Container>
    </Footer>
  </div>
)

const Main = styled.main`
  flex: 1 0 auto;
`

const Header = () => (
  <Container className="bg-light px-0" fluid>
    <Container>
      <Navbar bg="transparent" expand="lg" className="px-0">
        <Navbar.Brand href="/">Catalog Management System</Navbar.Brand>
      </Navbar>
    </Container>
  </Container>
)

const Footer = styled(Container)`
  flex-shrink: 0;
`
