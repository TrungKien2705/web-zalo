import { Icon } from 'zmp-ui';
import '../css/header-app.scss';
import React from 'react';
import { path } from '../constant';
import myUserInfo from '../models/user-info';
import { useNavigate } from 'react-router';

const HeaderApp = () => {
    const navigate = useNavigate();
    const handleClickNotif = () => {
        if (myUserInfo.register) {
            navigate(path.NOTIF);
        } else {
            navigate(path.REGISTER);
        }
    };
    return (
        <header className="haeder-app">
            <span onClick={handleClickNotif}>
                <Icon icon="zi-notif" className="icon-notif" />
            </span>
            <div className="title-app">
                <span>Tử Vi Chân Cơ</span>
            </div>
            <div className="hidden"></div>
        </header>
    );
};

export default HeaderApp;
