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
        {name: 'iMac', description:'Very powerful but not for gaming!',photo: imac},
        {name: 'Macbook Pro', description:'State of the art Apple technology!',photo: macbook},
        {name: 'Lenovo Yoga', description:'This is a computer for gaming!',photo: lenovo},
        {name: 'Dell', description:'Does the job well.', photo: dell}
    ]
}
export const getPhones = () =>{
    return [
        {name: 'iPhone XS', description:'Very secure, CIA approved!',photo: iphone},
        {name: 'Samsung Galaxy S9', description:'If you want to buy another phone in 1 month, then buy this one now.',photo: galaxy},
        {name: 'HTC U11', description:'No idea what this does!',photo: htc},
        {name: 'Xiaomi Redmi', description:'iPhone copycat.', photo: xiaomi}
    ]
}

export const getAllProducts = () =>{
    return [
        {name: 'iMac', description:'Very powerful but not for gaming!',photo: imac},
        {name: 'Macbook Pro', description:'State of the art Apple technology!',photo: macbook},
        {name: 'Lenovo Yoga', description:'This is a computer for gaming!',photo: lenovo},
        {name: 'Dell', description:'Does the job well.', photo: dell},
        {name: 'iPhone XS', description:'Very secure, CIA approved!',photo: iphone},
        {name: 'Samsung Galaxy S9', description:'If you want to buy another phone in 1 month, then buy this one now.',photo: galaxy},
        {name: 'HTC U11', description:'No idea what this does!',photo: htc},
        {name: 'Xiaomi Redmi', description:'iPhone copycat.', photo: xiaomi}
    ]
}
