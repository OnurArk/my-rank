import { FC, Fragment, ReactNode } from 'react';

import Header from './header/header';
import Footer from './footer/footer';

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
