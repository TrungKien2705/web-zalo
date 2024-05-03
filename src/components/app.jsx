import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from 'zmp-ui';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '../css/GlobalStyles';
import { path } from '../constant';

import WellCome from '../pages';
import Register from '../pages/register';
import Layout from './layout-bottom';
import UserInfo from '../pages/user-info';
import HomePage from '../pages/home';
import Calendar from '../pages/Calendar';
import LaSo from '../pages/laso';
import LasoSave from '../pages/lasoSave';
import PostDetail from '../pages/post-detail';
import myUserInfo from '../models/user-info';
import ModalCalender from './modal-calender';
import FAQPage from '../pages/faqs';
import Notif from '../pages/notif';
import HanList from '../pages/HanList';
const MyApp = () => {
    myUserInfo.login();
    return (
        <RecoilRoot>
            <GlobalStyles>
                <App>
                    <SnackbarProvider>
                        <ZMPRouter>
                            <Routes>
                                <Route
                                    path={path.WELLCOME}
                                    element={
                                        <>
                                            <WellCome />
                                        </>
                                    }
                                ></Route>
                                <Route path={path.REGISTER} element={<Register />}></Route>
                                <Route
                                    path={path.FAQPAGE}
                                    element={
                                        <>
                                            <FAQPage />
                                        </>
                                    }
                                ></Route>
                                <Route element={<Layout />}>
                                    <Route
                                        path={path.USERINFOR}
                                        element={
                                            <>
                                                <UserInfo />
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path={path.HOME}
                                        element={
                                            <>
                                                <HomePage />
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path={path.CALENDAR}
                                        element={
                                            <>
                                                <Calendar />
                                            </>
                                        }
                                    ></Route>

                                    <Route
                                        path={path.CALENDARCHANGE}
                                        element={
                                            <>
                                                <ModalCalender />
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path={path.HOROSCOPE}
                                        element={
                                            <>
                                                <LaSo />
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path={path.HOROSCOPESAVE}
                                        element={
                                            <>
                                                <LasoSave />
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path={path.POSTDETAIL}
                                        element={
                                            <>
                                                <PostDetail />
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path={path.NOTIF}
                                        element={
                                            <>
                                                <Notif />
                                            </>
                                        }
                                    ></Route>
                                    <Route
                                        path={path.HAN}
                                        element={
                                            <>
                                                <HanList />
                                            </>
                                        }
                                    ></Route>
                                </Route>
                            </Routes>
                            {/* <BottomNavigationPage /> */}
                        </ZMPRouter>
                    </SnackbarProvider>
                </App>
            </GlobalStyles>
        </RecoilRoot>
    );
};
export default MyApp;
