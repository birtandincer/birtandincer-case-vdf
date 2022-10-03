import Moment from "moment";

//Gönderilen Tarih-Saat formatını gün ay ve yıl olarak düzenler.
export const dateTemplate = (value) => {
        return (Moment(value).format('DD.MM.YYYY'));
}

export const filter = (data, columnName) => {
        let result = [];
        // eslint-disable-next-line array-callback-return
        data.map(item => {
                var isExist = result.filter(x => x.text === item[columnName] && x.value === item[columnName]);
                if (isExist.length === 0)
                        result.push({
                                text: item[columnName],
                                value: item[columnName]
                        })
        })
        return result
}

export const dateFilter = (data, columnName) => {
        let result = [];
        // eslint-disable-next-line array-callback-return
        data.map(item => {
                var isExist = result.filter(x => x.text === dateTemplate(item[columnName]) && x.value === dateTemplate(item[columnName]));
                if (isExist.length === 0)
                        result.push({
                                text: dateTemplate(item[columnName]),
                                value: dateTemplate(item[columnName])
                        })
        })
        return result
}

export const diff=(obj1, obj2)=> {
        const result = {};
        if (Object.is(obj1, obj2)) {
            return undefined;
        }
        if (!obj2 || typeof obj2 !== 'object') {
            return obj2;
        }
        Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
            if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
                result[key] = obj2[key];
            }
            if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
                const value = diff(obj1[key], obj2[key]);
                if (value !== undefined) {
                    result[key] = value;
                }
            }
        });
        return result;
    }