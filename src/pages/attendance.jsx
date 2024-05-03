import React, { useState, useEffect } from 'react';
import { Page, useNavigate, Radio, useSnackbar, Icon, Tabs, Avatar } from 'zmp-ui';
import PageHeading from '../components/page-heading';
import ImageLight from '../static/image/banner/Banner3.png';
import Author2 from '../static/image/author/Author2.png';

import '../css/post.scss';

const Attendance = () => {
    return (
        <Page className="page">
            <PageHeading title={'Bài viết'} />
            <div className="image-light">
                <img src={ImageLight} className="image-one" alt="picture" />
            </div>
            <section>
                <div className="author">
                    <img src={Author2} alt="" />
                    <div className="post-author">
                        <div className="author-name">Cây bút tài lộc</div>
                        <i className="author-date">
                            <span>Date: </span>30-04-2023
                        </i>
                    </div>
                </div>
                <article>
                    <div className="title">Xông nhà là gì và vì sao phải xem tuổi xông nhà?</div>
                    <div className="content">
                        Xông đất đầu năm trong ngày Tết Nguyên Đán là một nét văn hóa được lưu truyền từ bao thế hệ
                        người Việt. Ngoài việc xem và chọn tuổi xông đất ra, ông cha ta còn rất coi trọng việc lựa chọn
                        thời điểm xông đất tốt để mang lại nhiều may mắn, tài lộc cho gia chủ.
                        <br />
                        Xông đất đầu năm trong ngày Tết Nguyên Đán là một nét văn hóa được lưu truyền từ bao thế hệ
                        người Việt. Ngoài việc.......
                        <br />
                        Xông đất đầu năm trong ngày Tết Nguyên Đán là một nét văn hóa được lưu truyền từ bao thế hệ
                        người Việt. Ngoài việc.......
                        <br />
                        Xông đất đầu năm trong ngày Tết Nguyên Đán là một nét văn hóa được lưu truyền từ bao thế hệ
                        người Việt. Ngoài việc.......
                    </div>
                </article>
            </section>
        </Page>
    );
};

export default Attendance;
