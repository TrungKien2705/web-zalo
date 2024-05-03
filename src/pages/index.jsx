import React, { useEffect } from 'react';
import myUserInfo from '../models/user-info';
import { Page, useNavigate } from 'zmp-ui';
import '../css/app.scss';
import '../css/wellcome.scss';
import logoText from '../static/image/logo/logo-text.png';
import logo from '../static/image/logo/logo.png';
import homeModel from '../models/home';

const WellCome = () => {
    const navigateTo = useNavigate();

    useEffect(() => {
        async function getAllTopics() {}
        getAllTopics();
    }, []);
    useEffect(() => {
        myUserInfo.navigateTo = navigateTo;
        async function checkPage() {
            let resTopics = await homeModel.getAllTopics();
            homeModel.topicList = resTopics ? resTopics : [];
            homeModel.topicId = homeModel.topicList && homeModel.topicList[0].id;
            console.log(homeModel.topicList);
            console.log(homeModel.topicId);
            if (homeModel.topicId) {
                let res = await homeModel.getAllPostModel();
                console.log('first', res);
                homeModel.postList = res ? res : [];
                if (res && res.length > 0 && homeModel.postList && homeModel.postList.length > 0) {
                    navigateTo('/home');
                }
            }
        }
        checkPage();
    }, []);

    console.log(homeModel.topicList);
    return (
        <Page className="">
            <div className="wellcome-container">
                <div className="image-wellcome text-logo">
                    <img src={logoText} className="image-logo" />
                </div>
                <div className="image-wellcome mt-2">
                    <img src={logo} className="image-logo set-height" />
                </div>
                <div>
                    <div className="name-app text-slogan mb-4">Hiểu Mình &nbsp; Biết Vận</div>
                    <div className="name-app text-slogan">Chuyển Tâm &nbsp; Đổi Số</div>
                </div>
            </div>
        </Page>
    );
};

export default WellCome;
