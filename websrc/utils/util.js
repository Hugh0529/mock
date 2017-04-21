export const equalArrays = (arr1, arr2) => {
    const length = arr1.length;

    if (arr2.length !== length) {
        return false;
    }

    for (let i = length - 1; i >= 0; i--) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
};

export const getCookie = name => {
    const reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    let arr;
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
};
