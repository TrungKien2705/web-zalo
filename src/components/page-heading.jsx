import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import '../css/PageHeading.scss';
import { Link } from 'react-router-dom';
import { Icon } from 'zmp-ui';

const PageHeading = (props) => {
    let { title, colorText } = props;
    // let check = colorText == 'Chỉnh sửa thông tin' ? true : false
    return (
        <Link className="back-to-page" to={-1}>
            <Icon icon="zi-arrow-left" className="fw-bold" />
            <span className={colorText ? 'text-heading text-white text-center' : 'text-heading text-center'}>
                {title}
            </span>
        </Link>
    );
};

export default PageHeading;
