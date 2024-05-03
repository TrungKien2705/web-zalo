import React, { useEffect, useState } from 'react';
import { Page } from 'zmp-ui';
import '../css/post-detail.scss';
import PageHeading from '../components/page-heading';
import Author from '../static/image/author/user.svg';
import LoadingModal from '../components/modal-loading';
import BottomAlert from '../components/bottom-alert';
import myUserInfo from '../models/user-info';
import IconLogo from '../static/image/logo/logo.png';
import homeModal from '../models/home';

const PostDetail = () => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const [msg, setMsg] = useState('');
    useEffect(() => {}, []);
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    const onSuccessGetInfoPage = (data) => {
        setLoading(false);
        if (data.status == 0) {
            setMsg('Tải dữ liệu thất bại!');
        } else {
            myUserInfo.infoPage = data;
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <Page style={{ overflowX: 'hidden' }}>
            <PageHeading title={'Bài viết'} />
            <div className="post-banner mt-3">
                <img
                    src={homeModal.post.thumbnail ? homeModal.post.thumbnail : IconLogo}
                    alt="Logo"
                    className="post-banner-img"
                />
            </div>
            <div className="info-detail">
                <img src={homeModal.post.avatar ? homeModal.post.avatar : Author} alt="user" className="image-detail" />
                <div className="author">
                    <div className="name">{homeModal.post.name}</div>
                    <small className="time">{homeModal.post.created_at}</small>
                </div>
            </div>
            <div className="post-content">
                <h3 className="post-title">{homeModal.post.title}</h3>
                <div className="post-text" dangerouslySetInnerHTML={{ __html: homeModal.post.content }}></div>
                <div className="post-href">
                    <a target="_blank" href="https://zalo.me/0837901987">
                        Liên hệ trực tiếp
                    </a>
                </div>
            </div>
            <LoadingModal show={loading} />
            <BottomAlert show={showAlert} onHide={handleCloseAlert} type="success" msg={msg} />
        </Page>
    );
};

export default PostDetail;
