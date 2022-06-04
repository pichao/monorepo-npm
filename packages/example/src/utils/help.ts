export const generateRandom = (n) => {
    let num = '';
    for (let i = 0; i < n; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
};
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

export const unique = (array, key) => {
    const result = {};
    const finalResult = [];
    for (let i = 0; i < array.length; i++) {
        result[array[i][key]] = array[i];
    }

    for (const item in result) {
        finalResult.push(result[item]);
    }

    return finalResult;
};
export const isObject = (val) => {
    let _val = val;
    if (typeof _val === 'string') {
        try {
            _val = JSON.parse(val);
        } catch (error) {
            return false;
        }
    }
    return _val != null && typeof _val === 'object' && Array.isArray(_val) === false;
};
