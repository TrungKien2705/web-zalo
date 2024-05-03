import React, { useEffect, useState } from 'react';
import { Box, DatePicker, Page } from 'zmp-ui';
import PageHeading from './page-heading';
import { LunarDate } from 'vietnamese-lunar-calendar';
import moment from 'moment';
import ChangeCal from '../static/icons/change.svg';
import '../css/calendar.scss';
import solarLunar from 'solarLunar';

const ModalCalender = () => {
    const [solarDay, setsolarDay] = useState(new Date());

    const [change, setChange] = useState(false);

    const handleOnChangeDate = (e) => {
        setChange(true);
        setsolarDay(e);
    };
    const setDay = parseInt(moment(solarDay).format('D'));
    const setMM = parseInt(moment(solarDay).format('M'));
    const setYYYY = parseInt(moment(solarDay).format('YYYY'));

    const setyesterday = parseInt(moment(solarDay).subtract(1, 'days').format('D'));
    const setDayNext = parseInt(moment(solarDay).add(1, 'days').format('D'));

    const solar2lunarData = solarLunar.solar2lunar(setYYYY, setMM, setDay);

    const lunarToSolarData = solarLunar.lunar2solar(setYYYY, setMM, setDay);
    const lunaTosolarrDataNext = solarLunar.lunar2solar(setYYYY, setMM, setDayNext);
    const lunarTosolarYesterday = solarLunar.lunar2solar(setYYYY, setMM, setyesterday);

    const dateString = `${solar2lunarData.lDay}/${solar2lunarData.lMonth}/${solar2lunarData.lYear}`;

    return (
        <>
            <PageHeading title={'Chuyển lịch'} />
            <Page>
                <div className="container">
                    <Box mt={6}>
                        <DatePicker
                            onChange={(e) => handleOnChangeDate(e)}
                            defaultValue={moment(dateString, 'DD/MM/YYYY').toDate()}
                            mask
                            maskClosable
                            dateFormat="dd/mm/yyyy"
                            title={'Âm Lịch'}
                            label={'Âm Lịch'}
                        />
                    </Box>
                    <table className="table mt-4 ">
                        <thead style={{ backgroundColor: '#C0DAE5', textAlign: 'center' }}>
                            <tr className="rounded-top">
                                <th colSpan={4} scope="col">
                                    Dương Lịch
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="rounded-bottom"
                            style={{ textAlign: 'center', height: '130px', borderColor: '#dee2e6' }}
                        >
                            <tr>
                                <td>{change ? lunarTosolarYesterday.cDay : lunarTosolarYesterday.lDay}</td>
                                <td>Tháng {change ? lunarTosolarYesterday.cMonth : lunarTosolarYesterday.lMonth}</td>
                                <td>{change ? lunarTosolarYesterday.cYear : lunarTosolarYesterday.lYear}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#00000042' }}>
                                <td>{change ? lunarToSolarData.cDay : lunarToSolarData.lDay}</td>
                                <td>Tháng {change ? lunarToSolarData.cMonth : lunarToSolarData.lMonth}</td>
                                <td>{change ? lunarToSolarData.cYear : lunarToSolarData.lYear}</td>
                            </tr>
                            <tr>
                                <td>{change ? lunaTosolarrDataNext.cDay : lunaTosolarrDataNext.lDay}</td>
                                <td>Tháng {change ? lunaTosolarrDataNext.cMonth : lunaTosolarrDataNext.lMonth}</td>
                                <td>{change ? lunaTosolarrDataNext.cYear : lunaTosolarrDataNext.lYear}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Page>
        </>
    );
};

export default ModalCalender;
