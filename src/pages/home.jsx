import React, { useEffect, useRef, useState } from 'react';
import { Page, Avatar, Icon, Box, Checkbox, Select, Tabs } from 'zmp-ui';
import { useNavigate } from 'react-router';

import { path } from '../constant';
import '../css/home.scss';
import homeModel from '../models/home';
import Slider from 'react-slick';
import ModalLoading from '../components/modal-loading';
import IconLogo from '../static/image/logo/logo.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardAnnouncement from '../components/card-announcement';
import Config from '../config';
import iconMenu from '../static/icons/Menu.svg';
import Collapse from 'react-bootstrap/Collapse';
const Home = () => {
    const navigate = useNavigate();
    const ref = useRef();
    const [loading, setLoading] = useState(false);
    const [isShowFeed, setShowFeed] = useState(true);
    const [post, setPost] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [topicList, setTopicList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [currIdTopic, setCurrIdTopic] = useState(0);
    const [showTopic, setShowTopic] = useState(true);

    useEffect(() => {
        homeModel.topicList.length == 0 ? handleSetTopic() : setTopicList(homeModel.topicList);
        console.log(homeModel.topicList);
        // sortTopic(homeModel.topicList);
    }, []);
    useEffect(() => {
        homeModel.reset();
        homeModel.postList.length == 0 && getAllPost();

        if (homeModel.postList) {
            setPost(homeModel.postList);
        }
        setShowFeed(true);
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        document.addEventListener('selectstart', function (e) {
            e.preventDefault();
        });
    }, []);
    const getAllPost = async () => {
        setLoading(true);
        let res = await homeModel.getAllPostModel();
        setPost(res ? res : []);
        homeModel.postList = res ? res : [];

        if (res.status > 0) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const fetchMorePost = async () => {
        console.log('fetchMorePost DATA');
        // console.log('page', homeModel.page);
        homeModel.page += 1;
        let res = await homeModel.getAllPostModel();
        console.log(res);
        let resPost = [...post, ...res];
        // console.log('resPost', resPost);
        if (resPost) {
            let postFilter = resPost.filter((item) => {
                return item.topic_id == resPost[0].topic_id;
            });
            setPostList(postFilter);
            setPost([...post, ...res]);
        }

        if (homeModel.isStop) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    };

    const settings = {
        className: 'section-outstanding__slider',
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        rows: 2,
        dots: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1198,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                },
            },
        ],
    };
    const handlePostDetail = (item) => {
        homeModel.post = item;
        navigate('/post-detail');
    };
    const handleSetTopic = async () => {
        const res = await homeModel.getAllTopics();

        setTopicList(res ? res : []);
        homeModel.topicId = res[0].id;
    };
    const handleTabTopic = (e) => {
        setCurrIdTopic(e);
        homeModel.topicId = e;
        homeModel.reset();
        getAllPost();
    };

    // console.log(homeModel.topicId);

    return (
        <Page className="page" style={{ overflow: 'auto' }}>
            {isShowFeed == true ? (
                <InfiniteScroll
                    dataLength={post.length}
                    next={fetchMorePost}
                    hasMore={hasMore}
                    style={{ overflow: 'hidden auto', width: '100%' }}
                    // loader={<LoadingPage />}
                    height={'calc(100vh - 90px)'}
                >
                    <div className="home-title">Bài viết cho bạn</div>
                    <Slider ref={ref} {...settings}>
                        {post &&
                            post.length > 0 &&
                            post.slice(0, 4).map((item) => {
                                return (
                                    <div
                                        className="banner-item"
                                        key={item.id}
                                        onClick={() => {
                                            handlePostDetail(item);
                                        }}
                                    >
                                        <img
                                            src={item.thumbnail ? item.thumbnail : IconLogo}
                                            alt="banner"
                                            className="image-banner"
                                        />
                                    </div>
                                );
                            })}
                    </Slider>
                    <section id="list-post">
                        <div className="mt-5">
                            <div className="row">
                                <div
                                    className="col-1 d-flex justify-content-center align-items-center"
                                    style={{ padding: '12px 0px' }}
                                    onClick={() => setShowTopic(!showTopic)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={showTopic}
                                >
                                    <img src={iconMenu} alt="icon Menu" width={20} height={20} />
                                </div>
                                <Collapse in={showTopic} dimension="width">
                                    <div className="col-11">
                                        <Tabs
                                            activeKey={homeModel?.topicId?.toString()}
                                            onChange={(e) => handleTabTopic(e)}
                                            id="contact-list"
                                            scrollable
                                        >
                                            {topicList &&
                                                topicList.length > 0 &&
                                                topicList.map((item) => {
                                                    return <Tabs.Tab key={item.id} label={item.name}></Tabs.Tab>;
                                                })}
                                        </Tabs>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <article>
                            {post &&
                                post.length > 0 &&
                                post.map((item, index) => {
                                    return (
                                        <>
                                            <div
                                                key={item.id}
                                                className="post"
                                                onClick={() => {
                                                    handlePostDetail(item);
                                                }}
                                            >
                                                <img
                                                    className="ratio ratio-1x1"
                                                    src={item.thumbnail ? item.thumbnail : IconLogo}
                                                />
                                                <div className="content">
                                                    <div className="post-title">{item.title}</div>
                                                    <div className="post-author">
                                                        <div className="author-name">{item.name}</div>
                                                        <i className="author-date">
                                                            <span>{item.created_at}</span>
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </article>
                    </section>
                </InfiniteScroll>
            ) : (
                <CardAnnouncement title={Config.IS_FEED} />
            )}
            <ModalLoading show={loading} />
        </Page>
    );
};

export default Home;
