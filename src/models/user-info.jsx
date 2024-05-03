import Config from '../config';
import api from 'zmp-sdk';

class UserInfo {
    id = null;
    accessToken = '';
    navigateTo = null;
    user_id = '';
    fullname = '';
    name = '';
    gender = '';
    avatar = '';
    isRegistered = false;
    phoneNumber = '';
    email = '';
    password = '';
    msg = '';
    statusMsg = 0;
    dataText = {};

    max = 3;
    count = 0;
    isNextPage = false;
    role_id = null;

    // Fake Login
    fakeAccessToken =
        'j_yKC7s-hNAvzH0qVRAhTBds5ZD-gzCpr94871wKroQ2rIGr7SYRTetD9szCwFf2s_yd0aJs_J67qJToFSFxQhx67rCz_zfilUCOJ3p-nmc9ptKQD8ku8ewN0s8LWDfbaOGmSmhQYbwqzZ0VBk3eNUpCAXvuwPGGthT91MYAYqNxj7LGFBAnQPcmV5K8ahf0a8S210ounZMGXtnoLiEmQjt1NMmNq8DstFGuO6krz5_zhKfQM9QkOkNKQbHc_h8LyxXW3qd_l33encG1KkEv4fR5N1OMWAOLh9na0osdfXkCl1HTBgdB4uI-3bPEgxGIY9nS14xQdaFP-oD6PSxc1TpdFmCRu_iraDeo2pBGy2wvzZStBRBt1_9pYtTnegvp';
    fakeZaloId = '3997687486750426338';

    isFake = true;

    async auth() {
        const postBody = {
            zalo_id: this.uId,
            phone_number: this.phoneNumber,
        };

        const data = await Config.fetchData(Config.API_USER_INFO, postBody);
        console.log('data Infor', data);
        if (data.status > 0) {
            console.log('status', data.status);
            this.statusMsg = data.status;
            this.msg = data.msg;
            this.id = data.id;
            this.fullname = data.fullname;
            this.phoneNumber = data.phone_number;
            this.email = data.email;
            this.user_id = data.id;
            this.avatar = data.avatar;
            // if (!data.avatar) {
            //     this.avatar = 'https://ziczacvn.com/uploads/stores/2/2022/10/user.png';
            // }
            this.isRegistered = true;
        }
    }

    async register() {
        const postBody = {
            fullname: this.fullname,
            phone_number: this.phoneNumber,
            email: this.email,
            zalo_id: this.uId,
            password: this.password,
            avatar: this.avatar,
        };
        const data = await Config.fetchData(Config.API_USER_REGISTER, postBody);

        console.log('REGISTER USER');
        console.log(postBody);
        // console.log(postBody.avatar)
        console.log(data);

        if (data.status > 0) {
            //Dang ky thanh cong
            await this.auth();

            this.user_id = data.id;
            this.isRegistered = true;
            this.navigateTo('/home');
        }
        return data;
    }

    login() {
        api.login({
            success: () => {
                // login thành công
                // xử lý khi gọi api thành công
                api.getAccessToken({
                    success: (accessToken) => {
                        // xử lý khi gọi api thành công
                        if (this.isFake) {
                            // this.accessToken = this.fakeAccessToken;
                            this.accessToken = this.fakeAccessToken;
                        } else {
                            this.accessToken = accessToken;
                        }
                        console.log('accessToken', accessToken);
                        this.checkLogin();
                    },
                    fail: (error) => {
                        // xử lý khi gọi api thất bại
                        console.log(error);
                    },
                });

                api.getUserInfo({
                    success: (data) => {
                        // xử lý khi gọi api thành công
                        const { userInfo } = data;
                        if (this.isFake) {
                            this.uId = this.fakeZaloId;
                        } else {
                            this.uId = userInfo.id;
                        }
                        // this.uId = userInfo.id;
                        this.name = userInfo.name;
                        console.log('userInfo of Zalo::::', userInfo);
                        if (!this.avatar) {
                            this.avatar = userInfo.avatar;
                        }

                        this.checkLogin();
                    },
                    fail: (error) => {
                        // xử lý khi gọi api thất bại
                        console.log('fail', error);
                    },
                });
            },
            fail: (error) => {
                // login thất bại
                console.log('fail', error);
            },
        });
    }

    async getPhoneNumberByToken(token) {
        const postBody = {
            token: token,
            access_token: this.accessToken,
        };
        const data = await Config.fetchData(Config.API_USER_GET_PHONE, postBody);
        console.log('data Token', postBody);
        console.log(data);
        return data;
    }
    verifyPhone() {
        // if (!this.isRegistered) {
        //     console.log('2. Phone');
        //     api.getPhoneNumber({
        //         success: async (data) => {
        //             // xử lý khi gọi api thành công
        //             const number = await this.getPhoneNumberByToken(data.number.token);
        //             console.log('number', number);
        //             this.phoneNumber = number.phone_number;
        //             this.checkLogin();
        //         },
        //         fail: (error) => {
        //             // xử lý khi gọi api thất bại
        //             console.log(error);
        //             this.phoneNumber = '';
        //             this.checkLogin();
        //         },
        //     });
        // } else {
        //     this.checkLogin();
        // }
        // this.checkLogin();
    }

    checkLogin() {
        this.count++;
        console.log(this.count + ', ' + this.max);
        if (this.count == this.max && !this.isNextPage) {
            //Get full info
            console.log('Next screen');
            this.isNextPage = true;
            if (this.isRegistered) {
                // this.navigateTo('/');
            } else {
                // this.navigateTo('/');
            }
        } else if (this.count == this.max - 1) {
            this.auth();
        }
    }

    // async registerUpdateUser(callback) {
    //     const postBody = {
    //         fullname: this.fullname,
    //         address: this.address,
    //         role_id: this.role_id
    //     };
    //     const data = await Config.fetchData(Config.API_USER_UPDATE, postBody);

    //     console.log("UPDATE USER")
    //     console.log(postBody)
    //     console.log(data)
    //     callback(data)
    // }

    async getInfoPage(callback) {
        const postBody = {};
        const data = await Config.fetchData(Config.API_USER_INFO_PAGE, postBody);
        console.log('API_USER_INFO_PAGE');
        console.log(postBody);
        data.status > 0 ? (this.infoPage = data) : '';
        console.log(data);
        callback(data);
    }
    async editUserInfor() {
        const postBody = {
            fullname: this.fullname,
            email: this.email,
            // phone_number: this.phoneNumber,
        };
        const data = await Config.fetchData(Config.API_EDIT_INFOR, postBody);
        console.log(data);
        return data;
    }
    pageTieuHan = 1;
    async getListTieuHan() {
        const postBody = {
            quantity: 10,
            page: this.pageTieuHan,
        };
        const data = await Config.fetchData(Config.API_TIEU_HAN, postBody);
        console.log(data);
        return data;
    }
    pageDaiHan = 1;
    async getListDaiHan() {
        const postBody = {
            quantity: 10,
            page: this.pageDaiHan,
        };
        const data = await Config.fetchData(Config.API_DAI_HAN, postBody);
        console.log(data);
        return data;
    }
    pageNotif = 0;
    async getListNotif() {
        this.pageNotif++;

        const postBody = {
            amount: 10,
            page: this.pageNotif,
        };
        const data = await Config.fetchData(Config.API_NOTIF, postBody);
        if (data == null || data.length == 0) {
            return data;
        }

        return data;
    }
}

const myUserInfo = new UserInfo();

export default myUserInfo;
