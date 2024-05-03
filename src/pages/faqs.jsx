import React from 'react';
import '../css/FAQPage.scss';
import { Page } from 'zmp-ui';
import { useState } from 'react';
import { useEffect } from 'react';
import homeModal from '../models/home';
import { Icon } from 'zmp-ui';
import Collapse from 'react-bootstrap/Collapse';
import PageHeading from '../components/page-heading';
import { openChat } from 'zmp-sdk/apis';
import HeaderApp from '../components/header-app';

const FAQPage = () => {
    const [faqs, setFaqs] = useState([]);
    const [open, setOpen] = useState(false);
    const [currOpen, setCurrOpen] = useState();
    useEffect(() => {
        const getAllFaqs = async () => {
            let res = await homeModal.getAllFaqs();
            if (res) {
                setFaqs(res);
            }
        };
        getAllFaqs();
    }, []);
    const handleOpenChat = (item) => {
        openChat({
            type: 'user',
            id: '8170778299408828313',
            message: `Tôi muốn hỏi rõ hơn "${item.question}"`,
            success: () => {},
            fail: (err) => {},
        });
    };

    const handleOpen = (id) => {
        if (id == currOpen) {
            setOpen(false);
            setCurrOpen(-2);
        } else {
            if (faqs) {
                let faqsList = faqs.length > 0 && faqs.filter((item) => item.id == id);
                // console.log(faqsList);
                faqsList.length > 0 &&
                    faqs.map((item) => {
                        if (item.id == id) {
                            setCurrOpen(id);
                        }
                    });
            }
            setOpen(true);
        }
    };

    return (
        <>
            <HeaderApp />
            <PageHeading title={'Câu hỏi thường gặp?'} />
            <Page>
                <section className="faq-container">
                    {faqs &&
                        faqs.length > 0 &&
                        faqs.map((item, index) => {
                            return (
                                <>
                                    <div className="faq-one" key={item.id}>
                                        <h2 className="faq-page">
                                            {item.question}
                                            <Icon
                                                onClick={() => handleOpen(item.id)}
                                                icon={
                                                    open == true && item.id == currOpen
                                                        ? 'zi-chevron-down'
                                                        : 'zi-chevron-up'
                                                }
                                                className="faq-page-icon faq-page-icon-top"
                                            ></Icon>
                                        </h2>
                                        <Collapse in={open == true && item.id == currOpen ? true : false}>
                                            <div className="faq-body">
                                                <div
                                                    className="faqs-text"
                                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                                >
                                                    {/* {!item.answer
                                                        ? ''
                                                        : stringWithLinks.split('\n').map((item) => {
                                                              return (
                                                                  <>
                                                                      {item}
                                                                      <br />
                                                                  </>
                                                              );
                                                          })} */}
                                                </div>

                                                <a
                                                    onClick={() => handleOpenChat(item)}
                                                    className="fw-bold fs-15 pt-4 pb-4"
                                                    target="_blank"
                                                >
                                                    Hỏi trực tiếp
                                                </a>
                                            </div>
                                        </Collapse>
                                    </div>
                                    <hr className="hr-line" />
                                </>
                            );
                        })}
                </section>
            </Page>
        </>
    );
};

export default FAQPage;
