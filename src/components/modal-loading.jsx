import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import '../css/loading-page.scss';

function ModalLoading(props) {
    let { show } = props;
    return (
        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered className="modal-loading">
            <Modal.Body>
                <Spinner size="sm" animation="border" role="status" variant="light"></Spinner>
            </Modal.Body>
        </Modal>
    );
}

export default ModalLoading;
