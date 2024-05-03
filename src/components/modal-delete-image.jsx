import React, { useState } from 'react';
import { Page, Modal } from 'zmp-ui';
import myUserInfo from '../models/user-info';
import { showToast } from 'zmp-sdk/apis';
import layLaso from '../models/laso';

function ModalDelete(props) {
    const { show, setShow, setLaso } = props;

    const handleDeleteLaso = async () => {
        const data = await layLaso.deleteImage();
        if (data.status > 0) {
            let res = await layLaso.getDanhSachLaso();
            setLaso(res ? res : []);
            setShow(false);
            showToast({
                message: 'Xóa ảnh thành công!',
            });
        } else {
            showToast({
                message: 'Xóa ảnh thất bại!',
            });
        }
    };
    return (
        <>
            <Modal
                visible={show}
                title="Xóa lá só"
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
                        onClick: handleDeleteLaso,
                        text: 'Xóa lá số',
                        // close: true,
                        danger: true,
                    },
                ]}
                description="Bạn xác nhận xóa lá số này ?"
            ></Modal>
        </>
    );
}

export default ModalDelete;
