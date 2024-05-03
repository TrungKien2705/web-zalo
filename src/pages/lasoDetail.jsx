import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Icon, Page } from 'zmp-ui';
import myUserInfo from '../models/user-info';
import { Modal } from 'react-bootstrap';
import { checkLayLS, download1 } from '../tuvi.js';
import { saveImageToGallery } from 'zmp-sdk/apis';
import LoadingPage from '../components/loading-page';
import { showToast } from 'zmp-sdk/apis';
import layLaso from '../models/laso';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
const LaSoDetail = (props) => {
    const { show, setShowModal, setName, setLoading, image, setImage, loaded, setLoaded } = props;
    // const [image, setImage] = useState('');
    // const [loaded, setLoaded] = useState(false);
    const [msg, setMsg] = useState('');
    const [imageError, setImageError] = useState(true);

    const closeModal = () => {
        setShowModal(false);
        setLoaded(false);
    };
    // useEffect(() => {
    //     if (show === true) {
    //         checkLayLS(myUserInfo.role_id ?? 1, setLoaded, myUserInfo.accessToken);
    //         handleShowImageError();
    //     } else {
    //         setName('');
    //     }
    // }, [show]);
    // useEffect(() => {
    //     function checkPage() {
    //         if (show === true) {
    //             setImage(download1());
    //         }
    //     }
    //     checkPage();
    // }, [show, loaded]);
    useEffect(() => {
        const image = new Image();
        image.src = image;

        const handleImageLoaded = () => {
            setLoading(false);
            setImageError(false);
        };

        image.addEventListener('load', handleImageLoaded);

        return () => {
            image.removeEventListener('load', handleImageLoaded);
        };
    }, [image]);

    const handleShowImageError = () => {
        let img = new Image();
        img.onload = function () {
            setMsg('');
            setLoading(false);
        };
        img.onerror = function () {
            setMsg(
                'Bạn đã hết lượt lấy lá số ngày hôm nay. Xin vui lòng quay trở lại vào ngày mai để lấy lá số tiếp! Xin cảm ơn quý khách!',
            );
            setImageError(true);
            setLoading(false);
        };
        img.src = image;
    };
    const handleImageLoaded = () => {
        setImageError(false);
        setLoading(false);
    };

    const handleDownLoad = async () => {
        setImage(download1());
        saveImageToGallery({
            imageBase64Data: image,
            success: (res) => {
                showToast({
                    message: 'Tải ảnh thành công!',
                });
            },
            fail: (error) => {
                showToast({
                    message: 'Tải ảnh thất bại!',
                });
            },
        });
    };
    const startUploadFile = async () => {
        setImage(download1());
        layLaso.thumbnailSave = image;
        layLaso.photoList = [image];
        console.log('startUploadFile::=>>sv--01');
        let res = await layLaso.registerUploadFile();
        console.log(res);
        if (res.status == 1) {
            let resImage = await layLaso.getUploadingImage();
            if (resImage.status > 0) {
                showToast({
                    message: 'Lưu ảnh thành công!',
                });
            } else {
                showToast({
                    message: 'Lưu ảnh thất bại',
                });
            }
        } else if (res.status == 0) {
            // setLoading(false);
            setMsg('Upload thất bại!');
            setShowError(true);
            layLaso.resetData();
            return;
        }
    };

    return (
        <Modal onHide={closeModal} show={show} fullscreen={true}>
            <div onClick={closeModal} className="back-to-page" style={{ marginBottom: '10px' }}>
                <Icon icon="zi-arrow-left" className="fw-bold" />
                <span className="text-heading text-center">Lá số của bạn</span>
            </div>
            {/* <div style={{ display: 'none' }} id="divCanvas"></div> */}
            {/* {imageError && (
                <div className="mt-4">
                    <LoadingPage />
                </div>
            )} */}
            {layLaso.statusMsg == 2 && (
                <h3 className="fs-10 fw-bold m-2 mt-2">
                    Ảnh bị lỗi hoặc bạn đã hết lượt lấy lá số ngày hôm nay. Xin vui lòng quay trở lại vào ngày mai !
                </h3>
            )}
            <div style={{ display: imageError ? 'none' : 'block' }}>
                <TransformWrapper>
                    <TransformComponent>
                        <img
                            onLoad={(e) => handleImageLoaded(e)}
                            style={{ display: imageError ? 'none' : 'block' }}
                            src={image}
                            className="d-block w-100 "
                            alt={`Lá số`}
                        />
                    </TransformComponent>
                </TransformWrapper>
            </div>

            <Modal.Footer style={{ borderTop: 'none', display: imageError == true ? 'none' : 'block' }}>
                <div style={{ width: '100%' }}>
                    <Box>
                        <a onClick={() => handleDownLoad()}>
                            <Button type="submit" fullWidth style={{ background: 'var(--primary-01)' }}>
                                Tải về máy
                            </Button>
                        </a>
                    </Box>
                    <Box mt={4}>
                        <Button onClick={() => startUploadFile()} fullWidth style={{ background: 'var(--primary-04)' }}>
                            Lưu
                        </Button>
                    </Box>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default LaSoDetail;
