import a from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
import iView from 'iview';

let token = Cookies.get('token');
if (token === undefined) {
    token = '';
}

let axiosObj = a.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 60000
});

// 发送拦截
axiosObj.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

// 添加响应拦截器
axiosObj.interceptors.response.use(response => {
    switch (response.data.code) {
        case 0:
            return response;
        case undefined:
            // tree数据没有code
            return response;
        case 500:
            iView.Message.error(response.data.msg);
            throw new Error(response.data.msg);
        default:
            let msg = 'response.data.code 错误 | code ' + response.data.code + ' | ' + response.data.msg;
            iView.Message.error(msg);
            throw new Error(msg);
    }
}, (error) => {
    return Promise.reject(error);
});

export let axiosErrorHandler = errObj => {
    if (errObj.response) {
        // 不是2xx
        iView.Message.error('[ ' + errObj.response.status + ' ] ' + errObj.response.data.msg + ' ，请重试');
    } else if (errObj.request) {
        // 未收到任何答复
        iView.Message.error('未收到任何答复，请重试');
    } else {
        // 在设置触发错误的请求时发生了一些事情
        console.log('Error', errObj.message);
        // iView.Message.error('错误已经打印到控制台，请重试');
    }
    console.log(errObj.config);
};

export let axios = axiosObj;

export let all = a.all;
export let spread = a.spread;

export let axiosToken = ({
    url = '',
    data = {},
    method = 'get'
}) => {
    let _data = method === 'put' || method === 'post' ? qs.stringify(data, { allowDots: true }) : data;
    let _params = method === 'get' ? qs.stringify(data, { allowDots: true }) : {};

    return axiosObj({
        method,
        url: method === 'get' && _params ? `${Cookies.get('baseURL')}${url}?${_params}` : `${Cookies.get('baseURL')}${url}`,
        data: _data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': Cookies.get('token')
        }
    });
};
