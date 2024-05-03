import React, { useEffect, useState } from 'react';
import { Page } from 'zmp-ui';
import PageHeading from '../components/page-heading';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import myUserInfo from '../models/user-info';
import '../css/han-list.scss';
import ModalContent from '../components/modal-content';
function HanList() {
    const [tieuHan, setTieuHan] = useState([]);
    const [daiHan, setDaiHan] = useState([]);
    const [show, setShow] = useState(false);
    const [itemHan, setItemHan] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const dataTieuHan = await myUserInfo.getListTieuHan();
            if (dataTieuHan.data.length > 0) {
                setTieuHan(dataTieuHan.data);
            }
            const dataDaiHan = await myUserInfo.getListDaiHan();
            if (dataDaiHan.data.length > 0) {
                setDaiHan(dataDaiHan.data);
            }
        };
        fetchData();
    }, []);
    const handleClickItemHan = (item) => {
        setShow(true);
        setItemHan(item);
    };
    return (
        <>
            <PageHeading title={'Danh sách hạn'} />

            <Page className="page">
                <div className="pt-2">
                    <Tabs defaultActiveKey="tab-1" id="justify-tab-example" transition={false} className="mb-3" justify>
                        <Tab eventKey="tab-1" title="Tiểu Hạn">
                            {tieuHan &&
                                tieuHan.map((item, index) => (
                                    <div className="col-12" key={index} onClick={() => handleClickItemHan(item)}>
                                        <div className="card box-shadow-2 mb-3 border-none">
                                            <p className="card-header d-flex justify-content-between bg-white fw-semibold">
                                                Họ và tên: {item.fullname}
                                            </p>
                                            <div className="my-2 mx-3">
                                                <div className="w-100">
                                                    <div className="">
                                                        <label className="form-label fw-semibold">Ngày giờ sinh:</label>{' '}
                                                        {item.birthday} - {item.hour_type}
                                                    </div>
                                                    <div>
                                                        <label className="form-label fw-semibold">Tên hạn:</label>{' '}
                                                        {item.tenhan_name}
                                                    </div>
                                                    <div className="">
                                                        <label className="form-label fw-semibold">Năm hạn:</label>{' '}
                                                        {item.year_han}
                                                    </div>
                                                    <div className="card-text w-100 d-flex align-items-center justify-content-between">
                                                        <span className="fw-semibold">Tỷ lệ</span>
                                                        <span className={`badge bg-danger${item.phantram}`}>
                                                            {item.phantram}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </Tab>
                        <Tab eventKey="tab-2" title="Đại Hạn">
                            {daiHan &&
                                daiHan.map((item, index) => (
                                    <div className="col-12" key={index} onClick={() => handleClickItemHan(item)}>
                                        <div className="card box-shadow-2 mb-3 border-none">
                                            <p className="card-header d-flex justify-content-between bg-white fw-semibold">
                                                Họ và tên: {item.fullname}
                                            </p>
                                            <div className="my-2 mx-3">
                                                <div className="w-100">
                                                    <div className="">
                                                        <label className="form-label fw-semibold">Ngày giờ sinh:</label>{' '}
                                                        {item.birthday} - {item.hour_type}
                                                    </div>
                                                    <div>
                                                        <label className="form-label fw-semibold">Tên hạn:</label>{' '}
                                                        {item.tenhan_name}
                                                    </div>
                                                    <div className="">
                                                        <label className="form-label fw-semibold">Tuổi hạn:</label>{' '}
                                                        khoảng {item.tuoi_han} tuổi
                                                    </div>
                                                    <div className="card-text w-100 d-flex align-items-center justify-content-between">
                                                        <span className="fw-semibold">Tỷ lệ</span>
                                                        <span className={`badge bg-danger${item.phantram}`}>
                                                            {item.phantram}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </Tab>
                    </Tabs>
                </div>
            </Page>
            <ModalContent show={show} setShow={setShow} data={itemHan} />
        </>
    );
}

export default HanList;
