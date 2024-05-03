import myUserInfo from './models/user-info';
const API_BASE_URL = 'https://tuvichanco.net';
// const API_BASE_URL = 'http://localhost:8000';
// const API_BASE_URL = 'https://gozic-sample.000webhostapp.com';

const Config = {
    // register
    API_USER_REGISTER: API_BASE_URL + `/api/appRegister`,
    // home
    API_HOME_LIST: API_BASE_URL + `/api/getBlogs`,
    API_LIST_FAQS: API_BASE_URL + `/api/faqs`,
    API_LIST_TOPIC: API_BASE_URL + `/api/getTopics`,

    //lich
    // API_HOME_LIST: '/abc/list',
    //la so
    API_LA_SO: API_BASE_URL + `/tuvi/laso`,
    API_DS_LA_SO: API_BASE_URL + `/api/getLaSo`,
    API_UPLOAD_LASO: API_BASE_URL + `/api/uploadLaSo`,
    API_DELETE_IMAGE: API_BASE_URL + `/api/deleteLaSo`,
    API_GALLERY_UPLOAD_FILE: 'https://edu.gozic.vn/api/upload/file',

    // user
    API_USER_GET_PHONE: API_BASE_URL + '/api/getPhoneNumber',
    API_USER_INFO: API_BASE_URL + '/api/appLogin',
    API_EDIT_INFOR: API_BASE_URL + '/api/updateUser',
    API_TIEU_HAN: API_BASE_URL + '/api/tieuhanZalo/list',
    API_DAI_HAN: API_BASE_URL + '/api/daihanZalo/list',
    API_NOTIF: API_BASE_URL + '/api/notif/list',

    IS_FEED: 'Không có bài viết nào!',

    solarTerm: {
        'Lập xuân': '4 tháng 2',
        'Vũ thủy': '19 tháng 2',
        'Kinh trập': '5 tháng 3',
        'Xuân phân': '21 tháng 3',
        'Thanh minh': '5 tháng 4',
        'Cốc vũ': '20 tháng 4',
        'Lập Hạ': '6 tháng 5',
        'Tiểu mãn': '21 tháng 5',
        'Mang chủng': '6 tháng 6',
        'Hạ chí': '21 tháng 6',
        'Tiểu thử': '7 tháng 7',
        'Đại thử': '23 tháng 7',

        'Lập thu': '7 tháng 8',
        'Xử thử': '23 tháng 8',
        'Bạch lộ': '8 tháng 9',
        'Thu phân': '23 tháng 9',
        'Hàn lộ': '8 tháng 10',
        'Sương giáng': '23 tháng 10',
        'Lập đông': '7 tháng 11',
        'Tiểu tuyết': '22 tháng 11',
        'Đại tuyết': '7 tháng 12',
        'Đông chí': '22 tháng 12',
        'Tiểu hàn': '6 tháng 1',
        'Đại hàn': '21 tháng 1',
    },
    CHINAM1: [
        { label: 'Tí', value: 4 },
        { label: 'Sửu', value: 5 },
        { label: 'Dần', value: 6 },
        { label: 'Mão', value: 7 },
        { label: 'Thìn', value: 8 },
        { label: 'Tỵ', value: 9 },
        { label: 'Ngọ', value: 10 },
        { label: 'Mùi', value: 11 },
        { label: 'Thân', value: 0 },
        { label: 'Dậu', value: 1 },
        { label: 'Tuất', value: 2 },
        { label: 'Hợi', value: 3 },
    ],

    fetchData: async function (url, postBody) {
        var formBody = [];
        console.log('postBody', postBody);
        if (postBody.zalo_id == undefined && postBody.zalo_id == undefined) {
            postBody.zalo_id = myUserInfo.uId;
        }

        if (postBody.access_token == undefined && postBody.access_token == undefined) {
            postBody.access_token = myUserInfo.accessToken;
        }

        // console.log(url)
        // console.log(postBody)

        for (var property in postBody) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(postBody[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        // console.log("formBody: " + formBody);
        var requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
            json: true,
        };

        try {
            var response = await fetch(url, requestMetadata);
            var data = await response.json();

            return data;
        } catch (e) {
            return { status: 0, msg: '' };
        }
    },
    getData: async function (url) {
        var requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: null,
            json: true,
        };

        var response = await fetch(url, requestMetadata);
        var data = await response.json();

        return data;
    },
    getContent: async function (url) {
        var requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: null,
            json: true,
        };

        var response = await fetch(url, requestMetadata);
        var data = await response.text();

        return data;
    },
    postContent: async function (url, postBody) {
        console.log(postBody);
        var formBody = [];
        for (var property in postBody) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(postBody[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log('formBody: ' + formBody);

        var requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
            json: true,
        };

        var response = await fetch(url, requestMetadata);
        // console.log("res: " + JSON.stringify(response))
        return;
    },
    fetchDataAttach: async function (url, postBody) {
        console.log(postBody);
        const formBody = new FormData();

        if (postBody.zalo_id == undefined && postBody.zalo_id == undefined) {
            postBody.zalo_id = myUserInfo.uId;
        }

        if (postBody.access_token == undefined && postBody.access_token == undefined) {
            postBody.access_token = myUserInfo.accessToken;
        }

        for (var property in postBody) {
            formBody.append(property, postBody[property]);
        }

        var requestMetadata = {
            method: 'POST',
            body: formBody,
        };

        // console.log(requestMetadata)

        try {
            var response = await fetch(url, requestMetadata);
            var data = await response.json();

            return data;
        } catch (e) {
            return { status: 0, msg: '' };
        }
    },
};

export default Config;
