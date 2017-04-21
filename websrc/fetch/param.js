const rbracket = /\[\]$/;
const r20 = /%20/g;

const isArray = obj => {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

const isEmptyObject = obj => {
    /* eslint-disable no-unused-vars */
    for (let name of Object.keys(obj)) {
        return false;
    }
    return true;
    /* eslint-disable no-unused-vars */
};

const buildParams = (prefix, obj, add) => {
    if (isArray(obj) && obj.length) {
        // Serialize array item.
        for (let key of Object.keys(obj)) {
            let value = obj[key];
            if (rbracket.test(prefix)) {
                // Treat each array item as a scalar.
                add(prefix, value);
            }
            else {
                buildParams(prefix + '[' + (typeof value === 'object' || isArray(value) ? key : '') + ']', value, add);
            }
        }
    }
    else if (obj !== null && typeof (obj) === 'object') {
        if (isEmptyObject(obj)) {
            add(prefix, '');
        }
        else {
            // Serialize object item.
            for (let key of Object.keys(obj)) {
                let value = obj[key];
                buildParams(prefix + '[' + key + ']', value, add);
            }
        }
    }
    else if (obj !== null && obj !== undefined) {
        add(prefix, obj);
    }
};


const param = a => {
    let s = [];
    const add = (key, value) => {
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };

    // If an array was passed in, assume that it is an array of form elements.
    if (isArray(a)) {
        // Serialize the form elements
        for (let name of Object.keys(a)) {
            add(name, a[name]);
        }
        for (let name of Object.keys(a)) {
            add(name, a[name]);
        }
    }
    else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for (let prefix of Object.keys(a)) {
            buildParams(prefix, a[prefix], add);
        }
    }

    // Return the resulting serialization
    return s.join('&').replace(r20, '+');
};

export default param;
