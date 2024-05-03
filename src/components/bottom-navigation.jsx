import React, { useState } from 'react';
import IconLogo from '../static/image/logo/logo.png';
import '../css/bottomNav.scss';
import { NavLink } from 'react-router-dom';
import { path } from '../constant';
import { Icon } from 'zmp-ui';

const BottomNavigationPage = () => {
    return (
        <div className="navigation">
            <NavLink activeclassname="active" to={path.HOME} className="item-nav">
                <Icon className="icon-image" icon="zi-home"></Icon>
                <p className="icon-lable" htmlFor="">
                    Trang chủ
                </p>
            </NavLink>
            <NavLink activeclassname="active" to={path.CALENDAR} className="item-nav">
                <Icon icon="zi-calendar" className="icon-image" />
                <p className="icon-lable" htmlFor="">
                    Lịch
                </p>
            </NavLink>
            <NavLink activeclassname="active" to={path.HOROSCOPE} className="item-nav">
                <img className="icon-image" src={IconLogo} alt="home" />
                <p className="icon-lable" htmlFor="">
                    Lá Số và Hạn
                </p>
            </NavLink>
            {/* <NavLink activeclassname="active" to={path.NOTIF} className="item-nav">
                <Icon icon="zi-notif" className="icon-image" />
                <p className="icon-lable">Thông báo</p>
            </NavLink> */}
            <NavLink activeclassname="active" to={path.USERINFOR} className="item-nav">
                <Icon icon="zi-user" className="icon-image" />
                <p className="icon-lable" htmlFor="">
                    Tài khoản
                </p>
            </NavLink>
        </div>
    );
};

export default BottomNavigationPage;
