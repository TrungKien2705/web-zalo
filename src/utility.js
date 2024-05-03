import moment from 'moment';

const Utility = {
    displayVND: function (int) {
        if (int == null || int == '') {
            return;
        } else {
            let n = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(int);
            return n;
        }
    },
    displayDate: function (date) {
        // Display dd/mm/yyyy

        if (date == null || date == '') {
            return;
        } else {
            let displayDate = new Date(date);
            let yyyy = displayDate.getFullYear();
            let mm = displayDate.getMonth() + 1; // Months start at 0!
            let dd = displayDate.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            displayDate = dd + '/' + mm + '/' + yyyy;
            return displayDate;
        }
    },
    getDateStringToday: function () {
        let date = new Date();

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        if (month < 10) month = '0' + month.toString();
        if (day < 10) day = '0' + day.toString();

        date = year + '-' + month + '-' + day;
        return date;
    },

    getTodaySpace: function (time) {
        let date = new Date();
        let getTimeNow = date.getTime();
        // let getTimeNotice = moment(time).format('YYYY-MM-DD hh:mm:ss');
        let getTimeNotice = moment(time).format('YYYY-MM-DD HH:mm:ss');
        getTimeNotice = new Date(time);
        getTimeNotice = getTimeNotice.getTime();

        const valMin = Math.floor((getTimeNow - getTimeNotice) / (10 * 100 * 60)); //phut
        const valHour = Math.floor((getTimeNow - getTimeNotice) / (10 * 60 * 100 * 60)); //gio
        const valDay = Math.floor((getTimeNow - getTimeNotice) / (10 * 60 * 100 * 60 * 24)); //ngay
        const valMonth = Math.floor((getTimeNow - getTimeNotice) / (10 * 60 * 100 * 60 * 24 * 12)); //thang
        const valYear = Math.floor((getTimeNow - getTimeNotice) / (10 * 60 * 100 * 60 * 24 * 365)); //năm

        if (valMin <= 2) {
            return 'vừa mới đăng xong';
        } else if (valMin > 3 && valMin < 60) {
            return `cách đây ${valMin} phút`;
        } else if (valMin > 2 && valHour > 0 && valHour < 24) {
            return `cách đây ${valHour} giờ`;
        } else if (valDay <= 30 && valMonth < 12) {
            return `cách đây ${valDay} ngày`;
        } else if (valDay > 30 && valMonth < 12) {
            return `cách đây ${valMonth} tháng`;
        } else if (valMonth > 12) {
            return `cách đây ${valYear} năm`;
        }
    },

    getDateStringBeforeOneYear: function () {
        let date = new Date();

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear() - 1;
        if (month < 10) month = '0' + month.toString();
        if (day < 10) day = '0' + day.toString();

        date = year + '-' + month + '-' + day;
        return date;
    },

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    },

    regexName: '',
    regexPhone: '[0-9]{8,20}',
    regexNationalID: '[0-9]{9,12}',
};
export default Utility;
