import * as cookies from './cookies';
import imac from '../assets/imac.png';
import lenovo from '../assets/lenovo.png';
import macbook from '../assets/macbook.png';
import dell from '../assets/dell.png';

import iphone from '../assets/iphone.png';
import galaxy from '../assets/galaxy.png';
import htc from '../assets/htc.png';
import xiaomi from '../assets/xiaomi.png';


export const getToken = () =>{
    //try local storage first
    let token = localStorage.getItem('token')
    if(token !== undefined)
        return token;
    return cookies.getCookie('token')
}

export const getComputers = () =>{
    return [
        {id: 1,name: 'iMac', description:'Very powerful but not for gaming!',photo: imac},
        {id: 2,name: 'Macbook Pro', description:'State of the art Apple technology!',photo: macbook},
        {id: 3,name: 'Lenovo Yoga', description:'This is a computer for gaming!',photo: lenovo},
        {id: 4,name: 'Dell', description:'Does the job well.', photo: dell}
    ]
}
export const getPhones = () =>{
    return [
        {id: 1,name: 'iPhone XS', description:'Very secure, CIA approved!',photo: iphone},
        {id: 2,name: 'Samsung Galaxy S9', description:'If you want to buy another phone in 1 month, then buy this one now.',photo: galaxy},
        {id: 3,name: 'HTC U11', description:'No idea what this does!',photo: htc},
        {id: 4,name: 'Xiaomi Redmi', description:'iPhone copycat.', photo: xiaomi}
    ]
}

export const getAllProducts = () =>{
    return [
        {id: 1, name: 'iMac', description:'Very powerful but not for gaming!',photo: imac},
        {id: 2, name: 'Macbook Pro', description:'State of the art Apple technology!',photo: macbook},
        {id: 3, name: 'Lenovo Yoga', description:'This is a computer for gaming!',photo: lenovo},
        {id: 4, name: 'Dell', description:'Does the job well.', photo: dell},
        {id: 5, name: 'iPhone XS', description:'Very secure, CIA approved!',photo: iphone},
        {id: 6, name: 'Samsung Galaxy S9', description:'If you want to buy another phone in 1 month, then buy this one now.',photo: galaxy},
        {id: 7, name: 'HTC U11', description:'No idea what this does!',photo: htc},
        {id: 8, name: 'Xiaomi Redmi', description:'iPhone copycat.', photo: xiaomi}
    ]
}
