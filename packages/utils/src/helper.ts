export const isBase64 = (str) => {
    const notBase64 = /[^A-Z0-9+\/=]/i;
    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) {
        return false;
    }
    const firstPaddingChar = str.indexOf('=');
    return (
        // firstPaddingChar === -1 ||
        firstPaddingChar === len - 1 || (firstPaddingChar === len - 2 && str[len - 1] === '=')
    );
};
export const uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
