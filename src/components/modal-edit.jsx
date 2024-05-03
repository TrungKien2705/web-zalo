import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import { Page, Modal } from 'zmp-ui';
import myUserInfo from '../models/user-info';
import { showToast } from 'zmp-sdk/apis';

function ModalEdit(props) {
    const { show, setShow } = props;
    const [fullName, setFullName] = useState(myUserInfo.fullname);
    const [phoneNumber, setPhoneNumber] = useState(myUserInfo.phoneNumber);
    const [email, setEmail] = useState(myUserInfo.email);

    const handleClose = () => setShow(false);
    const handleSaveInfor = async () => {
        myUserInfo.fullname = fullName;
        myUserInfo.email = email;
        myUserInfo.phoneNumber = phoneNumber;
        const data = await myUserInfo.editUserInfor();
        if (data.status > 0) {
            setShow(false);
            showToast({
                message: 'Sửa thông tin thành công!',
            });
        } else {
            showToast({
                message: 'Sửa thông tin thất bại!',
            });
        }
    };
    return (
        <>
            <Modal
                visible={show}
                title="Sửa thông tin"
                onClose={() => {
                    setShow(false);
                }}
                actions={[
                    {
                        text: 'Thoát ',
                        highLight: true,
                        close: true,
                    },
                    {
                        onClick: handleSaveInfor,
                        text: 'Lưu thông tin',
                        // close: true,
                        danger: true,
                    },
                ]}
            >
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            style={{ fontSize: '1.5rem' }}
                            onChange={(e) => setFullName(e.target.value)}
                            type="text"
                            value={fullName}
                            placeholder="Nhâp tên"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            style={{ fontSize: '1.5rem' }}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="Nhập email"
                        />
                    </Form.Group>
                </Form>
            </Modal>
        </>
    );
}

export default ModalEdit;
