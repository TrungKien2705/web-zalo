import { Outlet } from 'react-router-dom';
import React from 'react';
import BottomNavigationPage from './bottom-navigation';
import FAQComponents from './faqs-components';
import HeaderApp from './header-app';

const Layout = () => {
    return (
        <>
            <HeaderApp />
            <FAQComponents />
            <Outlet />
            <BottomNavigationPage />
        </>
    );
};

export default Layout;
