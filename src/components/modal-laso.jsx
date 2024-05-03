import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import '../css/loading-page.scss';
import { saveImageToGallery, showToast } from 'zmp-sdk/apis';
import layLaso from '../models/laso';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import IconDowLoad from '../static/image/Download.svg';
import IconDelete from '../static/image/Delete.svg';
import ModalDelete from './modal-delete-image';
const ModalLaSo = (props) => {
    let { gallery, setShowModal, showModal, currImage, setCurrImage, setLaso } = props;
    const [currImageIndex, setCurrImageIndex] = useState('');
    const [modalDelete, setModalDelete] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    };
    const handleSelect = (indexCurr, e) => {
        gallery &&
            gallery.length > 0 &&
            gallery.map((item, index) => {
                if (index == indexCurr) {
                    setCurrImageIndex(item.thumbnail);
                }
            });
        setCurrImage(indexCurr);
    };
    const handleDowloadImage = async () => {
        console.log(currImageIndex);
        try {
            await saveImageToGallery({
                imageUrl: currImageIndex,
            });
            showToast({
                message: 'Tải ảnh thành công!',
            });
        } catch (error) {
            showToast({
                message: 'Tải ảnh thất bại!',
            });
            console.log(error);
        }
    };
    const handleDeleteImage = async () => {
        setShowModal(false);
        setModalDelete(true);
    };
    console.log('currId', layLaso.idImage);

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal-gallery h-100"
                backdropClassName="modal-backdrop foo-modal-backdrop"
            >
                <Modal.Body
                    style={{
                        padding: '0px',
                    }}
                >
                    <span onClick={() => handleDowloadImage()}>
                        <img src={IconDowLoad} className="icon-download" alt="icon" />
                    </span>
                    <span onClick={() => handleDeleteImage()}>
                        <img src={IconDelete} className="icon-delete" alt="icon" />
                    </span>
                    <Carousel
                        onSelect={handleSelect}
                        activeIndex={currImage}
                        controls={false}
                        interval={null}
                        indicators={false}
                        wrap={false}
                        touch={false}
                    >
                        {gallery &&
                            gallery.length > 0 &&
                            gallery.map((item, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <TransformWrapper>
                                            <TransformComponent>
                                                <img
                                                    className="d-block w-100 "
                                                    src={item.thumbnail}
                                                    alt={`image-${index}`}
                                                />
                                            </TransformComponent>
                                        </TransformWrapper>
                                    </Carousel.Item>
                                );
                            })}
                    </Carousel>
                </Modal.Body>
            </Modal>
            <ModalDelete setLaso={setLaso} handleClose={handleClose} show={modalDelete} setShow={setModalDelete} />
        </>
    );
};

export default ModalLaSo;
