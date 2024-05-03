import Config from '../config';

class Home {
    accessToken = '';
    post_id = '';
    page = 1;
    topicId = null;
    topicList = [];
    post = {};
    postList = [];
    postListByTopic = [];

    reset() {
        // this.s = '';
        this.page = 1;
        this.isStop = false;
        this.cacheData = [];
        this.isLoading = false;
        console.log('reset --------------');
    }

    async getInfoPage(callback) {
        const postBody = {
            post_id: post_id,
        };
        const data = await Config.fetchData(Config.API_USER_INFO_PAGE, postBody);
        console.log('API_USER_INFO_PAGE');
        console.log(postBody);
        console.log(data);
        callback(data);
    }
    async getAllTopics() {
        const postBody = {};
        const data = await Config.fetchData(Config.API_LIST_TOPIC, postBody);

        console.log(data);
        return data;
    }
    async getAllPostModel() {
        const postBody = {
            amount: 10,
            page: this.page,
            topic: this.topicId,
            sort: 'DESC',
            field: 'updated_at',
        };
        console.log(postBody);

        const data = await Config.fetchData(Config.API_HOME_LIST, postBody);

        console.log('before check');

        console.log('data', data);

        return data;
    }
    async getAllFaqs() {
        const postBody = {};
        const data = await Config.fetchData(Config.API_LIST_FAQS, postBody);
        console.log('before check');

        // console.log('data', data);

        return data;
    }
}
const homeModal = new Home();

export default homeModal;
