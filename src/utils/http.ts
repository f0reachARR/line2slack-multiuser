import * as request from 'request';

export function get(options: request.RequiredUriUrl & request.CoreOptions) {
    return new Promise<request.RequestResponse>((resolve, reject) => request.get(options, (err, res) => {
        if (err)
            reject(err);
        else
            resolve(res);
    }));
}

export function post(options: request.RequiredUriUrl & request.CoreOptions) {
    return new Promise<request.RequestResponse>((resolve, reject) => request.post(options, (err, res) => {
        if (err)
            reject(err);
        else
            resolve(res);
    }));
}