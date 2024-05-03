import React, { useState, useEffect, useRef } from 'react';
import PageHeading from '../components/page-heading';
import LoadingModal from '../components/modal-loading';
import ModalLaSo from '../components/modal-laso';
import laSo from '../models/laso';
import BottomAlert from '../components/bottom-alert';
import { showToast } from 'zmp-sdk';
import layLaso from '../models/laso';

const LasoSave = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [Laso, setLaso] = useState([]);
    const [currImage, setCurrImage] = useState(0);
    const [msg, setMsg] = useState('');
    const [showError, setShowError] = useState(false);
    const [currId, setCurrId] = useState(0);

    useEffect(() => {
        getDanhSachLaso();
    }, []);

    const getDanhSachLaso = async () => {
        setLoading(true);
        let res = await laSo.getDanhSachLaso();
        setLaso(res ? res : []);
        setLoading(false);
    };

    const handleShowModal = (index, item) => {
        layLaso.idImage = item.id;
        let img = new Image();
        img.onload = function () {
            setCurrImage(index);
            setGallery(laSo.laSoList);
            setShowModal(true);
        };
        img.onerror = function () {
            showToast({
                message: 'Có lỗi xảy ra khi tải hình ảnh',
            });
        };
        img.src = item.thumbnail;
    };
    const handleCloseError = () => {
        setShowError(false);
    };

    return (
        <>
            <PageHeading title={'Danh sách lá số'} />
            <div className="container mt-3">
                <div className="row" style={{ marginBottom: '18%' }}>
                    {Laso && Laso.length > 0 ? (
                        Laso.map((item, index) => {
                            return (
                                <div className="col-6 p-2" key={item.id}>
                                    <img
                                        onClick={() => handleShowModal(index, item)}
                                        className="rounded-3"
                                        src={item.thumbnail}
                                        alt="laso"
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <span className="text-center fw-bold fs-4 mt-4">Chưa có lá số đã lưu!</span>
                    )}
                </div>
            </div>
            <ModalLaSo
                setLaso={setLaso}
                setCurrImage={setCurrImage}
                currImage={currImage}
                gallery={gallery}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <BottomAlert show={showError} onHide={handleCloseError} type="error" msg={msg} />
            <LoadingModal show={loading} />
        </>
    );
};

export default LasoSave;
