const jsonFormater = jsonString => {
    if (!jsonString) {
        return '';
    } else {
        try {
            const jsonObj = JSON.parse(jsonString);
            jsonString = JSON.stringify(jsonObj);

            let res = '';
            // k:缩进，j:''个数
            for(let i = 0, j = 0, k = 0, ii, ele; i < jsonString.length; i++) {
                ele = jsonString.charAt(i);
                if (j%2 === 0 && ele === '}') {
                    k--;
                    for(ii = 0; ii <k ;ii++){
                        ele = '    ' + ele;
                    }
                    ele = '\n' + ele;
                } else if (j%2 === 0 && ele === '{') {
                    ele += '\n';
                    k++;
                    for(ii = 0; ii < k; ii++) {
                        ele += '    ';
                    }
                } else if (j%2 === 0 && ele ===',') {
                    ele += '\n';
                    for(ii = 0; ii < k; ii++) {
                        ele += '    ';
                    }
                } else if (ele === '\'') {
                    j++;
                }
                res += ele;
            }
            return res;
        } catch (e) {
            console.error(e);
            return '';
        }

    }
};

export default jsonFormater;
