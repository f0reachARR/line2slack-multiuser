import * as request from 'request';

export function uploadFile(token: string, buf: Buffer, channels?: string[], contentType = 'text/plain', fileName = 'file.txt') {
    return new Promise<any>((resolve, reject) => request.post(`https://slack.com/api/files.upload`, {
        formData: {
            token: token,
            file: {
                value: buf,
                options: {
                    filename: fileName,
                    contentType: contentType
                }
            },
            filetype: 'auto',
            title: fileName,
            channels: channels
        },
        json: true
    }, (err, res, body) => {
        if (err || res.statusCode !== 200 || !body.ok)
            reject(err || res);
        else
            resolve(body);
    }));
}