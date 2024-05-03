import Config from '../config';
import myUserInfo from './user-info';

class Laso {
    hoten = '';
    gioitinh = '';
    isDuong = 1;
    isNam = 1;
    gio = 0;
    phut = 0;
    ngay = 9;
    thang = 4;
    nam = 1988;
    mau = 1;
    coanh = '900x1269px';
    custom01 = 0;
    custom02 = 0;
    custom03 = 0;
    custom04 = 0;
    custom05 = 0;
    custom06 = 0;
    custom07 = 0;
    custom08 = 0;
    luuthaitue = 1;
    isNom = 0;
    gioDH = 11;
    namHan = new Date().getFullYear();
    gioDM = 30;
    anTuHoa = 1;

    laSoList = [];
    photoList = [];
    folderList = [];
    idImage = 0;
    currentFileName = '';
    numberUpload = 0;
    countUpload = 0;
    statusMsg = 0;
    url = '';
    thumbnailSave = '';

    // async getLaso() {
    //     const response = await fetch(
    //         Config.API_LA_SO +
    //             `?hoten=${this.hoten}&isDuong=${this.isDuong}&isNam=${this.isNam}&gio=${this.gio}&ngay=${this.ngay}&thang=${this.thang}&nam=${this.nam}&mau=${this.mau}&luuthaitue=${this.luuthaitue}&isNom=${this.isNom}&gioDH=${this.gioDH}&gioDM=${this.gioDM}&namHan=${this.namHan}&anTuHoa=${this.anTuHoa}`,
    //     ).then((data) => console.log(data));
    //     // const data = await response.json();
    //     console.log(response);
    //     console.log('Data');
    //     return response;
    // }
    async getDanhSachLaso() {
        const postBody = {
            user_id: myUserInfo.id,
        };
        const data = await Config.fetchData(Config.API_DS_LA_SO, postBody);
        this.laSoList = data ? data : [];
        console.log(data);
        return data;
    }
    async getUploadingImage() {
        const postBody = {
            user_id: myUserInfo.id,
            thumbnail: this.url,
        };
        const data = await Config.fetchData(Config.API_UPLOAD_LASO, postBody);
        // this.laSoList = data ? data : [];
        console.log(data);
        return data;
    }
    checkUploadSuccess() {
        let photoIndex = 1;
        for (let i = 0; i < this.photoList.length; i++) {
            console.log(photoIndex);
            photoIndex = i;
            break;
        }
        return photoIndex;
    }
    dataURLtoFile(dataurl, filename) {
        // console.log(dataurl);
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        console.log(new File([u8arr], filename, { type: mime }));
        return new File([u8arr], filename, { type: mime });
    }
    async registerUploadFile() {
        let photoSelectUpload = this.dataURLtoFile(this.photoList[0], `laso-${new Date() - 1}.png`);
        // console.log(photoSelectUpload);

        const postBody = {
            Filename: photoSelectUpload.name,
            file: photoSelectUpload,
        };

        const data = await Config.fetchDataAttach(Config.API_GALLERY_UPLOAD_FILE, postBody);
        console.log('API_GALLERY_UPLOAD_FILE');
        console.log(postBody);
        console.log(data.url);

        if (data.status > 0) {
            this.url = data.url;
            // this.numberUpload++;
        } else {
            // this.photoList[photoIndex].uploaded = false;
        }

        return data;
    }
    async deleteImage() {
        const postBody = {
            id: this.idImage,
        };
        const data = await Config.fetchData(Config.API_DELETE_IMAGE, postBody);
        return data;
    }

    resetData() {
        // Step 2/2
        this.photoList = [];
        this.currentFileName = '';
        this.numberUpload = '';
        this.countUpload = 0;
    }
}

const layLaso = new Laso();

export default layLaso;
