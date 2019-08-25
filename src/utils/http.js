/*eslint-env node*/
import axios from 'axios'
import qs from 'qs'
import router from '../router/index'

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};

if (process.env.NODE_ENV == 'development') {
	// easy-mock
	axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d5902cebbb1323e7792375d/snowe/vue';
} else if (process.env.NODE_ENV == 'debug') {
	// axios.defaults.baseURL = 'https://www.ceshi.com';
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5d5902cebbb1323e7792375d/snowe/vue';
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = 5000;

// 添加请求拦截器
axios.interceptors.request.use(config => {
	// TODO...AUTH_TOKEN
	const token = localStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] = token
	}
	return config;
}, error => {
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
	const responseCode = response.status;
	// TODO...
	switch (responseCode) {
		case 200:
			break;
		// 401: 未登录            
		case 401:
			router.replace({
				path: '/login',
				query: {
					redirect: router.currentRoute.fullPath
				}
			});
			break;
		// 403 token过期
		case 403:
			localStorage.removeItem('token');
			// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
			setTimeout(() => {
				router.replace({
					path: '/login',
					query: {
						redirect: router.currentRoute.fullPath
					}
				});
			}, 1000);
			break;
		case 404:
			handleStatus(responseCode);
			break;
		default:
			handleStatus(responseCode);
			break;
	}
	return Promise.resolve(response);

}, error => {
	// console.log('error', error)
	return Promise.reject(error);
});

function handleStatus(status) {
	throw new Error(codeMessage[status]);
}

export const get = (url, params) => {
	if (typeof params !== 'undefined') {
		url += '?' + qs.stringify(params)
	}
	return axios.get(url)
		.then(res => {
			return res.data;
		})
}

export const post = (url, params, options = {}) => {
	return axios.post(url, params, {...options})
	.then(res => {
		return res.data;
	})
}

export const upload = ({url, params, options = {}}) => {
	return axios.post(url, params, {...options, headers: {'Content-Type': 'multipart/form-data'}})
	.then(res => {
		return res.data;
	})
}
