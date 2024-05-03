import React from 'react';
import { Box, Button, Modal } from 'zmp-ui';

function ModalContent({ show, setShow, data }) {
    let result = JSON.parse(data.result);
    const des = (
        <div>
            <div>
                <label className="form-label fw-semibold">Loại hạn: {result?.loaihan}</label>
            </div>
            <div>
                <label className="form-label fw-semibold">Nội dung:</label>
                <p style={{ textAlign: 'justify' }}>{result?.noidung}</p>
            </div>
        </div>
    );
    return (
        <Modal
            visible={show}
            title="Nôi dung Hạn"
            onClose={() => {
                setShow(false);
            }}
            verticalActions
            description={des}
        >
            <Box p={2}>
                <Button
                    type="danger"
                    onClick={() => {
                        setShow(false);
                    }}
                    fullWidth
                >
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
}

export default ModalContent;
