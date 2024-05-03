import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'zmp-ui';
import IconLogo from '../static/image/logo/logo.png';
import { useNavigate } from 'react-router';

import '../css/alert.scss';
import myUserInfo from '../models/user-info';
import { path } from '../constant';

function BottomAlert(props) {
    const { setError, msg } = props;
    const [icon, setIcon] = useState(props.type);
    const navitage = useNavigate();
    const handleisRegistered = () => {
        if (!myUserInfo.isRegistered) {
            setError(false);
            navitage(path.REGISTER);
        }
    };
    switch (icon) {
        case 'success':
            setIcon('zi-check-circle');
            break;

        case 'error':
            setIcon('zi-close-circle');
            break;

        default:
            break;
    }

    return (
        <>
            <Offcanvas
                className={'alert-insmart ' + props.type}
                show={props.show}
                onHide={props.onHide}
                placement="bottom"
            >
                <Offcanvas.Body className="py-4 text-center">
                    <img src={IconLogo} alt="logo" className="mb-3" style={{ width: '11%' }} />
                    {props.type == 'error' ? (
                        <p className="fw-bold text-uppercase">{props.msg}</p>
                    ) : (
                        <Button color="#ffff" fullWidth onClick={() => handleisRegistered()}>
                            {props.msg}
                        </Button>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default BottomAlert;
