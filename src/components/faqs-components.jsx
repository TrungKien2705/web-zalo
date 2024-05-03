import React from 'react';
import { useNavigate } from 'zmp-ui';
import '../css/FAQPage.scss';
import { path } from '../constant';
import IconAsk from '../static/icons/Ask.svg';
const FAQComponents = () => {
    const navigate = useNavigate();

    return (
        <span className="icon-faqs" onClick={() => navigate(path.FAQPAGE)}>
            <img className="image-icon" src={IconAsk} alt="icon" />
        </span>
    );
};

export default FAQComponents;
