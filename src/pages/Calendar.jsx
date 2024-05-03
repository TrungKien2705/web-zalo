import React, { useEffect, useState } from 'react';
import { Page, useNavigate, Avatar, Radio, Checkbox } from 'zmp-ui';
import '../css/calendar.scss';
import PageHeading from '../components/page-heading';
import ChooseCal from '../static/icons/choose-calendar.svg';
import ChangeCal from '../static/icons/change.svg';
import { LunarDate } from 'vietnamese-lunar-calendar';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import ty from '../static/image/12congiap/ty.png';
import suu from '../static/image/12congiap/suu.png';
import dan from '../static/image/12congiap/dan.png';
import mao from '../static/image/12congiap/mao.png';
import thin from '../static/image/12congiap/thin.png';
import tyRan from '../static/image/12congiap/ti.png';
import ngo from '../static/image/12congiap/ngo.png';
import mui from '../static/image/12congiap/mui.png';
import than from '../static/image/12congiap/than.png';
import dau from '../static/image/12congiap/dau.png';
import tuat from '../static/image/12congiap/tuat.png';
import hoi from '../static/image/12congiap/hoi.png';

const Calendar = () => {
    const [lunarDay, setlunarDay] = useState(new LunarDate(new Date()));
    const [solarDay, setsolarDay] = useState(new Date());
    const navigator = useNavigate();

    const handleOnchangeDate = (e) => {
        setlunarDay(new LunarDate(new Date(e.target.value)));
        setsolarDay(new Date(e.target.value));
    };
    const setThu = moment(solarDay).lang('vi').format('dddd');
    const setGio = moment(new Date()).add('days').format('hh:mm');
    const setDay = moment(solarDay).add('days').format('DD');
    const luckyHours = lunarDay.luckyHours;

    let hoursArray = luckyHours.split(', ');

    var iconMapping = {
        Tý: ty,
        Sửu: suu,
        Dần: dan,
        Mẹo: mao,
        Thìn: thin,
        Tỵ: tyRan,
        Ngọ: ngo,
        Mùi: mui,
        Thân: than,
        Dậu: dau,
        Tuất: tuat,
        Hợi: hoi,
    };

    let mao1 = 'Mẹo';
    let result = '';
    hoursArray.forEach(function (hour) {
        let hourParts = hour.split(' ');
        let type = hourParts[0];
        let time = hourParts[1];

        let icon = iconMapping[type]; // Lấy biểu tượng từ ánh xạ

        let timeFormatted = time.replace(/(\d+)/g, '$1h');

        result += `<div class="col-6 mt-3"><img   src=" ${icon} " alt=" ${type} " /> ${
            type == mao1 ? 'Mão' : type
        }${timeFormatted} </div>`;
    });

    console.log(lunarDay);
    return (
        <>
            <PageHeading title={'Lịch'} />
            <Page className="page calendar">
                <div className="calendar-button">
                    <div className="calendar-box choose-date">
                        {/* <label htmlFor="choose-day" className="choose-date-text">
                            <img src={ChooseCal} className="choose-date-icon" />
                            &nbsp;
                        </label> */}
                        <input
                            value={moment(solarDay).format('YYYY-MM-DD')}
                            placeholder="Chọn ngày"
                            onChange={(e) => handleOnchangeDate(e)}
                            className="input-date"
                            type="date"
                            id="choose-day"
                        />
                    </div>
                    <div onClick={() => navigator('/calendar-change')} className="calendar-box change-calendar">
                        <div className="choose-date-text">Âm dương</div>
                        <img src={ChangeCal} className="choose-date-icon" />
                    </div>
                </div>
                <section>
                    {/* box 1 */}
                    <div id="cal">
                        <div className="conner conner-top">
                            <span></span>
                        </div>
                        <div className="calendar-box">
                            <div className="calendar-box-top">{lunarDay.solarTerm}</div>
                            <div className="calendar-box-day">{setDay}</div>
                            <div className="calendar-box-day-text">
                                {setThu.charAt(0).toUpperCase() + setThu.slice(1)}
                            </div>
                            <div className="hour row">
                                <div className="col-3 hour-item">
                                    <div className="hour-title">Giờ</div>
                                    <div className="hour-text">
                                        {lunarDay.lunarHour.can}
                                        {lunarDay.lunarHour.chi == 'Mẹo' ? 'Mão' : lunarDay.lunarHour.chi}
                                    </div>
                                    <div className="hour-num">{setGio}</div>
                                </div>
                                <div className="col-3 hour-item">
                                    <div className="hour-title">Ngày</div>
                                    <div className="hour-text">
                                        {lunarDay.lunarDate.can}{' '}
                                        {lunarDay.lunarDate.chi == 'Mẹo' ? 'Mão' : lunarDay.lunarDate.chi}
                                    </div>
                                    <div className="hour-num">{lunarDay.date}</div>
                                </div>
                                <div className="col-3 hour-item">
                                    <div className="hour-title">Tháng</div>
                                    <div className="hour-text">
                                        {lunarDay.lunarMonth.can}{' '}
                                        {lunarDay.lunarMonth.chi == 'Mẹo' ? 'Mão' : lunarDay.lunarMonth.chi}
                                    </div>
                                    <div className="hour-num">{lunarDay.month}</div>
                                </div>
                                <div className="col-3 hour-item">
                                    <div className="hour-title">Năm</div>
                                    <div className="hour-text">
                                        {lunarDay.lunarYear.can}{' '}
                                        {lunarDay.lunarYear.chi == 'Mẹo' ? 'Mão' : lunarDay.lunarYear.chi}
                                    </div>
                                    <div className="hour-num">{lunarDay.year}</div>
                                </div>
                            </div>
                            {/* {lunarDay.holiday ? ( */}
                            <div className="log-time">
                                <div className="log-time-01">
                                    <div className="log-time-text">{!lunarDay.holiday ? '' : 'Ngày lễ'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="weather">
                            <div className="weather-item">
                                {/* <img src={Sunny} alt="Sunny" className="weather-icon" /> */}
                                <div className="weather-text">
                                    {lunarDay.holiday ? lunarDay.holiday : lunarDay.date == 1 ? 'Mùng 1 âm lịch' : ''}
                                </div>
                            </div>
                        </div>
                        <div className="conner conner-bottom">
                            <span></span>
                        </div>
                    </div>

                    {/* box 2 */}
                    <div id="cal" className='cal-2'>
                        <div className="conner conner-top">
                            <span></span>
                        </div>
                        <div className="calendar-box">
                            <div className="box-title">
                                <div className="box-title-01">Giờ hoàng đạo</div>
                            </div>
                            <div className="box-item">
                                <div className="box-item-content">
                                    <div
                                        className="box-item-content-text row"
                                        dangerouslySetInnerHTML={{ __html: result }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="conner conner-bottom">
                            <span></span>
                        </div>
                    </div>
                </section>
            </Page>
        </>
    );
};

export default Calendar;
