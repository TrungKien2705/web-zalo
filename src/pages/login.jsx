import React, { useState } from 'react';
import myUserInfo from '../models/user-info';
import { Box, Button, Icon, Page } from 'zmp-ui';
import logoText from '../static/image/logo/logo-text.png';
import logo from '../static/image/logo/logo.png';
import '../css/register.scss';
import BottomAlert from '../components/bottom-alert';
import ModalLoading from '../components/modal-loading';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { path } from '../constant';
const Login = () => {
    const navigate = useNavigate();
    myUserInfo.navigateTo = navigate;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [isShow, setIsShow] = useState(false);
    const checkValidateInput = () => {
        let isValid = true;
        let arrState = [email, password];
        for (let i = 0; i < arrState.length; i++) {
            if (!arrState[i]) {
                isValid = false;
                break;
            } else if (password.length < 8) {
                setError(true);
                setMsg('Mật khẩu cần phải có 8 chữ!');
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
    const handleLoginUser = async () => {
        let isValid = checkValidateInput();
        if (isValid == false) return;
        setLoading(true);
        myUserInfo.email = email;
        myUserInfo.password = password;
        const data = await myUserInfo.login();
        console.log('data', data);
        if (data.status == 0) {
            setLoading(false);
            setMsg(data.msg || 'Đăng nhập thất bại!');
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
                                type="email"
                                className="form__field"
                                placeholder="Email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            <label htmlFor="email" className="form__label">
                                Email
                            </label>
                        </div>
                        <div className="form__group field">
                            <input
                                type={isShow ? 'text' : 'password'}
                                className="form__field"
                                placeholder="Mật khẩu"
                                name="password"
                                id="password"
                                minLength={8}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <span onClick={() => setIsShow(!isShow)}>
                                <Icon icon={isShow ? 'zi-hide' : 'zi-unhide'} className="icon-unhide" />
                            </span>
                            <label htmlFor="password" className="form__label">
                                Mật khẩu
                            </label>
                        </div>
                        <div className="mt-5    ">
                            <button
                                onClick={() => handleLoginUser()}
                                className="btn button-submit mb-3"
                                type="submit"
                                style={{ background: 'var(--primary-01)' }}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-4 fs-3">
                        Chưa có tài khoản?{' '}
                        <Link to={path.REGISTER} className="text-danger">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
            <ModalLoading show={loading} />
            <BottomAlert onHide={handleCloseAlert} show={error} type={'error'} msg={msg} />
        </Page>
    );
};

export default Login;
