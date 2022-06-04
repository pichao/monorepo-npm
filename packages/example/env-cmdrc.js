module.exports = new Promise((resolve, reject) => {
    return resolve({
        common: {
            route_prefix: '/app',
            name: 'aaaa',
            AES_KEY: 'ZFRYCMdFYGf0i5HgO0oWvFV0terUABU0',
            AES_iv: 'ZFRYCMdFYGf0i5HgO0oWvFV0terUABU0'
        },
        dev: {
            apiProxy: 'http://y1-ht.m7bo2190.com'
        },
        release: {
            apiProxy: 'https://api.twitter.com'
        },
        prod: {
            apiProxy: 'https://api.twitter.com'
        }
    });
});
