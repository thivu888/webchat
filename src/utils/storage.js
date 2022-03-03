import isObject from 'lodash/isObject';

const _get = (key) => {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
};

const _set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const _remove = (key) => {
    localStorage.removeItem(key);
};

const _removeMultiple = (list) => {
    list.forEach(key => {
        _remove(key);
    });
};

export default {
    set(key, value) {
        _set(key, value);
    },

    get(key) {
        return _get(key);
    },

    setVerify(verify) {
        _set('_verify',verify)
    },

    getVerify() {
        return _get('_verify')
    },

    getUserInfo() {
        let user = _get('_user_info');

        if (!isObject(user)) {
            user = {};
        }

        return user;
    },

    setUserInfo(user) {
        _set("_user_info", user);
    },

    removeUserInfo(){
        _remove('_user_info')
    },

    getToken() {
        return _get("_token") || '';
    },

    setToken(value) {
        window.token = value;
        _set("_token", value);
    },

    removeToken(){
        _remove('_token')
    },

    remove(key) {
        _remove(key);
    },

    destroy() {
        console.info('============= Clear all storage ============='); // eslint-disable-line
        _removeMultiple([
            "_user_info",
            "_token"
        ]);
    },
};

