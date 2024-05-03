import React, { useState, useEffect } from 'react';
import { Page, Box, Button } from 'zmp-ui';
import { useNavigate } from 'react-router';

import '../css/laso.scss';
import PageHeading from '../components/page-heading';
import BackgroundPage from '../static/image/background/logo-12.png';
import layLaso from '../models/laso';
import LaSoDetail from './lasoDetail';
import myUserInfo from '../models/user-info';
import BottomAlert from '../components/bottom-alert';
import { path } from '../constant';
import ModalLoading from '../components/modal-loading';
import changeAmlich, { checkLayLS, download1 } from '../tuvi';
import Config from '../config';

const LaSo = () => {
    const navigateTo = useNavigate();
    myUserInfo.navigateTo = navigateTo;
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [dayArray, setDayArray] = useState([]);
    const [monthArray, setMonthArray] = useState([]);
    const [yearArray, setYearArray] = useState([]);
    const [hourArray, setHourArray] = useState([]);
    const [minArray, setMinArray] = useState([]);
    const [name, setName] = useState(myUserInfo.fullname);

    const [currMonth, setCurrMonth] = useState(0);
    const [currYear, setCurrYear] = useState(0);

    const [image, setImage] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [isSolar, setIsSolar] = useState(true);

    useEffect(() => {
        console.log('myUserInfo.isRegistered', myUserInfo.isRegistered);
        if (!myUserInfo.isRegistered) {
            setMsg('Đăng ký tài khoản!');
            setError(true);
        }
    }, []);

    useEffect(() => {
        setDayArray(Array.from({ length: 31 }, (_, i) => i + 1));
        setMonthArray(Array.from({ length: 12 }, (_, i) => i + 1));
        const currentYear = new Date().getFullYear();
        setYearArray(Array.from({ length: currentYear - 1960 + 1 }, (_, i) => i + 1960));
        setHourArray(Array.from({ length: 24 }, (_, i) => i));
        setMinArray(Array.from({ length: 60 }, (_, i) => i));
    }, []);

    useEffect(() => {
        if (loaded) {
            setImage(download1());
            console.log(image);
            setLoading(false);
            setShowModal(true);
        }
    }, [loaded]);

    const handleLoadingImage = async () => {
        await checkLayLS(myUserInfo.role_id ?? 1, setLoaded, myUserInfo.accessToken);
    };

    const sumbitLaso = async () => {
        if (myUserInfo.statusMsg == 2) {
            setMsg('Liên hệ quản trị viên để kích hoạt tài khoản - số điện thoại: 0837901987');
            setError(true);
        } else if (name.length == 0) {
            setMsg('Chưa có tên đương số!');
            setError(true);
        } else if (name.length > 0) {
            setLoading(true);
            await handleLoadingImage();
        }
    };
    const handleCloseAlert = () => {
        if (!myUserInfo.isRegistered) {
            async function checkPage() {
                myUserInfo.isNextPage = false;

                navigateTo(path.HOME);
            }
            checkPage();
        } else {
            setError(false);
        }
    };

    const getDaysInYear = (year) => {
        const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        const daysInMonth = [
            31, // Jan
            isLeapYear ? 29 : 28, // Feb
            31, // Mar
            30, // Apr
            31, // May
            30, // Jun
            31, // Jul
            31, // Aug
            30, // Sep
            31, // Oct
            30, // Nov
            31, // Dec
        ];
        const daysInYear = daysInMonth.map((days) => Array.from({ length: days }, (_, i) => i + 1));
        return daysInYear;
    };
    const handleOnChangeYear = (e) => {
        setCurrYear(e.target.value);
        const data = getDaysInYear(e.target.value);

        setDayArray(data[currMonth]);
        // console.log(dayArray);
    };
    const handleOnChangeMonth = (e) => {
        setCurrMonth(e.target.value - 1);
        const data = getDaysInYear(currYear);

        setDayArray(data[e.target.value - 1]);
        // console.log(dayArray);
    };

    // console.log(yearArray);

    return (
        <>
            <PageHeading title={'Lá số'} />
            <Page className="page la-so" style={{ padding: '16px 16px 16px 16px' }}>
                <div className="backgound">
                    <img className="backgound-logo" src={BackgroundPage} alt="" />
                </div>
                <div className="laso-title">Phần Mềm An Sao</div>
                <form className="form-data">
                    <div className="group">
                        <input
                            type="text"
                            id="hovaten"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span className="highlight" />
                        <span className="bar" />
                        <label className="fullname">Họ tên</label>
                    </div>

                    <div className="radio">
                        <h4>Giới tính</h4>
                        <div className="radio-box">
                            <div className="form-check col-5">
                                <input
                                    defaultChecked
                                    className="form-check-input"
                                    type="radio"
                                    name="isNam"
                                    id="radio-male"
                                />
                                <label className="form-check-label" htmlFor="radio-male">
                                    Nam
                                </label>
                            </div>
                            <div className="form-check col-7">
                                <input className="form-check-input" type="radio" name="isNam" id="radio-female" />
                                <label className="form-check-label" htmlFor="radio-female">
                                    Nữ
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="radio">
                        <h4>Chọn lịch</h4>
                        <div className="radio-box">
                            <div className="form-check col-5">
                                <input
                                    onChange={() => setIsSolar(false)}
                                    className="form-check-input"
                                    type="radio"
                                    name="duonglich"
                                    id="amlich"
                                    onClick={() => changeAmlich(0)}
                                />
                                <label className="form-check-label" htmlFor="amlich">
                                    Âm lịch
                                </label>
                            </div>
                            <div className="form-check col-7">
                                <input
                                    onChange={() => setIsSolar(true)}
                                    onClick={() => changeAmlich(1)}
                                    defaultChecked
                                    className="form-check-input"
                                    type="radio"
                                    name="duonglich"
                                    id="duonglich"
                                />
                                <label className="form-check-label" htmlFor="duonglich">
                                    Dương lịch
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="radio">
                        <h4>Thời gian sinh</h4>
                        <div className="row">
                            <div className="mb-2 col-4">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="namsinh"
                                    name="namsinh"
                                    onChange={(e) => handleOnChangeYear(e)}
                                    placeholder="Năm"
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <select
                                    className="form-select"
                                    onChange={(e) => handleOnChangeMonth(e)}
                                    id="thangsinh"
                                    name="thangsinh"
                                    placeholder="Tháng"
                                >
                                    <option selected disabled value={0}>
                                        Tháng
                                    </option>
                                    {monthArray.map((item) => {
                                        return (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-2 col-4">
                                <select className="form-select" id="ngaysinh" name="ngaysinh">
                                    <option selected disabled value={0}>
                                        Ngày
                                    </option>
                                    {dayArray.map((item) => {
                                        return (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-2 col-4">
                                <select
                                    className="form-select"
                                    id={isSolar ? 'giosinhH' : 'giosinh'}
                                    name={isSolar ? 'giosinhH' : 'giosinh'}
                                >
                                    <option selected disabled value={0}>
                                        Giờ
                                    </option>
                                    {isSolar
                                        ? hourArray.map((item) => {
                                              return (
                                                  <option value={item} key={item}>
                                                      {item}
                                                  </option>
                                              );
                                          })
                                        : Config.CHINAM1.map((item) => (
                                              <option value={item.value} key={item.value}>
                                                  {item.label}
                                              </option>
                                          ))}
                                </select>
                            </div>
                            {isSolar ? (
                                <div className="mb-2 col-4">
                                    <select className="form-select" id="giosinhM" name="giosinhM">
                                        <option selected disabled value={0}>
                                            Phút
                                        </option>
                                        {minArray.map((item) => {
                                            return (
                                                <option value={item} key={item}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    {/* Loai anh */}
                    <div className="radio">
                        <h4>Loại ảnh</h4>
                        <div className="radio-box">
                            <div className="form-check col-7">
                                <input
                                    className="form-check-input"
                                    defaultValue="0"
                                    type="radio"
                                    name="anhMau"
                                    id="anhMau"
                                />
                                <label className="form-check-label" htmlFor="anhMau">
                                    Đen trắng
                                </label>
                            </div>
                            <div className="form-check col-5">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="anhMau"
                                    defaultValue="1"
                                    id="anhMau"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="anhMau">
                                    Màu
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Cỡ ảnh */}
                    <div className="radio">
                        <h4>Cỡ ảnh</h4>
                        <div className="radio-box">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="coanh"
                                    defaultValue="900x1269px"
                                    id="sizePhoto"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="sizePhoto">
                                    900x1269px
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Tùy chọn */}
                    <div className="radio">
                        <h4>Tùy chọn</h4>
                        <div className="radio-box check-custom row">
                            <div className="form-check col-12">
                                <input className="form-check-input" type="checkbox" name="checkTtinh" id="checkTtinh" />
                                <label className="form-check-label" htmlFor="checkTtinh">
                                    An vòng tướng tinh
                                </label>
                            </div>
                            <div className="form-check col-12">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkHan"
                                    id="checkHan"
                                    defaultChecked
                                />
                                <div className="row">
                                    <label className="form-check-label col-4" htmlFor="checkHan">
                                        Hạn năm
                                    </label>
                                    <div className="col-5">
                                        <input
                                            className="form-control"
                                            type="number"
                                            id="textNamHan"
                                            name="textNamHan"
                                            maxLength="10"
                                            // size="10"
                                            defaultValue="2023"
                                            placeholder="Năm Hạn"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-check col-6">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="checkLuu4Hoa"
                                        id="checkLuu4Hoa"
                                    />
                                    <label className="form-check-label" htmlFor="checkLuu4Hoa">
                                        Lưu tứ hóa
                                    </label>
                                </div>
                                <div className="form-check col-6">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="checkLuu4Duc"
                                        id="checkLuu4Duc"
                                    />
                                    <label className="form-check-label" htmlFor="checkLuu4Duc">
                                        Lưu tứ đức
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-check col-6">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="checkLuuDaiVan"
                                        id="checkLuuDaiVan"
                                    />
                                    <label className="form-check-label" htmlFor="checkLuuDaiVan">
                                        Lưu đại vân
                                    </label>
                                </div>
                                <div className="form-check col-6">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="checkLuuKhoiVietKhac"
                                        id="checkLuuKhoiVietKhac"
                                    />
                                    <label className="form-check-label" htmlFor="checkLuuKhoiVietKhac">
                                        Lưu các sao khác
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-check col-6">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="checkLocNhap"
                                        id="checkLocNhap"
                                    />
                                    <label className="form-check-label" htmlFor="checkLocNhap">
                                        Lộc Kỵ Nhập
                                    </label>
                                </div>
                                <div className="form-check col-6">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="checkLuuTuanTriet"
                                        id="checkLuuTuanTriet"
                                    />
                                    <label className="form-check-label" htmlFor="checkLuuTuanTriet">
                                        Lưu Tuần Triệt
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Luu Thai Tue */}
                    <div className="radio">
                        <h4>Lưu Thái Tuế theo</h4>
                        <div className="radio-box">
                            <div className="form-check col-7">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="luuthaitue"
                                    defaultValue="1"
                                    id="diaban"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="diaban">
                                    Địa bàn
                                </label>
                            </div>
                            <div className="form-check col-5">
                                <input
                                    className="form-check-input"
                                    defaultValue="0"
                                    type="radio"
                                    name="luuthaitue"
                                    id="tieuhan"
                                />
                                <label className="form-check-label" htmlFor="tieuhan">
                                    Tiểu hạn
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Ngôn ngữ */}
                    <div className="radio">
                        <h4>Ngôn ngữ trong lá số</h4>
                        <div className="radio-box">
                            <div className="form-check col-7">
                                <input
                                    className="form-check-input"
                                    defaultValue="0"
                                    type="radio"
                                    name="isNom"
                                    id="vn"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="vn">
                                    Việt
                                </label>
                            </div>
                            <div className="form-check col-5">
                                <input
                                    className="form-check-input"
                                    defaultValue="1"
                                    type="radio"
                                    name="isNom"
                                    id="chunom"
                                />
                                <label className="form-check-label" htmlFor="chunom">
                                    Nôm
                                </label>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '90px' }}>
                        <Box mt={5}>
                            <Button onClick={() => sumbitLaso()} fullWidth style={{ background: 'var(--primary-01)' }}>
                                Lấy lá số
                            </Button>
                        </Box>
                    </div>
                </form>
                <div style={{ display: 'none' }} id="divCanvas"></div>
                <BottomAlert onHide={handleCloseAlert} setError={setError} show={error} type={'error'} msg={msg} />
                <LaSoDetail
                    setLoaded={setLoaded}
                    loaded={loaded}
                    image={image}
                    setImage={setImage}
                    setName={setName}
                    show={showModal}
                    setShowModal={setShowModal}
                />
                <ModalLoading show={loading} />
            </Page>
        </>
    );
};

export default LaSo;
