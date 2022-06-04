import { message } from 'antd';
import axios from 'axios';
import * as HistoryCreator from 'history';
import qs from 'qs';
export const history = HistoryCreator.createBrowserHistory({});

const success_code = 6000;
const login_out_code = [6001];
export const apiProxy = async (url, params, addtionsOptions) => {
    let options = {
        method: 'post',
        url,
        data: params,
        ...addtionsOptions,
        headers: {
            'X-API-TOKEN': localStorage.token,
            ...addtionsOptions.headers
        }
    } as any;
    delete options.hideErrTip;
    if (addtionsOptions.method && addtionsOptions.method.toLowerCase() === 'get') {
        delete options.data;
        options = {
            ...options,
            method: addtionsOptions.method,
            params
        };
    } else {
        if (
            addtionsOptions.headers &&
            addtionsOptions.headers['content-type'] === 'application/x-www-form-urlencoded'
        ) {
            options = {
                ...options,
                data: qs.stringify(params),
                ...addtionsOptions,
                headers: {
                    'X-API-TOKEN': localStorage.token,
                    ...addtionsOptions.headers
                }
            };
        }
    }
    try {
        const res = await axios({
            ...options
        });

        if (res.status === 200 && res.data) {
            const data = res.data as any;
            if (data.status_code === success_code) {
                return data.data || 'success';
            }
            // else if (data.status_code === 6008) {
            //     return {
            //         status: 'success',
            //         code: data.status_code
            //     };
            // }
            else {
                if (!addtionsOptions.hideErrTip) {
                    message.error(data.message);
                }

                if (login_out_code.includes(data.status_code)) {
                    localStorage.removeItem('token');
                    history.push('/');
                }
                return null;
            }
        }
        return null;
    } catch (error) {
        message.error(error.message);
        return Promise.resolve(null);
    }
};
