import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as cookies from '../../utils/cookies';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    if(localStorage.getItem('token') !== undefined){ //if the user checked 'remember me'
        localStorage.removeItem('token'); //remove the token from the localStrage
    } else{
        //remove token from cookies as well
        cookies.setCookie('token','',-0.5);
    }
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}


export const authLogin = (email, password,rememberMe) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:8000/users/login/', {
            email: email,
            password: password
        })
        .then(res => {
            const token = res.data.token;
            const user = res.data.user;
            if(rememberMe === true){
                localStorage.setItem('token', token);
            } else{
                cookies.setCookie('token',token, 0.5);
            }
            dispatch(authSuccess(token,user));
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (fname,lname,email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        const token = "some token";
        //log the user in after registration
        cookies.setCookie('token',token, 0.5);
        // dispatch(authStart());
        // axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
        //     username: username,
        //     email: email,
        //     password1: password1,
        //     password2: password2
        // })
        // .then(res => {
        //     const token = res.data.key;
        //     const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        //     localStorage.setItem('token', token);
        //     localStorage.setItem('expirationDate', expirationDate);
        //     dispatch(authSuccess(token));
        //     dispatch(checkAuthTimeout(3600));
        // })
        // .catch(err => {
        //     dispatch(authFail(err))
        // })
        dispatch(authSuccess(token));
    }
}