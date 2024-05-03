import React, { useState } from 'react';
import myUserInfo from '../models/user-info';
import { Box, Button, Page } from 'zmp-ui';
import logoText from '../static/image/logo/logo-text.png';
import logo from '../static/image/logo/logo.png';
import '../css/register.scss';
import BottomAlert from '../components/bottom-alert';
import ModalLoading from '../components/modal-loading';
import { useNavigate } from 'react-router';
const Register = () => {
    const navigate = useNavigate();
    myUserInfo.navigateTo = navigate;
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isInvalid, setInvalid] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const checkValidateInput = () => {
        let isValid = true;
        let arrState = [fullName, email, phoneNumber, password];
        for (let i = 0; i < arrState.length; i++) {
            if (!arrState[i]) {
                isValid = false;
                break;
            } else if (password.length < 8) {
                setError(true);
                setMsg('Mật khẩu cần phải có 8 chữ!');
                // setInvalid(true);
                isValid = false;
                break;
            }
        }
        return isValid;
    };

    const registerUser = (e) => {
        e.preventDefault();
    };
    const handleCloseAlert = () => {
        setError(false);
    };
    const handleRegisterUser = async () => {
        setInvalid(true);
        let isValid = checkValidateInput();
        if (isValid == false) return;
        setLoading(true);
        myUserInfo.fullname = fullName;
        myUserInfo.phoneNumber = phoneNumber;
        myUserInfo.email = email;
        myUserInfo.password = password;

        console.log(JSON.stringify(myUserInfo));

        const data = await myUserInfo.register();
        console.log('data', data);
        if (data.status == 0) {
            setLoading(false);
            setMsg(data.msg || 'Đăng ký thất bại!');
            setError(true);
        }
    };
    return (
        <Page className="page">
            <div className="container">
                <div className="name-app mt-2 mb-5 ">
                    <img src={logoText} alt="logo" className="logo-text" />
                </div>
                <div className="text-uppercase name-app text-white my-2">
                    <img src={logo} alt="logo" className="w-50 object-fit-cover" />
                </div>
                <div className="form">
                    <form method="post" onSubmit={(e) => registerUser(e)}>
                        <div className="form__group field">
                            <input
                                type="input"
                                className="form__field"
                                placeholder="Họ tên"
                                name="name"
                                id="name"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                                required
                            />
                            <label for="name" className="form__label">
                                Họ và tên
                            </label>
                        </div>
                        <div className="form__group field">
                            <input
                                type="tel"
                                className="form__field"
                                placeholder="Số điện thoại"
                                name="phone"
                                id="phone"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                value={phoneNumber}
                            />
                            <label for="phone" className="form__label">
                                Số điện thoại
                            </label>
                        </div>
                        <div className="form__group field">
                            <input
                                type="email"
                                className="form__field"
                                placeholder="Email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <label for="email" className="form__label">
                                Email
                            </label>
                        </div>
                        <div className="form__group field">
                            <input
                                type="password"
                                className="form__field"
                                placeholder="Mật khẩu"
                                name="password"
                                id="password"
                                minLength={8}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <label for="password" className="form__label">
                                Mật khẩu
                            </label>
                        </div>
                        <div style={{ marginTop: '90px' }}>
                            <Box mt={5}>
                                <button
                                    onClick={() => handleRegisterUser()}
                                    className="btn button-submit mb-3"
                                    type="submit"
                                    fullWidth
                                    style={{ background: 'var(--primary-01)' }}
                                >
                                    Đăng ký
                                </button>
                            </Box>
                        </div>
                    </form>
                </div>
            </div>
            <ModalLoading show={loading} />
            <BottomAlert onHide={handleCloseAlert} show={error} type={'error'} msg={msg} />
        </Page>
    );
};

export default Register;
