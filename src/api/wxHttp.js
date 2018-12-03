import wepy from 'wepy';

const wxRequest = async(params = {}, url) => {
    return new Promise((resolve, reject) => {
        let data = params.query || {};
        //设置请求头
        let header;
        if (params.header) {
            header =
                params.header == 1 ?
                'application/json' :
                'application/x-www-form-urlencoded';
        } else {
            header = 'application/json';
        }
        //是否携带变量后缀
        if (params.suffix) {
            url += params.suffix;
        }
        let res = wepy.request({
            url: url,
            method: params.method || 'POST',
            data: data,
            header: { 'Content-Type': header },
            success: res => {
                resolve(res.data);
            },
            fail: esg => {
                reject(esg);
            }
        })
    })
}

module.exports = {
    wxRequest
};