import React, { useState, useEffect } from 'react';
import { Page, useNavigate, Box, Button } from 'zmp-ui';
import '../css/result-la-so.scss';
import Laso from '../static/image/laso.png';

const Gallery = () => {
    const navigate = useNavigate();

    return (
        <Page className="page">
            <div className="result-la-so">
                <img src={Laso} alt="" className="la-so-img" />
            </div>
            <div className="la-so-button">
                <Box mt={5}>
                    <Button fullWidth style={{ background: 'var(--primary-01)' }}>
                        Tải về máy
                    </Button>
                </Box>
                <Box mt={5}>
                    <Button fullWidth style={{ background: '#DA956F' }}>
                        Lưu
                    </Button>
                </Box>
            </div>
        </Page>
    );
};

export default Gallery;
