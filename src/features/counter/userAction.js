import { useDispatch, useSelector } from 'react-redux';
import { updateUserApi } from '~/service/customerService';
import { updateUser } from './usersSlice';

const updateAction = (data) => {
    return async (dispatch) => {
        const newData = await updateUserApi(data._id, data);
        dispatch(updateUser(newData));
        sessionStorage.setItem('user', JSON.stringify(newData));
        if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(newData));
        }
    };
};

export { updateAction };
