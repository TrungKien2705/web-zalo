import React, { useEffect, useState } from 'react';
import { Avatar, Page } from 'zmp-ui';
import PageHeading from './../components/page-heading';
import myUserInfo from './../models/user-info';
import '../css/notif.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

function Notif() {
    const [listNoti, setNotif] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        myUserInfo.pageNotif = 0;
        const fetchData = async () => {
            const data = await myUserInfo.getListNotif();
            if (data) {
                setNotif(data);
            }
        };
        fetchData();
    }, []);
    const fetchMoreData = async () => {
        console.log('before call api');
        let res = await myUserInfo.getListNotif();
        console.log('called api');
        let data = res ? res : [];
        console.log(listNoti);

        if (data.length === 0) {
            setHasMore(false);
        }
        setNotif((prevNotif) => [...prevNotif, ...data]);
    };
    console.log(listNoti);

    const ItemNotification = ({ title, content, thumbnail }) => {
        return (
            <div className="not-item bg-white d-flex gap-3 align-items-start justify-content-flex-start rounded-3 p-3 my-2">
                <Avatar src={thumbnail} size={64} backgroundColor="PURPLE-BLUE" />
                <div>
                    <span className="not-title fw-semibold mb-4 ms-2">{title}</span>
                    <div className="not-content ms-2">
                        <div className="not-content-message d-flex">
                            <span>{content}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <PageHeading title="Thông báo" />
            <Page className="page" id="notification">
                <div className="">
                    <div className="my-3">
                        <InfiniteScroll
                            dataLength={listNoti.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={listNoti.length > 10 ? <LoadinDots /> : ''}
                            endMessage={
                                listNoti.length > 10 && <p className="text-center text-secondary my-2">Hết thông báo</p>
                            }
                            height={'79vh'}
                        >
                            {listNoti && listNoti.length > 0 ? (
                                listNoti.map((item, index) => (
                                    <ItemNotification
                                        thumbnail={item.thumbnail}
                                        key={index}
                                        title={item.title}
                                        send_time={item.send_time}
                                        content={item.content}
                                    />
                                ))
                            ) : (
                                <h5 className="text-center mt-5">Bạn chưa có thông báo!</h5>
                            )}
                        </InfiniteScroll>
                    </div>
                </div>
            </Page>
        </>
    );
}

export default Notif;
