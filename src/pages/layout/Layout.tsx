import { lazy, memo } from 'react';
import { Outlet } from 'react-router-dom';
const Footer = lazy(() => import('../../components/footer/Footer'));
const Header = lazy(() => import('../../components/header/Header'));


const Layout = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default memo(Layout);