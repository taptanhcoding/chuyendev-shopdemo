import request from '~/httpRequest/shopRequest';

export const handleUser = async (path = '', options = {}) => {
    try {
        let user = await request.post('user/' + path, options);
        return user.data;
    } catch {}
};

export const handleLogin = async (path = '', options = {}) => {
    try {
        let user = await request.get('user/login/' + path, options);
        return user.data;
    } catch {}
};

export const handleVerification = async (path = '', options = {}) => {
    try {
        let user = await request.get('/user/active/' + path, options);
        return user.data;
    } catch {}
};

export const updateUserApi = async (path = '', options = {}) => {
    try {
        let user = await request.put('user/' + path + '/update', options);
        return user.data;
    } catch {}
};
