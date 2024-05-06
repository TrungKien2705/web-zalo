import React, { useEffect, useState } from 'react';
import '../css/user-infor.scss';
import PageHeading from '../components/page-heading';
import { Icon, Page } from 'zmp-ui';
import { useNavigate } from 'react-router';

import logo from '../static/image/logo/logo.png';
import Folder from '../static/icons/folder-green.svg';
import ArrowLong from '../static/icons/long-arrow.png';
import Star02 from '../static/image/khac/star02.svg';
import Star03 from '../static/image/khac/star03.svg';
import { path } from '../constant';
import LoadingModal from '../components/modal-loading';
import BottomAlert from '../components/bottom-alert';
import myUserInfo from '../models/user-info';
import { openWebview } from 'zmp-sdk/apis';
import ModalEdit from '../components/modal-edit';
import IconEdit from '../static/image/Editing.svg';
const UseInfo = () => {
    const navigateTo = useNavigate();
    myUserInfo.navigateTo = navigateTo;
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [error, setError] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    useEffect(() => {
        console.log('myUserInfo.isRegistered', myUserInfo.isRegistered);
        if (!myUserInfo.isRegistered) {
            setMsg('Đăng ký tài khoản!');
            setError(true);
        }
    }, []);

    const handleSaveLaSo = () => {
        navigateTo(path.HOROSCOPESAVE);
    };

    const handleCloseAlert = () => {
        if (!myUserInfo.isRegistered) {
            async function checkPage() {
                myUserInfo.isNextPage = false;
                setError(false);
                navigateTo(path.HOME);
            }
            checkPage();
        } else {
            setError(false);
        }
    };
    const openUrlInWebview = () => {
        openWebview({
            url: 'https://zalo.me/0837901987',
            success: (res) => {
                // xử lý khi gọi api thành công
            },
            fail: (error) => {
                // xử lý khi gọi api thất bại
                console.log(error);
            },
        });
    };
    const handleEditInfor = () => {
        setModalEdit(true);
    };
    return (
        <>
            <PageHeading title={'Thông tin tài khoản'} />
            <Page className="page">
                <section className="info_avatar">
                    <div>
                        <figure className="flex-grow">
                            <img
                                src={myUserInfo.avatar || 'https://ziczacvn.com/uploads/stores/2/2022/10/user.png'}
                                alt="avatar"
                            />
                            <figcaption>{myUserInfo.fullname}</figcaption>
                        </figure>
                        <img className="star" src={Star02} alt="star" />
                        <img className="star" src={Star02} alt="star" />
                        <img className="star" src={Star03} alt="star" />
                    </div>
                </section>
                <section className="container info-content">
                    <div className="info-content-title">
                        Thông tin
                        <span onClick={() => handleEditInfor()}>
                            <img className="icon-edit" src={IconEdit} alt="icon" />
                        </span>
                    </div>
                    <div className="info-box">
                        <div className="box-item">
                            <div className="d-flex align-items-center">
                                <Icon icon="zi-user" className="box-icon me-5 display-1 fw-bold" />
                                <div className="box-title">Họ tên</div>
                            </div>
                            <div className="box-text">{myUserInfo.fullname}</div>
                        </div>
                        <div className="box-item">
                            <div className="d-flex align-items-center">
                                <Icon icon="zi-call" className="box-icon display-1 me-5 fw-bold" />

                                <div className="box-title">Điện thoại</div>
                            </div>
                            <div className="box-text">{myUserInfo.phoneNumber}</div>
                        </div>
                        <div className="box-item">
                            <div className="d-flex align-items-center">
                                <Icon icon="zi-at" className="box-icon display-1 me-5 fw-bold" />

                                <div className="box-title">Email</div>
                            </div>
                            <div className="box-text">{myUserInfo.email}</div>
                        </div>
                        <a
                            target="_blank"
                            data-original-title
                            title="Liên hệ đặt lịch"
                            onClick={() => openUrlInWebview()}
                            className="btn btn-fw btn-success w-100 mt-3 my-5 fw-semibold text-wrap"
                        >
                            Liên hệ đặt lịch
                        </a>
                        <div className="line-bottom"></div>
                        <div className="box-item pt-3" onClick={() => handleSaveLaSo()}>
                            <div className="d-flex align-items-center">
                                <img className="box-icon me-5" src={Folder} alt="floder" />
                                <div className="box-title">Lá số đã lưu</div>
                            </div>
                            <img className="box-icon me-5" src={ArrowLong} alt="arrow" />
                        </div>
                        <div className="box-item pt-2" onClick={() => navigateTo(path.HAN)}>
                            <div className="d-flex align-items-center">
                                <img className="box-icon me-5" src={Folder} alt="email" />
                                <div className="box-title">Danh sách hạn</div>
                            </div>
                            <img className="box-icon me-5" src={ArrowLong} alt="email" />
                        </div>
                    </div>
                </section>
                <LoadingModal show={loading} />
                <ModalEdit show={modalEdit} setShow={setModalEdit} />
                <BottomAlert setError={setError} onHide={handleCloseAlert} show={error} type={'alert'} msg={msg} />
            </Page>
        </>
    );
};

export default UseInfo;
