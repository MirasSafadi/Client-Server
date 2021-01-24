import * as cookies from './cookies';

export const getToken = () =>{
    //try local storage first
    let token = localStorage.getItem('token')
    if(token !== undefined)
        return token;
    return cookies.getCookie('token')
}

